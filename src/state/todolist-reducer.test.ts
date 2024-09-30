import { v1 } from "uuid";
import {
  AddTodolistAC,
  ChangeFilterAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC,
  todolistReducer,
} from "./todolist-reducer";
import {
  FilterValuesType,
  TasksStateType,
  ToDoListType,
} from "../AppWithRedux";
import { tasksReducer } from "./tasks-reducer";

test("correct todolist should be removed", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: Array<ToDoListType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];

  const endState = todolistReducer(startState, RemoveTodolistAC(todolistId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();
  let newTodolistTitle = "Yo";

  const startState: Array<ToDoListType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];

  const endState = todolistReducer(startState, AddTodolistAC(newTodolistTitle));

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolistTitle);
  expect(endState[2].filter).toBe("all");
});

test("correct todolist should change its name", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodolistTitle = "NewTodolist";

  const startState: Array<ToDoListType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];

  const endState = todolistReducer(
    startState,
    ChangeTodolistTitleAC(todolistId1, newTodolistTitle)
  );

  expect(endState.length).toBe(2);
  // expect(endState[0].title).toBe("What to learn");
  expect(endState[0].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: Array<ToDoListType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];
  const newFilter: FilterValuesType = "completed";

  const endState = todolistReducer(
    startState,
    ChangeFilterAC(newFilter, todolistId1)
  );

  expect(endState[0].filter).toBe(newFilter);
  expect(endState[1].filter).toBe("all");
});

test("property with todolistId should be deleted", () => {
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

  const action = RemoveTodolistAC("todolistId2");
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).toBeUndefined();
});
