"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FormatRelativeDate } from "../api/lib/dateAsDay";

const TaskCard: React.FC<{ id: string; duedate: Date; title: string; status: string; createdbyemail: string }> = ({ id, duedate, title, status, createdbyemail }) => {
  const relativeDate = duedate
    ? FormatRelativeDate(duedate)
    : { dateText: "", textColor: "" };

  return (
    <a
      href={`/tasks/${id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="no-underline text-inherit"
    >
      <div className="flex flex-col">
        <div className="flex mb-3 cursor-pointer justify-between">
          <div className="flex flex-col pl-3 gap-1">
            <p>{title}</p>
            <p className="text-sm text-gray-500">from: {createdbyemail}</p>
            <div className="flex">
              <Image
                src="/calendar-clock.png"
                width={30}
                height={30}
                className="block w-4 h-4 text-green-500 mr-2"
                alt="calendar"
              />
              <p className={relativeDate.textColor}>{relativeDate.dateText}</p>
            </div>
          </div>
          <div>
          <p className="text-gray-600">
  <strong></strong>{" "}
  <span
    className={`px-2 py-1 rounded-md ${
      status === 'Not Started'
        ? 'bg-red-100 text-red-600'
        : status === 'In Progress'
        ? 'bg-yellow-100 text-yellow-600'
        : status === 'Completed'
        ? 'bg-green-100 text-green-600'
        : 'bg-gray-100 text-gray-600'
    }`}
  >
    {status || "No Status"}
  </span>
</p>

          </div>
        </div>
        <hr className="border-gray-400 mb-5" />
      </div>
    </a>
  );
};

export default TaskCard;
