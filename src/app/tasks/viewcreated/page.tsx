export const revalidate = 0; //disable cached to fetch fresh data everytime
import React from "react";
import TaskCardWrapper from "@/app/component/taskCardWrapper";
import NavBar from "@/app/component/navBar";
import NewTaskBtn from "@/app/component/newTaskBtn";
import { GoHome } from "@/app/component/newTaskBtn";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/auth";

export default async function Page() {
  const session = await getServerSession(options);
  return (
    <main className="w-full flex flex-col items-center min-h-screen">
      <div className="w-full lg:w-5/6">
        <NavBar />
        <div className="px-4">
          <NewTaskBtn />
          <GoHome />
          <div className="text-2xl font-bold ">
            <h4>Tasks you created</h4>
          </div>
          <div className="flex flex-col justify-center items-left mt-8">
            {/* <TaskfilterWrapper /> */}
            <hr className="mb-3" />
            <TaskCardWrapper id={session?.dbUser?.id} where={"viewcreated"} />
          </div>
        </div>
      </div>
    </main>
  );
}
