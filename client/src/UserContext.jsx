import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user } = useAuth0();
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    if (user) {
      fetch(`/api/get-user/${user._id}`)
        .then((res) => res.json())
        .then((parsedRes) => {
          setCurrentUser({ ...user, ...parsedRes.data });
        });
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
