// src/contexts/UserContext.js
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [admin, setAdmin] = useState({});

    return <UserContext.Provider value={{ user, setUser, admin, setAdmin }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
