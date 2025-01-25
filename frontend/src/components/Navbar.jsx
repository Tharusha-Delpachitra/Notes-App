import React from 'react'
import { GiNotebook } from "react-icons/gi";

const Navbar = () => {
  return (
    <header className='border px-10 md:px-20 lg:px-40 py-5 shadow-lg'>
        <div className='flex flex-row gap-2 text-2xl font-bold'>
            <GiNotebook size="30px" color='#2563eb'/>
            Notes
        </div>
    </header>
  )
}

export default Navbar