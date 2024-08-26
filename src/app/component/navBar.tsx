"use client";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const NavBar = (props: Session) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    signOut();
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-4 flex justify-between w-full">
      <div className="text-lg font-semibold">MTGTODO</div>
      <div ref={dropdownRef}>
        <Image 
          src={props.user?.image ? props.user.image : "/next.svg"}
          className="max-h-36 rounded-full w-9"
          width={0}
          height={0}
          sizes="100vw"
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