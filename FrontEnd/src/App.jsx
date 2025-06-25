import React from "react";
import {Route,Routes} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import LoginPage from "./Pages/Login";
import Register from "./Pages/Register";
import HomePage from "./Pages/Home";
import UserProfilePage from "./Pages/userProfilepage";

import {Home,Login,AdminSession} from "../Session/Session";

import AdminDashboard from "./Pages/adminPages/dashboard"; 
import AdminPage from "./Pages/adminPages/login"
import Add from "./Pages/adminPages/Add&Edit/Add";
import Edit from "./Pages/adminPages/Add&Edit/Edit";
import NotFound from "./Pages/NotFound";



function App() {
  return <div>
  <ToastContainer theme="light" />

    <Routes>
      <Route path="/register" element={<Login> <Register/> </Login>} />
      <Route path="/login" element={<Login> <LoginPage/> </Login>} />  {/* session */}
      <Route path="/home" element={ <Home> <HomePage/> </Home>} /> {/* session */}
      <Route path="/profile" element={< UserProfilePage />} />

      <Route path="/adminLogin" element={   <AdminPage/> } />
      <Route path="/dashboard" element={<AdminSession> <AdminDashboard/> </AdminSession>} />

      <Route path="/addUser" element={<Add />} />
      <Route path="/edit" element={<Edit />} />
      <Route path='*' element={<NotFound/>}/>
    </Routes>

  </div>;
}
export default App;
