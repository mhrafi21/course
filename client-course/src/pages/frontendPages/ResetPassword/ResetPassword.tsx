import React from 'react'
import { useLocation,  } from 'react-router'

const ResetPassword = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token"); 
    console.log(token);
  return (
    <div>ResetPassword</div>
  )
}

export default ResetPassword