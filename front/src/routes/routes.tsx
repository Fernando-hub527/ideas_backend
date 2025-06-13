import {
  createBrowserRouter,
} from "react-router";
import routesConfig from "./routesConfig.ts";
import { Root } from "../components/generics/Root.tsx";
import { IdeasFeed } from "../pages/IdeasFeed.tsx";
import { Login } from "../pages/Login.tsx";
import { Idea } from "../pages/Idea.tsx";
import { Register } from "../pages/Register.tsx";
import { PrivateRoute } from "./auth/PrivateRoute.tsx";

const routes = createBrowserRouter([
  {path: routesConfig.login, Component: Login },
  {path: routesConfig.register, Component: Register},
  { 
    path: routesConfig.home, 
    element: <PrivateRoute><Root></Root></PrivateRoute>,
    children: [
      {index: true, Component: IdeasFeed},
      {path: routesConfig.ideas, Component: Idea}
    ]
  },

]);

export default routes