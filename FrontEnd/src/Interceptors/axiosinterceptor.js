import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"http://localhost:3033"
});

axiosInstance.interceptors.request.use(
    (request)=>{
        //handle request:

        return request;
    },(err)=>{
        console.log("409 - request axios error");
        return Promise.reject(err);
    }
);

axiosInstance.interceptors.response.use(
    (response)=>{
        return response
    },(err)=>{
        console.log("500-axios response error");
        return Promise.reject(err);
    }
)

export default axiosInstance;
