import createDataContext from "./createDataContext";

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_LIST":
      return {
        ...state,
        lists: [...state.lists, { ...action.payload, todos: [] }],
      };
    case "DELETE_LIST":
      return {
        ...state,
        lists: state.lists.filter((list) => list._id !== action.payload),
      };
    case "ADD_TODO":
      return {
        ...state,
        lists: state.lists.map((list) =>
          list._id === action.payload.listId
            ? { ...list, todos: [...list.todos, action.payload.todo] }
            : list
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        lists: state.lists.map((list) =>
          list._id === action.payload.listId
            ? {
                ...list,
                todos: list.todos.filter(
                  (todo) => todo._id !== action.payload.todoId
                ),
              }
            : list
        ),
      };
    case "TOGGLE_COMPLETE":
      return {
        ...state,
        lists: state.lists.map((list) =>
          list._id === action.payload.listId
            ? {
                ...list,
                todos: list.todos.map((todo) =>
                  todo._id === action.payload.todoId
                    ? { ...todo, complete: !todo.complete }
                    : todo
                ),
              }
            : list
        ),
      };
    default:
      return state;
  }
};

const addList = (dispatch) => (list) => {
  dispatch({ type: "ADD_LIST", payload: list });
};

const deleteList = (dispatch) => (listId) => {
  dispatch({ type: "DELETE_LIST", payload: listId });
};

const addTodo = (dispatch) => (todo, listId) => {
  dispatch({ type: "ADD_TODO", payload: { todo, listId } });
};

const deleteTodo = (dispatch) => (todoId, listId) => {
  dispatch({ type: "DELETE_TODO", payload: { todoId, listId } });
};

const toggleComplete = (dispatch) => (todoId, listId) => {
  dispatch({ type: "TOGGLE_COMPLETE", payload: { todoId, listId } });
};

export const { Context, Provider } = createDataContext(
  todoReducer,
  { addList, deleteList, addTodo, deleteTodo, toggleComplete },
  {
    lists: [
      {
        title: "TEST",
        _id: 1,
        todos: [{ title: "TEST TODO #1", id: 1, complete: false }],
      },
    ],
  }
);
