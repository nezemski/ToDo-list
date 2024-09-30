import { v1 } from "uuid";
import { FilterValuesType, ToDoListType } from "../AppWithRedux";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};

type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};
export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
  todolistId: string;
};

type ChangeFilterTodolistActionType = {
  type: "CHANGE-FILTER";
  id: string;
  filter: FilterValuesType;
};

type ActionsType =
  | RemoveTodolistActionType
  | ChangeFilterTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType;

// export let todolistId1 = v1();
// export let todolistId2 = v1();

const initialState: Array<ToDoListType> = [
  // { id: todolistId1, title: "What to learn", filter: "all" },
  // { id: todolistId2, title: "What to buy", filter: "all" },
];

export const todolistReducer = (
  state: Array<ToDoListType> = initialState,
  action: ActionsType
): Array<ToDoListType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((tl) => tl.id !== action.id);

    case "ADD-TODOLIST":
      return [
        {
          id: action.todolistId,
          title: action.title,
          filter: "all",
        },
        ...state,
      ];

    case "CHANGE-TODOLIST-TITLE": {
      const todolist = state.find((tl) => tl.id === action.id);
      if (todolist) {
        todolist.title = action.title;
      }
      return [...state];
    }

    case "CHANGE-FILTER": {
      const todolist = state.find((tl) => tl.id === action.id);
      if (todolist) {
        todolist.filter = action.filter;
      }
      return [...state];
    }

    default:
      return state;
  }
};

export const RemoveTodolistAC = (
  todolistId: string
): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", id: todolistId };
};

export const AddTodolistAC = (title: string): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", todolistId: v1(), title: title };
};

export const ChangeTodolistTitleAC = (
  id: string,
  title: string
): ChangeTodolistTitleActionType => {
  return { type: "CHANGE-TODOLIST-TITLE", id: id, title: title };
};

export const ChangeFilterAC = (
  filter: FilterValuesType,
  id: string
): ChangeFilterTodolistActionType => {
  return { type: "CHANGE-FILTER", filter: filter, id: id };
};
