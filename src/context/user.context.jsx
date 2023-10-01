import { createContext, useState } from 'react';

export const UserContext = createContext({
    userId: 1
});

export const UserContextProvider = ({ children }) => {
    const [userId, setUserId] = useState(UserContext._currentValue.userId);

    return <UserContext.Provider value={{userId, setUserId }}>
        { children }
    </UserContext.Provider>;
};