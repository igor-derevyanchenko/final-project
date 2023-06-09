import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import Button from "./Button";
import NakedLink from "./NakedLink";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default () => {
  const { isAuthenticated } = useAuth0();
  const [query, setQuery] = useState();
  const navigator = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigator(`/search/${query}`);
  };

  return (
    <Header>
      <NakedLink to="/">
        <Heading1>Igor's Anime Forum</Heading1>
      </NakedLink>
      <SearchForm onSubmit={handleSearch}>
        <SearchBar
          type="text"
          placeholder="Search"
          onChange={(e) => setQuery(e.target.value)}
        />
      </SearchForm>
      <ButtonHolder>
        {isAuthenticated ? (
          <>
            <ProfileButton />
            <LogoutButton />
          </>
        ) : (
          <>
            <LoginButton />
            <SignupButton />
          </>
        )}
      </ButtonHolder>
    </Header>
  );
};

const ProfileButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        navigate("/profile");
      }}
    >
      Watchlist
    </Button>
  );
};

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      onClick={() => {
        loginWithRedirect();
      }}
    >
      Log in
    </Button>
  );
};

const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      onClick={async () => {
        loginWithRedirect({ screen_hint: "signup" });
      }}
    >
      Sign up
    </Button>
  );
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      onClick={() => {
        logout({ logoutParams: { returnTo: window.location.origin } });
      }}
    >
      Log out
    </Button>
  );
};

const Header = styled.header`
  grid-area: header;
  background-color: var(--gundam-blue);
  padding: 0 1rem;
  display: flex;
  justify-content: space-around;
`;

const Heading1 = styled.h1`
  color: var(--gundam-yellow);
`;

const ButtonHolder = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SearchBar = styled.input`
  outline: none;
  font-size: 1.5rem;
  flex-grow: 1;
`;

const SearchForm = styled.form`
  flex-grow: 1;
  margin: 1rem;
  display: flex;
`;
