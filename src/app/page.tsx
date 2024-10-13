export const revalidate = 0; //disable cached to fetch fresh data everytime
import NavBar from "./component/navBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "./api/auth/[...nextauth]/auth";
import Register from "./auth/register/page";
import TaskCardWrapper from "./component/taskCardWrapper";
import NewTaskBtn, { CreateNewForm } from "./component/newTaskBtn";
import { ViewCreatedTaskBtn } from "./component/newTaskBtn";

export default async function Home() {
  // const {data: session, status} = getSession();
  const session = await getServerSession(options);
  if (!session) {
    redirect("/auth/login?callback=/");
  }
  const userEmail = session.user?.email;
  const dbUser = session?.dbUser;
  if (userEmail && !dbUser) {
    return <Register />;
  }

  return (
    <main className="w-full flex flex-col items-center min-h-screen">
      <div className="w-full md:w-4/6">
        <div className="px-4">
          <div className="flex flex-col md:flex-row gap-1 justify-center w-full items-center">
            <NewTaskBtn />
            <ViewCreatedTaskBtn />
            <CreateNewForm />
          </div>
          <hr className="my-3" />
          <div className="text-2xl font-bold ">
            <h4>Tasks for {session.dbUser?.fullname}</h4>
          </div>
          <div className="flex flex-col justify-center items-left">
            {/* <TaskfilterWrapper /> */}
            <hr className="mt-3 mb-3" />
            <TaskCardWrapper id={session.dbUser?.id} where={"home"} />
          </div>
        </div>
      </div>
    </main>
  );
}
