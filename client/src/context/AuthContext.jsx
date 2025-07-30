import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const login = (response) => {
        localStorage.setItem("token", response?.data?.accessToken);
        localStorage.setItem('user', JSON.stringify(response?.data?.user))
        setToken(response?.data?.accessToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
    };

    const isAuthenticated = !!token;

    useEffect(() => {
        if (isAuthenticated) {
            const userDetails = JSON.parse(localStorage.getItem('user'));
            setUser(userDetails);
            setIsAdmin(userDetails?.email === 'ankit@gmail.com');
        } else {
            localStorage.removeItem('user')
        }
    }, []);

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout, user, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);