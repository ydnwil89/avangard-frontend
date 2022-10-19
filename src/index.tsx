import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Me } from './components/Me'
import ErrorPage from "./components/ErrorPage";
import Store from "./store/store";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
  } from "react-router-dom";

interface State {
    store: Store,
}

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/me",
      element: <Me />,
    }
  ]);

export const store = new Store();

export const Context = createContext<State>({
    store,
})

ReactDOM.render(
    <Context.Provider value={{store}}>
        <RouterProvider router={router} />
    </Context.Provider>,
  document.getElementById('root')
);

