import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const savedUser = localStorage.getItem("skillsphere-user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    setLoading(false); // Finished loading
  }, []);

  function login(email, password) {
    const fakeUser = { id: 1, name: "John Doe", email };
    setUser(fakeUser);
    localStorage.setItem("skillsphere-user", JSON.stringify(fakeUser));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("skillsphere-user");
  }

  return (
    <UserContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
