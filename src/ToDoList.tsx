import React, { useCallback } from "react";
import { FilterValuesType } from "./AppWithRedux";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "./state/store";
import { addTaskAC } from "./state/tasks-reducer";
import { Task } from "./Task";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  filter: FilterValuesType;
  removeTodolist: (todolistId: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
};

export const ToDoList = React.memo(function (props: PropsType) {
  const dispatch = useDispatch();

  const tasks = useSelector<AppRootState, Array<TaskType>>(
    (state) => state.tasks[props.id]
  );

  const onAllClickHandler = useCallback(
    () => props.changeFilter("all", props.id),
    [props.changeFilter, props.id]
  );

  const onActiveClickHandler = useCallback(
    () => props.changeFilter("active", props.id),
    [props.changeFilter, props.id]
  );

  const onCompletedClickHandler = useCallback(
    () => props.changeFilter("completed", props.id),
    [props.changeFilter, props.id]
  );

  const removeTodolist = () => {
    props.removeTodolist(props.id);
  };

  const changeTodolistTitle = useCallback(
    (newTitle: string) => {
      props.changeTodolistTitle(props.id, newTitle);
    },
    [props.changeTodolistTitle, props.id]
  );

  let allTodolistTasks = tasks;
  let tasksForToDoList = allTodolistTasks;

  if (props.filter === "completed") {
    tasksForToDoList = allTodolistTasks.filter((t) => t.isDone === true);
  }
  if (props.filter === "active") {
    tasksForToDoList = allTodolistTasks.filter((t) => t.isDone === false);
  }

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist} size="large">
          <DeleteIcon fontSize={"medium"} />
        </IconButton>
      </h3>
      <AddItemForm
        addItem={(title: string) => {
          dispatch(addTaskAC(title, props.id));
        }}
      />
      <div>
        {tasksForToDoList.map((t) => (
          <Task task={t} todolistId={props.id} />
        ))}
      </div>
      <div>
        <Button
          variant={props.filter === "all" ? "contained" : "text"}
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          variant={props.filter === "active" ? "contained" : "text"}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          variant={props.filter === "completed" ? "contained" : "text"}
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  );
});
