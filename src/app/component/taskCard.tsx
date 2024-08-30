"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import { FormatRelativeDate, relativeDate } from "../api/lib/dateAsDay";

const TaskCard: React.FC<{ id: string, duedate: Date }> = ({ id, duedate }) => {
  const [show, setShow] = useState(true);
  const handleClick = () => {
    // console.log("Show Set");
    setShow((prevShow) => !prevShow);
  };
  const relativeDate: relativeDate = duedate ? FormatRelativeDate(duedate) : {dateText: "", textColor: ""}
  return (
    <div className="flex flex-col">
      {show && (
        <>
          <div className="flex mb-3">
            <div className="flex items-start pt-1">
              <input type="checkbox" name="option1" value="value1" onClick={handleClick}/>
            </div>

            <div className="flex flex-col pl-3 gap-1">
              <p>{id} - Create to-do app</p>
              <p className="text-sm text-gray-500">To-do app for mateng</p>
              <div className="flex">
                <Image
                  src="/calendar-clock.png"
                  width={30}
                  height={30}
                  className="block w-4 h-4 text-green-500 mr-2"
                  alt="calendar"
                />
                {/* <p className="text-sm {}">{relativeDate.dateText}</p> */}
                <p className={relativeDate.textColor}>{relativeDate.dateText}</p>
              </div>
            </div>
          </div>
          <hr className="border-gray-400 mb-5" />
        </>
      )}
    </div>
  );
};

export default TaskCard;
