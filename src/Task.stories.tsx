import React from "react";
import { Task } from "./Task";
import { ReduxStoreProviderDecorator } from "./stories/ReduxStoreProviderDecorator";

export const TaskBaseExample = () => {
  return (
    <>
      <Task
        task={{ id: "1", title: "1", isDone: false }}
        todolistId={"todolistId1"}
      />
      <Task
        task={{ id: "2", title: "2", isDone: true }}
        todolistId={"todolistId2"}
      />
    </>
  );
};

export default {
  title: "Task Component",
  component: Task,
  decorators: [ReduxStoreProviderDecorator],
};
