import React, { useCallback, useEffect, useState } from "react";
import axiosBaseUrl from "../../../axios/axiosConfig";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { FaSearch, FaEdit, FaPlus,FaTrash,FaEraser,FaPowerOff } from "react-icons/fa";
import { logout } from "../../../Reduxtoolkit/adminReducer";


const AdminDashboard = () => {

  const [searchQuery, setSearchQuery] = useState("");
  let [users, setUsers] = useState([]);
  let [isDelete, setDelete] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(()=>{
    axiosBaseUrl.get("/admin/dashboard")
    .then((res)=>{
        let result = res.data;

        if(Object.prototype.hasOwnProperty.call(result,"error")){
            toast(result.error.message);
            return;
        }

        if(result.users.length <= 0 ){
            toast(result.message);
            return;
        }

        //set the users data
        setUsers(result.users);
        return;

    }).catch((err)=>{
        console.log("error at the dashboard page");
        console.error({"error":err.message});
        return;
    });

  },[]);


  //SEARCH A USER
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };


  const filteredUsers = users.filter((user) =>{
    let regExpression = new RegExp(searchQuery,"i")
    
    return regExpression.test(user.name);
  });


  //Delete All:
  const handleDeleteAll=  useCallback( async()=>{
    
    await axiosBaseUrl.get("/admin/clearDB")
      .then((res)=>{

        let result = res.data;

        if(result.mission == "failed"){
          toast(result.message); //message : "users not deleted"
          return;
        }

        toast(result.message) //message : "user deleted successfully";
        
        setUsers([]);
        
        return;

      }).catch((err)=>{
        console.log(err.message);
        toast(err.message)
        return;

      });

    return;

  },[isDelete]);

  const handleEdit=(user)=>{
    const userData = { "user": user }; 
    
    navigate("/edit", { state: userData });
    return;
  }
  
  const handleRemove=(email)=>{
    if(!email){
        toast("email is null");
      return;
    }
    
    axiosBaseUrl.delete(`/admin/removeUser/${email}`).then((res)=>{
      let result = res.data;
      
   if (Object.prototype.hasOwnProperty.call(res, "error")) {
  toast(res.error);
  return;
}


      console.log(result.message);
      
      toast(result.message);

      setTimeout(()=>{
        window.location.reload();
        
      },500);

      return;
      
    })
    .catch((err)=>{
        toast(err.message);
      });
    return;
  }

  const handleLogout=()=>{
    dispatch(logout())
  
    window.location.reload();
    return;
  }


  // const userImage=(image)=>{
  //   let src = String.fromCharCode(...image?.data?.data);
  //   return `http://localhost:3033/uploads/${src}`;
  // }

  const userImage = (image) => {
  const byteArray = image?.data?.data;

  if (!Array.isArray(byteArray)) {
    return '/default-user.png'; // fallback image path
  }

  const src = String.fromCharCode(...byteArray);
  return `http://localhost:3033/uploads/${src}`;
};


  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 via-sky-200 to-blue-300 p-6 flex justify-center items-start">
    <div className="bg-white shadow-lg rounded-3xl p-10 w-full max-w-6xl relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute -top-10 -right-10 w-36 h-36 bg-sky-400 opacity-10 rounded-full z-0" />
      <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-blue-400 opacity-10 rounded-full z-0" />

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-sky-700">Admin Dashboard</h1>
          <button onClick={handleLogout}>
            <FaPowerOff className="text-sky-600 text-2xl hover:text-sky-800" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center bg-gray-100 px-4 py-3 rounded-full mb-6 shadow-inner">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={handleSearch}
            className="bg-transparent ml-2 w-full outline-none placeholder-gray-500"
          />
        </div>

        <div className="flex justify-between items-center mb-6">
          {/* Add User Button */}
          <button
            onClick={() => navigate("/addUser")}
            className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-full flex items-center transition transform hover:scale-[1.02]"
          >
            <FaPlus className="mr-2" /> Add User
          </button>

          {/* Delete All Button */}
          <button
            onClick={() => {
              handleDeleteAll();
              setDelete(!isDelete);
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full flex items-center transition transform hover:scale-[1.02]"
          >
            <FaTrash className="mr-2" /> Delete All
          </button>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto rounded-2xl shadow-md">
          {users.length > 0 ? (
            <table className="w-full table-auto bg-white text-left text-gray-700">
             <thead className="bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-t-2xl">

                <tr>
                  <th className="px-6 py-3">Profile</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.email}
                    className="border-b hover:bg-sky-50 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden shadow-md">
                        <img
                          src={userImage(user.image)}
                          alt="User"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => handleEdit(user)}
                           className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-full flex items-center transition"
>
                          <FaEdit className="mr-2" /> Edit
                        </button>
                        <button
                          onClick={() => handleRemove(user.email)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full flex items-center transition"
>
                          <FaEraser className="mr-2" /> Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center text-sky-800 text-xl py-10">
              No users found.
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

};

export default AdminDashboard;
