import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { UserContext } from '../context/userContext';

const PrivateRoutes = ({allowedRoles}) => {
  // will implement later 

  const {user, loading} = useContext(UserContext);

  if (loading) {
    return <div>Loading ... </div>; //Show a loading indicator
  }

  if(!allowedRoles.includes(user.role)){
    return <Navigate to="/" replace />;
  }

  return <Outlet/>
};

export default PrivateRoutes