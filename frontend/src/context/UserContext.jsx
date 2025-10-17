import { createContext, useState } from "react";

// 1️⃣ Create Context
export const UserContext = createContext();

// 2️⃣ Create Provider
export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // stores logged-in user info

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
