//call the const tasks = await getAllTasksWithUserName(session.dbUser?.id || "");
import { getAllTasksWithUserName, getAllTasks } from "../api/lib/db";
import TaskCard from "./taskCard";

export default async function TaskCardWrapper({ id }: any) {
  const tasks = await getAllTasksWithUserName(id);
  // console.log(id)
  // console.log(tasks)
  return (
    <div>
      {tasks?.tasks.map((task, key) =>
        task.duedate ? (
          <TaskCard key={task.id} id={task.title} duedate={task.duedate} />
        ) : (
          <TaskCard key={task.id} id={task.title} duedate={new Date()} />
        )
      )}
    </div>
  );
}
