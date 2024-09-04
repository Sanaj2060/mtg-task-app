//call the const tasks = await getAllTasksWithUserName(session.dbUser?.id || "");
import { getAllTasksWithUserName } from "../api/lib/db";
import TaskCard from "./taskCard";

export default async function TaskCardWrapper({ id }: any) {
  const tasks = await getAllTasksWithUserName(id);
  // console.log(id)
  // console.log(tasks)
  return (
    <div>
      {tasks?.tasks.map((task, key) =>
        task.duedate ? (
          <TaskCard key={task.id} id={task.id} duedate={task.duedate} />
        ) : (
          <TaskCard key={task.id} id={task.id} duedate={new Date()} />
        )
      )}
    </div>
  );
}
