import React, { useReducer } from "react";

export default (reducer, actions, intialState) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, intialState);

    let boundActions = {};
    for (let action in actions) {
      boundActions[action] = actions[action](dispatch);
    }
    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };
  return { Context, Provider };
};
