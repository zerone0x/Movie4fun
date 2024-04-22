import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


function AppLayout() {
  return (
    <>
    <Header></Header>
    <Outlet />
    <Footer></Footer>
    </>
  );
}

export default AppLayout;