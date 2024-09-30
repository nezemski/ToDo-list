import { TasksStateType, ToDoListType } from "../AppWithRedux";
import { tasksReducer } from "./tasks-reducer";
import { AddTodolistAC, todolistReducer } from "./todolist-reducer";

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<ToDoListType> = [];

  const action = AddTodolistAC("new todolist");

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistState = todolistReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistState[0].id;

  expect(idFromTasks).toBe(action.todolistId);
  expect(idFromTodolists).toBe(action.todolistId);
});
