// userContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextProps {
    user: string | null;
    setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
