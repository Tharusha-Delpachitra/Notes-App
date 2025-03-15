import React, { useState } from 'react';
import { GiNotebook } from "react-icons/gi";
import ProfileInfo from './ProfileInfo';
import { useNavigate, useLocation } from 'react-router-dom';
import Searchbar from './Searchbar';

const Navbar = ({ handleSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const onLogout = () => {
        navigate("/login");
    };

    const onClearSearch = () => {
        setSearchQuery("");
        handleSearch("");  // Call handleSearch with an empty string to reset the filter
    };

    const hideSearchAndProfile = location.pathname === "/login" || location.pathname === "/signup";

    return (
        <header className='flex flex-row items-center justify-between border px-5 md:px-20 lg:px-40 py-5 shadow-lg'>
            <div className='flex flex-row gap-2 text-2xl font-bold'>
                <GiNotebook size="30px" color='#2563eb'/>
                Notes
            </div>

            {!hideSearchAndProfile && (
                <>
                    <Searchbar
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        handleSearch={handleSearch}  // Pass handleSearch here
                        onClearSearch={onClearSearch}
                    />
                    <ProfileInfo onLogout={onLogout} />
                </>
            )}
        </header>
    );
};

export default Navbar;
