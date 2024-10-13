import Link from "next/link";
import React from "react";
import { FaPlus, FaEye, FaHome, FaWpforms } from "react-icons/fa";

const NewTaskBtn = () => {
  return (
    <div className="flex w-full">
      <Link
        href={"/form/create-new-task"}
        className="w-full flex gap-3 items-center justify-center text-white rounded py-4 px-3 sm:p-3 m-3 bg-green-500 hover:bg-green-600"
      >
        <FaPlus className="" />
        <p>Create task</p>
      </Link>
    </div>
  );
};

export const ViewCreatedTaskBtn = () => {
  return (
    <div className="w-full flex">
      <Link
        href={"/tasks/viewcreated"}
        className="w-full flex gap-3 items-center justify-center text-white rounded py-4 px-3 sm:p-3 m-3 bg-blue-500 hover:bg-blue-600"
      >
        <FaEye className="" />
        <p>Tasks created</p>
      </Link>
    </div>
  );
};

export const GoHome = () => {
  return (
    <div className="float-right">
      <Link
        href={"/"}
        className="w-full flex gap-3 items-center justify-center text-white rounded py-4 px-3 sm:p-3 m-3 bg-yellow-600 hover:bg-yellow-800"
      >
        <FaHome className="" />
        <p>Tasks Assigned to You</p>
      </Link>
    </div>
  );
};

export const CreateNewForm = () => {
  return (
    <div className="w-full flex">
      <Link
        href={"/form/create-new-form"}
        className="w-full gap-3 flex items-center justify-center text-white rounded py-4 px-3 sm:p-3 m-3 bg-orange-500 hover:bg-orange-600"
      >
        <FaWpforms className="" />
        <p>Create Form</p>
      </Link>
    </div>
  );
};

export default NewTaskBtn;
