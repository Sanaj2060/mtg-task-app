"use client";
import { signOut, useSession } from "next-auth/react";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { VscSignOut } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // List of paths where NavBar should be empty
  const excludedPaths = ["/auth/login", "/auth/register"];

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

  // Conditionally return empty if the pathname is in the excluded paths
  if (excludedPaths.includes(pathname)) {
    return <></>;
  }

  // Rest of the NavBar component
  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="p-4 flex justify-between w-full px-4 md:px-20 shadow-sm">
      <Link href="/">
        <div
          className={`text-3xl font-bold italic`}
          style={{ color: "#025200" }}
        >
          mateng
        </div>
      </Link>

      <div ref={dropdownRef} className="relative">
        <Image
          src={session?.user?.image ? session?.user.image : "/next.svg"}
          className="max-h-36 rounded-full w-9 cursor-pointer"
          width={0}
          height={0}
          sizes="100vw"
          alt={`profile photo of ${session?.user?.name}`}
          onClick={handleDropdownToggle}
        />
        {isDropdownOpen && (
          <div className="p-4 absolute right-0 mt-2 w-[300px] bg-white border border-gray-200 rounded-md shadow-lg">
            <div className="flex gap-6">
              <div className="mb-2">
                <Image
                  src={session?.user?.image ? session?.user.image : "/next.svg"}
                  className="max-h-36 rounded-full w-[60px]"
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt={`profile photo of ${session?.user?.name}`}
                  onClick={handleDropdownToggle}
                />
              </div>
              <div className="flex flex-col items-start justify-start">
                <p>{session?.user?.name}</p>
                <p className="text-xs text-gray-500">{session?.user?.email}</p>
              </div>
            </div>
            <div className="w-full flex flex-col items-start">
              <Link href="/profile" className="w-full">
                <div className="w-full p-2 text-gray-700 hover:bg-gray-100">
                  <p className="flex gap-2 items-center cursor-pointer ml-20">
                    <CgProfile />
                    Profile
                  </p>
                </div>
              </Link>

              <div
                onClick={handleSignOut}
                className="w-full p-2 text-gray-700 hover:bg-gray-100"
              >
                <p className="flex gap-2 items-center cursor-pointer ml-20">
                  <VscSignOut /> Sign Out
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
