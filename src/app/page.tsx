import NavBar from "./component/navBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "./api/auth/[...nextauth]/auth";
import Register from "./auth/register/page";
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

  return (
    <main className="w-full flex flex-col items-center min-h-screen">
      <div className="w-full lg:w-5/6">
        <NavBar {...session} />
        <div className="px-4">
          <div className="text-2xl font-bold ">
            <h2>Active Tasks for {session.dbUser?.fullname}</h2>
          </div>
          <div className="flex flex-col justify-center items-left mt-8">
            <TaskCardWrapper id={session.dbUser?.id} />
          </div>
        </div>
      </div>
    </main>
  );
}
