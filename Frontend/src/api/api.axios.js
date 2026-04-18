import axios from 'axios';
import { data } from 'react-router-dom';

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URI,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})

export const register = async (data) =>{
    const res =  await api.post("/api/auth/register",data);
    return res.data;
}

export const login = async (data) =>{
    const res =  await api.post("/api/auth/login",data);
    return res.data;
}

export const logout = async () =>{
    const res =  await api.post("/api/auth/logout");
    return res.data;
}

export const verifyOtp = async (data) =>{
    const res =  await api.post("/api/auth/verify-email",data);
    return res.data;
}

export const resendOtp = async (data) =>{
    const res =  await api.post("/api/auth/resend-otp",data);
    return res.data;
}

export default api;