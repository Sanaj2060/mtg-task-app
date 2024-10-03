import Link from "next/link";
import React from "react";
import { FaPlus, FaEye, FaHome } from "react-icons/fa";

const NewTaskBtn = () => {
  return (
    <div className="float-right">
      <Link href={"/form/create-new-task"}>
        <button
          className="flex items-center text-white rounded p-2 m-3 mr-0 bg-green-700 hover:bg-green-900"
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
          className="flex items-center text-white rounded p-2 m-3 mr-0 bg-indigo-700 hover:bg-indigo-900"
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
          className="flex items-center text-white rounded p-2 m-3 mr-0 bg-indigo-700 hover:bg-indigo-900"
          title="Go Home"
        >
          <FaHome className="mr-2" />
          Task for you
        </button>
      </Link>
    </div>
  );
};

export default NewTaskBtn;