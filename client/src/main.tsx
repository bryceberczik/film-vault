import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './styles/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.tsx'
import Home from "./pages/home.tsx";
import MovieTv from "./pages/movieTv.tsx";
import Error from "./pages/error.tsx";
import Search from "./pages/search.tsx";
import Books from "./pages/books.tsx";
import Devlogs from "./pages/devlogs.tsx";
import Signup from "./pages/signUp.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/movie&tv",
        element: <MovieTv />,
      },
      {
        path: '/search',
        element: <Search />
      },
      {
        path: '/books',
        element: <Books />
      },
      {
        path: '/devlogs',
        element: <Devlogs />
      }
      ,
      {
        path: '/signup',
        element: <Signup />
      }
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
} else {
  console.error("Root element not found");
}