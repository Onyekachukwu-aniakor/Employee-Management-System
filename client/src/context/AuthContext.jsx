import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import api from "../api/axios";


const AuthContext = createContext(null);

export function AuthProvider({children}){
    // create states here
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [loading, setLoading] = useState(true);


    const refreshSession = async() => {
        const storedToken = localStorage.getItem('token')
        if(!storedToken){
            setUser(null)
            setToken(null)
            setLoading(false)
            return;
        }
        try {
            // if storedToken is available
            const { data } = await api.get('/auth/session')
            setUser(data.user)
        } catch (error) {
            // token is invalid clear it
            localStorage.removeItem('token')
            setUser(null)
            setToken(null)
        }finally {
            setLoading(false)
        }
        
    }

    useEffect(()=>{
        refreshSession()
    },[]);

    const login = async(email, password, role_type) => {
        const {data} = await api.post('/auth/login', {email, password, role_type})
        localStorage.setItem('token', data.token)
        setToken(data.token);
        setUser(data.user);
        return data.user;
    };

    const logout = async () => {
        localStorage.removeItem('token')
        setToken(null);
        setUser(null);
        
    }
       const value = {user,token, loading, login, logout, refreshSession}

    return <AuthContext.Provider  value={value}>
        {children}
    </AuthContext.Provider>

}

export function useAuth(){
    //ctx === context
    const ctx = useContext(AuthContext)
    if(!ctx) throw new Error('useAuth must be used in the AuthProvider')

        return ctx;
}