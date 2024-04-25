import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
import RatePopup from "../components/RatePopup";

const Main = styled.main`
background-color: white;
color: white;
display: flex;
flex-direction: column;
flex: 1;
min-height: 100vh;


`

const Content = styled.div`
display: flex;
  flex-direction: column;
  // max-width: 1300px;
  // margin: 0 auto;
  // align-items: stretch;
  flex:1;
  // height: 100%;

  width: 100%;

`


function AppLayout() {
  return (
    <Main>
    <Header></Header>
    <Content>
    <Outlet />
    </Content>
            { <RatePopup />}
    
    <Footer></Footer>
    </Main>
  );
}

export default AppLayout;