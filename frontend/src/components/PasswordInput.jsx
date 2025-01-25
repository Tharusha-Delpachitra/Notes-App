import React, { useState } from 'react'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";


const PasswordInput = ({ value, onChange, placeholder }) => {
    const [ isShowPassword, setIsShowPssword ] = useState(false);

    const toggleShowPassword = () => {
        setIsShowPssword(!isShowPassword);
    };

  return (
    <div className='w-full flex items-center justify-center border px-4'>
        <input 
            value={value}
            onChange={onChange}
            type={isShowPassword ? "text" : "password"} 
            placeholder={placeholder || "Password"}
            className='w-full bg-transparent outline-none p-1 rounded'
        />
        {isShowPassword ? (
        <IoMdEyeOff
          size="22"
          className="text-gray-500 cursor-pointer"
          onClick={toggleShowPassword}
        />
        ) : (
        <IoMdEye
          size="22"
          className="text-gray-500 cursor-pointer"
          onClick={toggleShowPassword}
        />
        )}
    </div>
  )
}

export default PasswordInput