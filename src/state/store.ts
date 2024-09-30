import { combineReducers, createStore } from "redux";
import { todolistReducer } from "./todolist-reducer";
import { tasksReducer } from "./tasks-reducer";
import { TasksStateType, ToDoListType } from "../AppWithRedux";

const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: tasksReducer,
});

export type AppRootState = {
  todolists: Array<ToDoListType>;
  tasks: TasksStateType;
};

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;
