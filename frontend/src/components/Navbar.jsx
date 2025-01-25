import React, { useState } from 'react'
import { GiNotebook } from "react-icons/gi";
import ProfileInfo from './ProfileInfo';
import { useNavigate } from 'react-router-dom';
import Searchbar from './Searchbar';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate;

    const onLogout = () => {
        navigate("/login");
    };

    const handleSearch = () => {

    };

    const onClearSearch = () => {
        setSearchQuery("");
    };

  return (
    <header className='flex flex-row items-center justify-between border px-5 md:px-20 lg:px-40 py-5 shadow-lg'>
        <div className='flex flex-row gap-2 text-2xl font-bold'>
            <GiNotebook size="30px" color='#2563eb'/>
            Notes
        </div>

        <Searchbar 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
        />

        <ProfileInfo onLogout={onLogout}/>
    </header>
  )
}

export default Navbar