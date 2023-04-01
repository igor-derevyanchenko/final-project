import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

export const HeaderSideBarLayout = () => {
  return (
    <AppContainer>
      <Header />
      <Sidebar />
      <MainContent>
        <Outlet />
      </MainContent>
    </AppContainer>
  );
};

export const HeaderLayout = () => {
  return (
    <AppContainer>
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
    </AppContainer>
  );
};

export const SideBarLayout = () => {
  return (
    <AppContainer>
      <Sidebar />
      <MainContent>
        <Outlet />
      </MainContent>
    </AppContainer>
  );
};

export const NoLayout = () => {
  return (
    <MainContent>
      <Outlet />
    </MainContent>
  );
};

const AppContainer = styled.div`
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main";
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
  height: 100vh;
`;
