"use client";
import React, { useState, useEffect } from "react";
import type { FormData, Question } from "../types/form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // For navigation after submission

interface DynamicFormProps {
  formData: FormData;
}

const DisplayDynamicForm: React.FC<DynamicFormProps> = ({ formData }) => {
  const { data: session } = useSession(); // Fetch session data
  const [taskTitle, setTaskTitle] = useState<string>(""); // To track the task title for success message
  const [isSubmitted, setIsSubmitted] = useState(false); // To control the success popup
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // To store and display error messages
  const [loading, setLoading] = useState(false); // To manage the loading state
  const [minDate, setMinDate] = useState<string>(""); // For disabling past dates
  const router = useRouter(); // Next.js router for navigation

  // Calculate the current date and time for the min attribute
  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 16); // Format date to yyyy-MM-ddTHH:mm
    setMinDate(formattedDate); // Set the minimum date for the datetime-local input
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title")?.toString() || "Untitled Task"; // Track task title for popup

    // Create the payload
    const payload = {
      title,
      createdBy: session?.dbUser?.id?.toString() || "",
      assignee: formData.get("assignedTo")?.toString(),
      dueDate: formData.get("duedate")?.toString(),
      formData: Object.fromEntries(formData.entries()), // All the dynamic form fields
    };

    try {
      const response = await fetch("/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit task");
      }

      const result = await response.json();
      console.log("Task created successfully:", result);

      setTaskTitle(title); // Set task title for the success message
      setIsSubmitted(true); // Show the success popup
      setErrorMessage(null); // Clear any previous error message
    } catch (error: any) {
      console.error("Error submitting task:", error);
      setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading after submission
    }
  };

  const renderField = (question: Question, index: number) => {
    switch (question.type) {
      case "text":
        return (
          <div key={index} className="mb-4">
            <label className="block text-lg font-medium text-gray-700">
              {question.question}
            </label>
            <input
              type="text"
              name={question.question}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required // Add required attribute
            />
          </div>
        );
      case "select":
        return (
          <div key={index} className="mb-4">
            <label className="block text-lg font-medium text-gray-700">
              {question.question}
            </label>
            <select
              name={question.question}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required // Add required attribute
            >
              {question.options?.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      case "textarea":
        return (
          <div key={index} className="mb-4">
            <label className="block text-lg font-medium text-gray-700">
              {question.question}
            </label>
            <textarea
              name={question.question}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows={4}
              required // Add required attribute
            />
          </div>
        );
      case "date":
        return (
          <div key={index} className="mb-4">
            <label className="block text-lg font-medium text-gray-700">
              {question.question}
            </label>
            <input
              type="datetime-local"
              name={question.question}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              min={minDate} // Set min attribute to prevent past dates
              required // Add required attribute
            />
          </div>
        );
      default:
        return null;
    }
  };

  if (!formData.formdata || !formData.formdata.questions) {
    return <div>No form data available.</div>;
  }

  // Function to handle going back to the homepage
  const handleGoBackHome = () => {
    router.push("/"); // Navigate to the home page
  };

  return (
    <>
      {/* Success Popup */}
      {isSubmitted && !errorMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">
              Task {taskTitle} has been created successfully!
            </h2>
            <button
              className="bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleGoBackHome}
            >
              Go back to Home
            </button>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {errorMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4 text-red-500">Error</h2>
            <p className="mb-4">{errorMessage}</p>
            <p className="mb-4">
              Please review the form and try again. Ensure that all required fields are filled in correctly.
            </p>
            <button
              className="bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setErrorMessage(null)} // Clear error message to dismiss popup
            >
              Close
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg"
      >
        {/* Section for Assigned to, Due Date, and Assignee */}
        <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">
              Assigned to
            </label>
            <input
              type="text"
              name="assignedToName"
              value={formData.createdbyname} // Showing the createdbyname from formData
              readOnly
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-200"
              required
            />
            <input
              type="hidden"
              name="assignedTo"
              value={formData.createdby} // Showing the createdby ID from formData
              readOnly
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="hidden"
              name="taskcreatedby"
              value={session?.dbUser?.id || ""} // Showing the ID of the user from session
              readOnly
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">
              Give a title to your Task
            </label>
            <input
              type="text"
              name="title"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="datetime-local"
              name="duedate"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              min={minDate} // Set the minimum date to disable past dates
              required
            />
          </div>
        </div>

        {/* Horizontal Divider to separate sections */}
        <hr className="my-6 border-gray-300" />

        {/* Render dynamic fields from formData */}
        <div className="p-4 bg-white rounded-lg">
          {formData.formdata.questions.map((question, index) =>
            renderField(question, index)
          )}
        </div>

        <button
          type="submit"
          className={`mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex justify-center items-center ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading} // Disable the button while loading
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </>
  );
};

export default DisplayDynamicForm;