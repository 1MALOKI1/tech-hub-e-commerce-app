import { createContext, useContext,useState, useEffect } from "react";
import api from '../utils/axios'

export const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default function AuthProvider({children}){
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(()=>{
        const token = localStorage.getItem('token')
        const userData = localStorage.getItem('user')
        if(userData && token){
            setUser(JSON.parse(userData))
        }
        setLoading(false)
    },[])

    const login = async (email, password)=>{
        try{
            setLoading(true)
            const response = await api.post('/auth/login', {email, password})
            const {user, access_token} = response.data.data
            localStorage.setItem('token', access_token)
            localStorage.setItem('user', JSON.stringify(user))
            setUser(user)
            return {success : true }
        }
        catch(e){
            return {success: false, error : e.response?.data?.message || e.message }
        }
        finally{
            setLoading(false)
        }
    }

    const logout = ()=>{
        setUser(null)
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

    const value = {
        login,
        user,
        loading,
        logout,
        isAuthenticated: !!user
    }

    return(
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}