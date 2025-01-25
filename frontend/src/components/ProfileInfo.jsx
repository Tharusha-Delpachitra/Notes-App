import React from 'react'
import { IoPersonCircleOutline } from "react-icons/io5";

const ProfileInfo = ({onLogout}) => {
  return (
    <div className='hidden md:flex flex-row gap-2'>
        <IoPersonCircleOutline size={32}/>
        <button 
            className='bg-blue-500 p-1 px-3 rounded-lg text-white hover:bg-blue-700'
            onClick={onLogout}
        >
            Logout
        </button>
    </div>
  )
}

export default ProfileInfo