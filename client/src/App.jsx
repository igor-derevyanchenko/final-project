import GlobalStyle from "./GlobalStyle";
import { Route, Routes } from "react-router-dom";
import {
  HeaderSideBarLayout,
  HeaderLayout,
  SideBarLayout,
  NoLayout,
} from "./Layouts";
import Profile from "./Profile";
import AnimeList from "./AnimeList";
import AnimeDetails from "./AnimeDetails";
import SearchPage from "./SearchPage";

export default () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HeaderLayout />}>
          <Route index element={<AnimeList />} />
        </Route>
        <Route path="/profile" element={<HeaderLayout />}>
          <Route index element={<Profile />} />
        </Route>
        <Route path="/anime/:animeId" element={<HeaderLayout />}>
          <Route index element={<AnimeDetails />} />
        </Route>
        <Route path="/search/:query" element={<HeaderLayout />}>
          <Route index element={<SearchPage />} />
        </Route>
      </Routes>
    </>
  );
};
