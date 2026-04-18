import { AuthContext } from './AuthContext'
import { clearAccessToken, setAccessToken } from '../api/interceptor';
import { useEffect, useState } from 'react';
import api from '../api/api.axios';

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const initAuth = async() =>{
            try{
                const res = await api.post("/api/auth/refresh-token");
                setAccessToken(res.data.accessToken)
                
                const userRes = await api.get('/api/auth/me');
                setUser(userRes.data.user);
            }catch(err){
                clearAccessToken();
                setUser(null);
            } finally{
                setLoading(false)
            }
        }
        initAuth()
    },[])

    const login = (data) => {
        setAccessToken(data.accessToken)
        setUser(data.user)
    }

        const logout = (data) => {
        clearAccessToken()
        setUser(null)
    }

  return (
    <AuthContext.Provider value={{user, login, logout, loading }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
