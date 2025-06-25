import React,{useState} from 'react'
import Form from './resuableComp/Form'
import { useLocation } from 'react-router-dom'

const Edit = () => {
    const location =  useLocation();
    const userData = location.state;


  return (
    <div>
        <Form editData={userData.user} lastArg="edit" heading="Edit User" buttonText="Edit +" />
       
    </div>
  )
}

export default Edit