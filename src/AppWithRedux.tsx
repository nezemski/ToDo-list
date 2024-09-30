import "./App.css";
import { TaskType, ToDoList } from "./ToDoList";
import { AddItemForm } from "./AddItemForm";
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AddTodolistAC,
  ChangeFilterAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC,
} from "./state/todolist-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "./state/store";
import { useCallback } from "react";

export type FilterValuesType = "all" | "active" | "completed";
export type ToDoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithRedux() {
  const dispatch = useDispatch();

  const todolists = useSelector<AppRootState, Array<ToDoListType>>(
    (state) => state.todolists
  );

  const changeFilter = useCallback(
    (value: FilterValuesType, todolistId: string) => {
      dispatch(ChangeFilterAC(value, todolistId));
    },
    [dispatch]
  );

  const changeTodolistTitle = useCallback(
    (id: string, newTitle: string) => {
      dispatch(ChangeTodolistTitleAC(id, newTitle));
    },
    [dispatch]
  );

  const removeTodolist = useCallback(
    (todolistId: string) => {
      dispatch(RemoveTodolistAC(todolistId));
      dispatch(RemoveTodolistAC(todolistId));
    },
    [dispatch]
  );

  const addTodoList = useCallback(
    (title: string) => {
      const action = AddTodolistAC(title);
      dispatch(action);
    },
    [dispatch]
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodoList} />
        </Grid>
        <Grid container spacing={3}>
          {todolists.map((tl) => {
            return (
              <Grid item>
                <Paper
                  variant="elevation"
                  elevation={2}
                  style={{ padding: "30px" }}
                >
                  <ToDoList
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    changeFilter={changeFilter}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;
