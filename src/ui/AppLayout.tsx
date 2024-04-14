import { Outlet } from "react-router-dom";
import Header from "./Header";


function AppLayout() {
  return (
    <>
    <Header></Header>
    <Outlet />
    </>
  );
}

export default AppLayout;