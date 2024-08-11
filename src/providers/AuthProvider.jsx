import { createContext, useState } from "react";

export const AuthContext = createContext({
    auth: null,
    setAuth: () => { }
})

export function AuthProvider({ children }) {

    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('demo_naves_auth')) ?? null)

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}