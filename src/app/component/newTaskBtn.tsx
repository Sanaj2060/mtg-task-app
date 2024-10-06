import Link from "next/link";
import React from "react";
import { FaPlus, FaEye, FaHome, FaWpforms } from "react-icons/fa";

const NewTaskBtn = () => {
  return (
    <div className="float-right">
      <Link href={"/form/create-new-task"}>
        <button
          className="w-40 md:w-auto flex items-center text-white rounded p-2 sm:p-3 m-3 mr-0 bg-green-700 hover:bg-green-900"
          title="Create new task"
        >
          <FaPlus className="mr-2" />
          Create new task
        </button>
      </Link>
    </div>
  );
};

export const ViewCreatedTaskBtn = () => {
  return (
    <div className="float-right">
      <Link href={"/tasks/viewcreated"}>
        <button
          className="w-40 md:w-auto flex items-center text-white rounded p-2 sm:p-3 m-3 mr-0 bg-blue-700 hover:bg-blue-900"
          title="View created tasks"
        >
          <FaEye className="mr-2" />
          Tasks you created
        </button>
      </Link>
    </div>
  );
};

export const GoHome = () => {
  return (
    <div className="float-right">
      <Link href={"/"}>
        <button
          className="w-40 md:w-auto flex items-center text-white rounded p-2 sm:p-3 m-3 mr-0 bg-teal-700 hover:bg-teal-900"
          title="Go Home"
        >
          <FaHome className="mr-2" />
          Tasks Assigned to You
        </button>
      </Link>
    </div>
  );
};

export const CreateNewForm = () => {
  return (
    <div className="float-right">
      <Link href={"/form/create-new-form"}>
        <button
          className="w-40 md:w-auto flex items-center text-white rounded p-2 sm:p-3 m-3 mr-0 bg-yellow-600 hover:bg-yellow-800"
          title="New Form"
        >
          <FaWpforms className="mr-2" />
          Create New Form
        </button>
      </Link>
    </div>
  );
};

export default NewTaskBtn;
