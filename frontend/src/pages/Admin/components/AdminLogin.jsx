import React, { useState } from 'react'
import DashboardLayout from '../../../components/layout/DashboardLayout'
import LOGO from "../../../assets/logo.png";


import Login from "../../../components/Auth/Login.jsx";
import Signup from "../../../components/Auth/Signup.jsx"


const AdminLogin = () => {

  const [currentPage, setCurrentPage] = useState("login");
  return (
    <>
      <div className='bg-white py-5 border-b border-gray-50'>
        <div className='container mx-auto'>
          <img src={LOGO} alt="LOGO" className='h-[26px]'/>
        </div>
      </div>    

      <div className='min-h-[calc(100vh-67px)] flex items-center justify-center' >
        <div className='bg-white rounded-2xl overflow-hidden shadow-2xl shadow-gray200/60' >
          {currentPage === "login" ? (
            <Login setCurrentPage={setCurrentPage} />
          ):(
            <Signup setCurrentPage={setCurrentPage} />
          )}
        </div>
      </div>
    </>
  )
}

export default AdminLogin