import { useDispatch } from "react-redux";
import {
  changeTaskStatusAC,
  changeTaskTitlesAC,
  removeTaskAC,
} from "./state/tasks-reducer";
import { TaskType } from "./ToDoList";
import { EditableSpan } from "./EditableSpan";
import { Checkbox, IconButton } from "@mui/material";
import React, { ChangeEvent, useCallback } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

type TaskPropsType = {
  task: TaskType;
  todolistId: string;
};

export const Task = React.memo((props: TaskPropsType) => {
  const dispatch = useDispatch();

  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    dispatch(
      changeTaskStatusAC(props.task.id, props.todolistId, newIsDoneValue)
    );
  };

  const onChangeTitleHandler = useCallback(
    (newValue: string) => {
      dispatch(changeTaskTitlesAC(props.task.id, newValue, props.todolistId));
    },
    [props.task.id, props.todolistId, dispatch]
  );

  const onRemoveHandler = () => {
    dispatch(removeTaskAC(props.task.id, props.todolistId));
  };

  return (
    <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
      <Checkbox
        onChange={onChangeStatusHandler}
        checked={props.task.isDone}
        color={"success"}
      />
      <EditableSpan title={props.task.title} onChange={onChangeTitleHandler} />
      <IconButton onClick={onRemoveHandler} size="medium">
        <DeleteIcon fontSize={"small"} />
      </IconButton>
    </div>
  );
});
