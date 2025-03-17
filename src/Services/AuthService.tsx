import axiosInstance from "../Interceptor/AxiosInterceptor";
import { removeUser } from "../Slices/UserSlice";

export const loginUser = async (user:any) => {
    return axiosInstance.post(`/auth/login`, user)
    .then((res:any)=>{
        return res.data
    })
    .catch((err:any)=>{
        throw err
    })
}

export const navigateToLogin = (navigate: any) => {
    localStorage.removeItem("token")
    // localStorage.removeItem("user")
    removeUser()
    navigate("/login")
}


