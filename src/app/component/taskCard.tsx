"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";

const TaskCard = ({ id }) => {
  const [show, setShow] = useState(true);
  const handleClick = () => {
    console.log("Show Set");
    setShow((prevShow) => !prevShow);
  };
  return (
    <div className="flex flex-col">
      {show && (
        <>
          <div className="flex mb-3">
            <div className="flex items-start pt-1">
              <input type="checkbox" name="option1" value="value1" onClick={handleClick}/>
              {/* <div
                className="flex items-center space-x-2"
                // onClick={handleClick}
              >
                <input type="checkbox" id="checkbox" className="hidden peer" />
                <span className="block w-6 h-6 border-2 border-gray-500 rounded-full peer-checked:bg-blue-500 peer-checked:border-transparent"></span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white hidden peer-checked:block"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </span>
              </div> */}
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
                <p className="text-sm text-green-500">Today</p>
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
