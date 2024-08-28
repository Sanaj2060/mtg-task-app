import TaskCard from "./component/taskCard";
import NavBar from "./component/navBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "./api/auth/[...nextauth]/auth";
import Register from "./auth/register/page";
import { getAllTasks, getAllTasksWithUserName } from "./api/lib/db";
import Image from "next/image";
import TaskCardWrapper from "./component/taskCardWrapper";

export default async function Home() {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/auth/login?callback=/");
  }
  const userEmail = session.user?.email;
  const dbUser = session?.dbUser;
  if (userEmail && !dbUser) {
    return <Register {...session} />;
  }
  // Need to move this method call to taskCardWrapper
  const tasks = await getAllTasksWithUserName(session.dbUser?.id || "");

  return (
    <main className="w-full">
      <NavBar {...session} />
      <div className="text-2xl font-bold pl-10">
        <h2>Active Tasks for {session.dbUser?.fullname}</h2>
      </div>
      <div className="flex flex-col justify-center items-left mt-8 px-10">
        <TaskCardWrapper id={session.dbUser?.id} />
        <div className="flex flex-col justify-center items-center m-8 px-10">
          {tasks?.tasks.map((task) => {
            const today = new Date().getTime()
            const duedatec = task.duedate ? task.duedate?.getTime() : 0
            console.log(today, duedatec)
            let timeDiff = duedatec - today
            const dayDiff = Math.floor(timeDiff/(1000*60*60*24))
            console.log(dayDiff)

            return (
              <div key={task.id} className="flex bg-yellow-300 m-2 p-6 justify-between w-full">
                <div>
                  <p>{task.title}</p>
                  <p>Task Assignee ID: {task.assignee}</p>
                  <p>Task Created By: {task.createdbyname}</p>
                  <p>Task Created By Email: {task.createdbyemail}</p>
                  <p>Task Due Date: {task.duedate?.toDateString()}</p>
                </div>
                <div>
                  <Image
                    src={task.createdbypic}
                    className="max-h-36 rounded-full w-9"
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt="createdbyPic"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
