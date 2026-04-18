import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import {Navigate, Outlet} from 'react-router-dom'

const ProtectedRoute = () => {
    const{user, loading} = useContext(AuthContext);
    if(loading){
        return <p>Loading....</p>
    }
    if(!user){
        return <Navigate to={} />
    }

  return <Outlet />
}

export default ProtectedRoute
