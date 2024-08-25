"use client";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import Image from "next/image";

const NavBar = (props: Session) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="p-4 flex justify-between w-full">
      <div className="text-lg font-semibold">MTGTODO</div>
      <div>
        <img 
          src={props.user?.image ? props.user.image : "../../public/next.svg"}
          className="max-h-36 rounded-full w-9"
          alt={`profile photo of ${props.user?.name}`}
          onClick={handleDropdownToggle}
        />
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
