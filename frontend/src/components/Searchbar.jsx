import React from 'react';
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Searchbar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className='w-60 sm:w-80 flex items-center px-2 bg-slate-100'>
        <input 
            type="text" 
            placeholder='Search Notes'
            className='w-full text-md bg-transparent outline-none p-2 rounded-lg'
            value={value}
            onChange={onChange}  // Just handle the input change here
        />

        {value && (
            <IoMdClose 
                className='text-slate-500 cursor-pointer hover:text-black text-xl mr-3' 
                onClick={onClearSearch}  // Handle clearing search
            />
        )}
        
        <FaSearch 
            className='text-slate-500 cursor-pointer hover:text-black' 
            onClick={() => handleSearch(value)}  // Handle search click
        />
    </div>
  );
}

export default Searchbar;
