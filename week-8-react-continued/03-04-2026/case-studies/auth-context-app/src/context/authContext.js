import React , {useState, useEffect, createContext, use} from "react";

const AuthContext = createContext();

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        setLoading(true);
        try{
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            if(username === "admin" && password === "password") {
                const userData = { username: "admin" };
                setUser(userData);
                localStorage.setItem("user", JSON.stringify(userData));
            } else {
                throw new Error("Invalid credentials");
            }
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setLoading(false);

        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}