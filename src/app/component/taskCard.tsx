"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FormatRelativeDate } from "../api/lib/dateAsDay";
import Link from "next/link";
import { FaCalendarTimes } from "react-icons/fa";

const TaskCard: React.FC<{
  id: string;
  duedate: Date;
  title: string;
  status: string;
  createdbyemail: string;
}> = ({ id, duedate, title, status, createdbyemail }) => {
  const relativeDate = duedate
    ? FormatRelativeDate(duedate)
    : { dateText: "", textColor: "" };

  return (
    <Link href={`/tasks/${id}`} className="no-underline text-inherit">
      <div className="flex mb-3 cursor-pointer justify-between">
        <div className="flex flex-col pl-3 gap-1">
          <p className="text-base">{title}</p>
          <p className="text-sm text-gray-500">
            <span className="text-gray-500">From: </span>
            {createdbyemail}
          </p>
          <div className={`flex items-center gap-2 ${relativeDate.textColor}`}>
            <FaCalendarTimes className="w-4 h-4" />
            <p className={relativeDate.textColor}>{relativeDate.dateText}</p>
          </div>
        </div>
        <div className="flex items-end justify-center">
          <div
            className={`px-2 text-sm py-1 rounded-md ${
              status === "Not Started"
                ? "bg-red-100 text-red-600"
                : status === "In Progress"
                ? "bg-yellow-100 text-yellow-600"
                : status === "Completed"
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {status || "No Status"}
          </div>
        </div>
      </div>
      <hr className="border-gray-400 mb-5" />
    </Link>
  );
};

export default TaskCard;
