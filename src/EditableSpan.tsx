import { TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
  title: string;
  onChange: (newValue: string) => void;
};
export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState(false);

  const [title, setTitle] = useState("");

  const activeEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };

  const activeViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <TextField
      value={title}
      size={"small"}
      onChange={onChangeTitleHandler}
      onBlur={activeViewMode}
      autoFocus={true}
    />
  ) : (
    <span onDoubleClick={activeEditMode}>{props.title}</span>
  );
});
