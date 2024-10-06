"use client";
import { useParams } from "next/navigation"; // Import useParams from next/navigation
import { useEffect, useState } from "react";
import { TasksWithUsers } from "@/app/api/lib/definitions";
import { useSession } from "next-auth/react";

const TaskDetails: React.FC = () => {
  const params = useParams(); // Use useParams to get the dynamic id
  const id = Array.isArray(params?.id) ? params.id[0] : params.id;
  const { data: session } = useSession();

  const [task, setTask] = useState<TasksWithUsers | null>(null); // Use null initially to indicate no task is loaded
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [updating, setUpdating] = useState<boolean>(false); // State for tracking status update

  useEffect(() => {
    const fetchTask = async () => {
      if (!id) {
        console.error("Task ID is undefined or invalid");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/gettaskbyid?id=${id}`);

        if (response.ok) {
          const taskData = await response.json();
          // Convert date strings to Date objects if they exist
          if (taskData.duedate) {
            taskData.duedate = new Date(taskData.duedate);
          }
          if (taskData.createdon) {
            taskData.createdon = new Date(taskData.createdon);
          }
          setTask(taskData);
          console.log(taskData);
        } else {
          console.error("Failed to fetch task:", await response.json());
        }
      } catch (error) {
        console.error("Error fetching task data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleStatusChange = async (newStatus: string) => {
    if (!task) return;

    setUpdating(true);

    try {
      const response = await fetch(`/api/updatetaskstatus`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: task.id, status: newStatus }),
      });

      if (response.ok) {
        setTask({ ...task, status: newStatus });
      } else {
        console.error("Failed to update task status:", await response.json());
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-700">
        Loading...
      </div>
    ); // Centered loading state
  }

  if (!task) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-700">
        No task found.
      </div>
    ); // Centered "No task found" message
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-indigo-600">
          Task Details
        </h1>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">{task.title}</h2>
          <p className="text-sm text-gray-500">Task ID: {task.id}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-600">
              <strong>From:</strong> {task.createdbyname} ({task.createdbyemail}
              )
            </p>
            <p className="text-gray-600">
              <strong>To:</strong> {task.formdata?.assignedToName}
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              <strong>Created On:</strong>{" "}
              {task.createdon instanceof Date &&
              !isNaN(task.createdon.getTime())
                ? task.createdon.toDateString()
                : "Unknown Date"}
            </p>
            <p className="text-gray-600">
              <strong>Due Date:</strong>{" "}
              {task.duedate instanceof Date && !isNaN(task.duedate.getTime())
                ? task.duedate.toDateString()
                : "No Due Date"}
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded-md ${
                  task.status === "Not Started"
                    ? "bg-red-100 text-red-600"
                    : task.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-600"
                    : task.status === "Completed"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {task.status || "No Status"}
              </span>
            </p>
          </div>
        </div>

        {/* Displaying questions from fromform and looking up answers in formdata */}
        {task.fromform?.questions && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Form Data</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {task.fromform.questions.map((question, index) => {
                const answer = task.formdata?.[question.question] ?? "";

                return (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {question.question}
                    </label>
                    <input
                      type="text"
                      value={answer}
                      readOnly
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Status Update Buttons */}
        {session?.dbUser?.id === task.assignee && (
          <div className="mt-6">
            <label
              htmlFor="status"
              className="block text-lg font-medium text-gray-700 mb-4"
            >
              Update Status
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleStatusChange("Not Started")}
                className={`w-full sm:w-auto px-5 py-2 rounded-lg font-semibold shadow ${
                  task.status === "Not Started"
                    ? "bg-red-600 text-white"
                    : "bg-red-100 text-red-600"
                } hover:bg-red-200 transition-all duration-300 ease-in-out`}
                disabled={updating || task.status === "Not Started"}
              >
                Not Started
              </button>
              <button
                onClick={() => handleStatusChange("In Progress")}
                className={`w-full sm:w-auto px-5 py-2 rounded-lg font-semibold shadow ${
                  task.status === "In Progress"
                    ? "bg-yellow-600 text-white"
                    : "bg-yellow-100 text-yellow-600"
                } hover:bg-yellow-200 transition-all duration-300 ease-in-out`}
                disabled={updating || task.status === "In Progress"}
              >
                In Progress
              </button>
              <button
                onClick={() => handleStatusChange("Completed")}
                className={`w-full sm:w-auto px-5 py-2 rounded-lg font-semibold shadow ${
                  task.status === "Completed"
                    ? "bg-green-600 text-white"
                    : "bg-green-100 text-green-600"
                } hover:bg-green-200 transition-all duration-300 ease-in-out`}
                disabled={updating || task.status === "Completed"}
              >
                Completed
              </button>
            </div>
            {updating && (
              <p className="mt-4 text-sm text-gray-500 animate-pulse">
                Updating status...
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;