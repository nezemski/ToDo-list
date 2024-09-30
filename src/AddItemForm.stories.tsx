import React from "react";
import { AddItemForm } from "./AddItemForm";



export const AddItemFormbaseExample = (props: any) => {
  return (
    <AddItemForm
      addItem={(title: string) => {
        alert(title);
      }}
    />
  );
};

export default {
  title: "AddItemForm Component",
  component: AddItemForm,
};
