import { createContext, useEffect, useState } from "react"
import { getProfile } from "../apis";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    // use effect

    useEffect(() => {
        if (auth.accessToken) {
            localStorage.setItem("accessToken", auth.accessToken);
        }
    }, [auth]);

    useEffect(() => {
        async function getProfileUser() {
            const accessToken = localStorage.getItem("accessToken");
            if (accessToken) {
                try {
                    const response = await getProfile();
                    const { user } = response.data;
                    const email = user.email
                    setAuth({ user: email, accessToken: accessToken });
                } catch (error) {
                    console.log(error)
                    localStorage.removeItem("accessToken");
                }
            }
        }
        getProfileUser()
    }, []);
    
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;