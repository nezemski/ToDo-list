import { TasksStateType } from "../AppWithRedux";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitlesAC,
  removeTaskAC,
  tasksReducer,
} from "./tasks-reducer";
import { AddTodolistAC } from "./todolist-reducer";

test("correct task should be deleted from correct array", () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "REACT", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: true },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };

  const action = removeTaskAC("2", "todolistId2");
  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(2);
});

test("correct task should be add from correct array", () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "REACT", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: true },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };

  const action = addTaskAC("juse", "todolistId2");
  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("juse");
});

test("status of specified task should be changed", () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "REACT", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: true },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };

  const action = changeTaskStatusAC("2", "todolistId2", false);
  const endState = tasksReducer(startState, action);

  expect(endState["todolistId2"][1].isDone).toBeFalsy();
  expect(endState["todolistId1"][1].isDone).toBeTruthy();
  expect(endState["todolistId2"].length).toBe(3);
});

test("title of specified task should be changed", () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "REACT", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: true },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };

  const action = changeTaskTitlesAC("2", "milkyway", "todolistId2");
  const endState = tasksReducer(startState, action);

  expect(endState["todolistId2"][1].title).toBe("milkyway");
  expect(endState["todolistId1"][1].title).toBe("JS");
});

test("new property with new array should be added when new todolist is added", () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };

  const action = AddTodolistAC("title no matter");

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2");
  if (!newKey) {
    throw Error("hhh");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toStrictEqual([]);
});
