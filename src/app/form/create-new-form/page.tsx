"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import NavBar from "@/app/component/navBar";

type QuestionType = "text" | "textarea" | "select" | "date" | "phone";

interface Question {
  question: string;
  type: QuestionType;
  options: string[];
}

const Form = () => {
  const [title, setTitle] = useState<string>(""); // State for the form title
  const [description, setDescription] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([
    { question: "", type: "text", options: [] },
  ]);

  const [loading, setLoading] = useState<boolean>(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const createdby = useSession().data?.dbUser?.id;
  console.log(createdby);

  const addRow = () => {
    setQuestions([...questions, { question: "", type: "text", options: [] }]);
  };

  const deleteRow = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleChange = (index: number, key: keyof Question, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index][key] = value as any;
    if (key === "type" && value !== "select") {
      newQuestions[index].options = [];
    }
    setQuestions(newQuestions);
  };

  const handleOptionsChange = (index: number, options: string[]) => {
    const newQuestions = [...questions];
    newQuestions[index].options = options;
    setQuestions(newQuestions);
  };

  // Drag and drop handlers
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (index: number, e: React.DragEvent) => {
    e.preventDefault(); // Required to allow dropping
    if (draggedIndex !== null && draggedIndex !== index) {
      const newQuestions = [...questions];
      const draggedQuestion = newQuestions[draggedIndex];
      newQuestions.splice(draggedIndex, 1);
      newQuestions.splice(index, 0, draggedQuestion);
      setQuestions(newQuestions);
      setDraggedIndex(index); // Update the dragged index
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null); // Reset drag state after drop
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      title,
      description,
      questions,
      createdby,
    };

    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create form");
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);
      // Optionally handle the result, e.g., redirect or show a success message
    } catch (error) {
      console.error("Error submitting form:", error);
      // Optionally handle the error, e.g., show an error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full flex flex-col items-center min-h-screen">
      {/* <NavBar /> */}
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg"
      >
        {/* Title input field */}
        <div className="mb-6">
          <label className="block text-left pl-2 w-full mb-2 text-sm font-medium text-gray-900">
            Title of your Form
          </label>
          <input
            type="text"
            placeholder="Form Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-left pl-2 w-full mb-2 text-sm font-medium text-gray-900">
            A short description about your form
          </label>
          <input
            type="text"
            placeholder="Provide a short description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="m-2 text-left pl-2 w-full mb-2 text-sm font-medium text-gray-900">
          <p>Add your questions and type</p>
        </div>

        {/* Question list with drag and drop */}
        {questions.map((question, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(index, e)}
            onDragEnd={handleDragEnd}
            className="border p-2 mb-4 rounded shadow-md"
          >
            <div className="flex space-x-4 items-center">
              <p>{index + 1}.</p>
              <input
                type="text"
                placeholder="Question"
                value={question.question}
                onChange={(e) => handleChange(index, "question", e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
              <select
                value={question.type}
                onChange={(e) => handleChange(index, "type", e.target.value)}
                className="p-2 border rounded"
              >
                <option value="text">Text</option>
                <option value="textarea">Textarea</option>
                <option value="select">Select</option>
                <option value="date">Date</option>
                <option value="phone">Phone</option>
              </select>
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => deleteRow(index)}
                className="text-red-500 cursor-pointer hover:text-red-700"
              />
            </div>
            {question.type === "select" && (
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Options (comma separated)"
                  value={question.options.join(", ")}
                  onChange={(e) =>
                    handleOptionsChange(
                      index,
                      e.target.value.split(",").map((opt) => opt.trim())
                    )
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
            )}
          </div>
        ))}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={addRow}
            className="px-4 py-2 bg-blue-500 text-white rounded shadow"
          >
            Add Row
          </button>
          <button
            type="submit"
            className={`px-4 py-2 bg-green-500 text-white rounded shadow flex items-center justify-center ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
            ) : null}
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default Form;