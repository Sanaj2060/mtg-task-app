import TaskCard from "./component/taskCard";
import NavBar from "./component/navBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "./api/auth/[...nextauth]/auth";

export default async function Home() {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/auth/login?callback=/");
  }
  return (
    <main className="w-full">
      <NavBar {...session}/>
      <div className="text-2xl font-bold pl-10">
        <h2>Active Tasks</h2>
      </div>
      <div className="flex flex-col justify-center items-left mt-8 px-10">
        <TaskCard id="1" />
        <TaskCard id="2" />
        <TaskCard id="3" />
        <TaskCard id="4" />
      </div>
    </main>
  );
}
