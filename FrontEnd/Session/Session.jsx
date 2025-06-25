import { Navigate } from "react-router-dom";

export const Home = ({ children }) => {
  const token = window.localStorage.getItem("authToken");

  if (!token) {
    console.log("admin token is not-found in the localstorage");
  }
  return token ? children : <Navigate to="/login" />;
};


export const Login = ({ children }) => {
  const token = window.localStorage.getItem("authToken");

  if (!token) {
    console.log("admin token is not-found in the localstorage");
  }
  return token ? <Navigate to="/home" /> : children;
};


export const AdminSession =({children})=>{
  const token = JSON.parse(window.localStorage.getItem("adminData"));

  if(!token){
    console.log("admin token is not-found in the localstorage");
  }
  return token ? children : <Navigate to="/adminLogin"/>;
};


export const AdminLoginSession =({children})=>{
  const token = JSON.parse(window.localStorage.getItem("adminData"));

  if(!token){
    console.log("admin token is not-found in the localstorage");
  }
  return token ? <Navigate to="/dashboard"/> : children  ;
};