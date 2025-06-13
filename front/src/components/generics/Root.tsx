import { Toaster } from "react-hot-toast";
import { NavBar } from "./NavBar";
import {Outlet} from "react-router"


export function Root() {
  return (
    <div className="w-screen h-screen">
      <Toaster />
      <header className="h-0"><NavBar /></header>
      <section className="min-h-screen bg-white  pt-30">
        <Outlet />
      </section>
    </div>
  );
}
