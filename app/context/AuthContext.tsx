'use client';

import { createContext, useContext, useState } from "react";
import type { User } from "../types";

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    isLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const login = () => {
        setUser({ id: '1', name: 'Test User', email: 'test@example.com' });
    };
    // const login = (userData: User) => {
    //     setUser(userData)
    //     // setIsLoggedIn(true);
    // }
    const logout = () => {
        setUser(null);
    }

    const isLoggedIn = !!user;

    const value = {
        user, 
        login,
        logout,
        isLoggedIn
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};