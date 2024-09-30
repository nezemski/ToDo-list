import { Provider } from "react-redux";
import { AppRootState, store } from "../state/store";
import { combineReducers, createStore } from "redux";
import { todolistReducer } from "../state/todolist-reducer";
import { tasksReducer } from "../state/tasks-reducer";
import { v1 } from "uuid";

// const rootReducer = combineReducers({
//   todolists: todolistReducer,
//   tasks: tasksReducer,
// });

// const initialGlobalState = {
//   todolists: [
//     { id: "todolistId1", title: "What to learn", filter: "all" },
//     { id: "todolistId2", title: "What to buy", filter: "all" },
//   ],
//   tasks: {
//     ["todolistId1"]: [
//       { id: v1(), title: "CSS", isDone: true },
//       { id: v1(), title: "React", isDone: false },
//     ],
//     ["todolistId2"]: [
//       { id: v1(), title: "Milk", isDone: true },
//       { id: v1(), title: "Book", isDone: true },
//     ],
//   },
// };

// export const storyBookStore = createStore(
//   rootReducer,
//   initialGlobalState as AppRootState
// );

export const ReduxStoreProviderDecorator = (storyFn: any) => {
  return <Provider store={store}> {storyFn()} </Provider>;
};
