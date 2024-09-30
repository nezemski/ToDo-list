import { IconButton } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
  const [newTitleTask, setNewTitleTask] = useState(" ");

  const [error, setError] = useState<string | null>(null);

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitleTask(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }

    if (e.ctrlKey && e.charCode === 13) {
      addItem();
      setNewTitleTask("");
    }
  };

  const addItem = () => {
    if (newTitleTask.trim() !== "") {
      props.addItem(newTitleTask.trim());
      setNewTitleTask("");
    } else {
      setError("Title is required");
    }
  };

  return (
    <div>
      <TextField
        value={newTitleTask}
        size={"small"}
        onChange={onNewTitleChangeHandler}
        onKeyPress={onKeyPressHandler}
        error={!!error}
        variant={"outlined"}
        label={"Type value"}
        helperText={error}
      />

      <IconButton onClick={addItem} color={"success"} size={"small"}>
        <SendIcon />
      </IconButton>
    </div>
  );
});
