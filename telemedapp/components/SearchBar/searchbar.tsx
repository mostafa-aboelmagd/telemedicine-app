import React from 'react'
import { IoIosSearch } from "react-icons/io";

const SearchBar = () => {
    return (
        <div className='col-span-2 flex items-center border border-[#cccccc] rounded-xl'>
            <IoIosSearch className='w-4 h-4 m-2' />
            <input className='w-full me-1 px-3 py-1.5 grow border border-0 focus:outline-0' placeholder='Doctor name or title' type="text" />
        </div>
    )
}

export default SearchBar