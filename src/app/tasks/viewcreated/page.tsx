export const revalidate = 0; //disable cached to fetch fresh data everytime
import React from "react";
import TaskCardWrapper from "@/app/component/taskCardWrapper";
import NavBar from "@/app/component/navBar";
import NewTaskBtn, { CreateNewForm } from "@/app/component/newTaskBtn";
import { GoHome } from "@/app/component/newTaskBtn";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/auth";

export default async function Page() {
  const session = await getServerSession(options);
  return (
    <main className="w-full flex flex-col items-center min-h-screen">
      <div className="w-full lg:w-5/6">
        {/* <NavBar /> */}
        <div className="px-4">
          
          <div className="flex flex-row flex-wrap gap-3">
          <NewTaskBtn />
          <GoHome />
          <CreateNewForm />
          </div>
          <hr className="mt-3 mb-3"/>
          <div className="text-2xl font-bold ">
            <h4>Tasks you created</h4>
          </div>
          <div className="flex flex-col justify-center items-left">
            {/* <TaskfilterWrapper /> */}
            <hr className="mt-3 mb-3"/>
            <TaskCardWrapper id={session?.dbUser?.id} where={"viewcreated"} />
          </div>
        </div>
      </div>
    </main>
  );
}
