import React from "react";

import { Provider } from "react-redux";
import { store } from "./state/store";
import { EditableSpan } from "./EditableSpan";
import { action } from "@storybook/addon-actions";

const callback = action("new value");
export const EditableSpanBaseExample = () => {
  return (
    <Provider store={store}>
      <EditableSpan title={"Start title"} onChange={callback} />
    </Provider>
  );
};

export default {
  title: "EditableSpan Component",
  component: EditableSpan,
};
