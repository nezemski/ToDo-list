import { v1 } from "uuid";
import { TasksStateType } from "../AppWithRedux";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
} from "./todolist-reducer";

type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  todolistId: string;
  taskId: string;
};

type AddTaskActionType = {
  type: "ADD-TASK";
  todolistId: string;
  title: string;
};

type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  todolistId: string;
  taskId: string;
  isDone: boolean;
};

type ChangeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  taskId: string;
  todolistId: string;
  title: string;
};

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;

const initialState = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      const stateCopy = { ...state };

      const tasks = stateCopy[action.todolistId];

      const filteredTasks = tasks.filter((t) => t.id !== action.taskId);

      stateCopy[action.todolistId] = filteredTasks;

      return stateCopy;
    }

    case "ADD-TASK": {
      const stateCopy = { ...state };

      const tasks = stateCopy[action.todolistId];

      const newTask = { id: v1(), title: action.title, isDone: false };

      const newTasks = [newTask, ...tasks];

      stateCopy[action.todolistId] = newTasks;

      return stateCopy;
    }

    case "CHANGE-TASK-STATUS": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((task) => {
          if (task.id === action.taskId) {
            return {
              ...task,
              isDone: action.isDone,
            };
          }
          return task;
        }),
      };

      // const stateCopy = { ...state };

      // const tasks = stateCopy[action.todolistId];

      // stateCopy[action.todolistId] = tasks.map((t) =>
      //   t.id === action.taskId ? { ...t, isDone: action.isDone } : t
      // );

      // return stateCopy;
    }

    case "CHANGE-TASK-TITLE": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((task) => {
          if (task.id === action.taskId) {
            return {
              ...task,
              title: action.title,
            };
          }
          return task;
        }),
      };

      // const tasks = stateCopy[action.todolistId];

      // let task = tasks.find((t) => t.id === action.taskId);

      // if (task) {
      //   task.title = action.title;
      // }

      // stateCopy[action.todolistId] = tasks;

      // return stateCopy;
    }

    case "ADD-TODOLIST": {
      return { ...state, [action.todolistId]: [] };
    }

    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };

      delete stateCopy[action.id];

      return stateCopy;
    }

    default:
      return state;
  }
};

export const removeTaskAC = (
  taskId: string,
  todolistId: string
): RemoveTaskActionType => {
  return { type: "REMOVE-TASK", todolistId: todolistId, taskId: taskId };
};

export const addTaskAC = (
  title: string,
  todolistId: string
): AddTaskActionType => {
  return { type: "ADD-TASK", title: title, todolistId: todolistId };
};

export const changeTaskStatusAC = (
  taskId: string,
  todolistId: string,
  isDone: boolean
): ChangeTaskStatusActionType => {
  return {
    type: "CHANGE-TASK-STATUS",
    taskId: taskId,
    todolistId: todolistId,
    isDone,
  };
};

export const changeTaskTitlesAC = (
  taskId: string,
  title: string,
  todolistId: string
): ChangeTaskTitleActionType => {
  return {
    type: "CHANGE-TASK-TITLE",
    taskId: taskId,
    title,
    todolistId: todolistId,
  };
};
