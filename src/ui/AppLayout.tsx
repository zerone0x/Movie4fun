import { Outlet } from "react-router-dom";
import Header from "./Header";


function AppLayout() {
  return (
    <>
    <Header></Header>
    <>hi</>
    <Outlet />
    </>
  );
}

export default AppLayout;