import { getAllTasksWithUserNameTaskCard, getAllTasksCreatedWithUserNameTaskCard } from "../api/lib/db";
import TaskCard from "./taskCard";

export default async function TaskCardWrapper({ id, where }: { id: any; where: any }) {
  let tasks;

  if (where === "viewcreated") {
    tasks = await getAllTasksCreatedWithUserNameTaskCard(id);
  } else {
    tasks = await getAllTasksWithUserNameTaskCard(id);
  }

  // console.log(id)
  return (
    <div>
      {tasks?.tasks.map((task) =>
        task.duedate && task.status ? (
          <TaskCard
            key={task.id}
            id={task.id}
            duedate={task.duedate}
            title={task.title}
            status={task.status}
            createdbyemail={task.createdbyemail}
          />
        ) : (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            status="null"
            createdbyemail={task.createdbyemail}
            duedate={new Date()}
          />
        )
      )}
    </div>
  );
}