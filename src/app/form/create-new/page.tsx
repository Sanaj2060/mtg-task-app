"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";

type QuestionType = "text" | "textarea" | "select" | "date";

interface Question {
  question: string;
  type: QuestionType;
  options: string[];
}

const Form = () => {
  const [title, setTitle] = useState<string>(""); // State for the form title
  const [questions, setQuestions] = useState<Question[]>([
    { question: "", type: "text", options: [] },
  ]);

  const [loading, setLoading] = useState<boolean>(false);
  const createdby = useSession().data?.dbUser?.id;
  console.log(createdby)

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

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const formData = {
  //     title,
  //     questions,
  //   };
  //   console.log(JSON.stringify(formData, null, 2));
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      title,
      questions,
      createdby,
    };

    try {
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create form');
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);
      // Optionally handle the result, e.g., redirect or show a success message
    } catch (error) {
      console.error('Error submitting form:', error);
      // Optionally handle the error, e.g., show an error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      {/* Title input field */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Form Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {questions.map((question, index) => (
        <div key={index} className="mb-4">
          <div className="flex space-x-4 items-center">
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
          className={`px-4 py-2 bg-green-500 text-white rounded shadow flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
          ) : null}
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default Form;
