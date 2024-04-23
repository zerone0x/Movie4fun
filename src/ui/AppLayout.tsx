import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";

const Main = styled.main`
background-color: black;
color: white;

`


function AppLayout() {
  return (
    <Main>
    <Header></Header>
    <Outlet />
    <Footer></Footer>
    </Main>
  );
}

export default AppLayout;