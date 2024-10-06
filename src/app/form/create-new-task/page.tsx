import NavBar from "@/app/component/navBar";
import UserSearch from "@/app/component/UserSearch";
import React from "react";

export default function Page() {
  return (
    <main className="w-full flex flex-col items-center min-h-screen">
      <div className="w-full lg:w-5/6">
        {/* <NavBar /> */}
        <div className="px-4">
          <div className="text-2xl font-bold">
            <h2>Search the User or Business</h2>
          </div>
          <div className="flex flex-col justify-center items-left mt-8">
            <UserSearch />
          </div>
        </div>
      </div>
    </main>
  );
}
