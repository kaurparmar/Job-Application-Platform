import React from 'react'
import { useState } from 'react'; 
import SearchBar from '../ui/SearchBar';
import { HiOutlineBuildingOffice } from  "react-icons/hi2";

function Header() {
    const [searchValue, setSearchValue] = useState('');
    const handleSearch = (query) => {
    setSearchValue(query);
    console.log('Search initiated with query:', query);
    
  }
  return (
    <div>
        <div className="text-center">
            <div className="flex flex-col gap-5 my-10">
                <span className="px-4 mx-auto py-2 rounded-full bg-gray-200 text-red-600 font-medium">
                    <div className="flex flex-row gap-x-2"><span className="py-1"><HiOutlineBuildingOffice /></span>No. 1 Job Hunt Website</div>
                </span>
                <h2 className="text-5xl font-bold">
                    Search Apply & <br/>
                    Get Your <span className="text-[#6A38C2]">Dream Job</span>
                </h2>
                <p>
                    Start your hunt for the best, life-changing career opportunities
                    from here in your selected areas conveniently and get hired quickly.
                </p>
                <div className="w-[50%] flex flex-col justify-center mx-auto">
                    
                    <SearchBar onSearch={handleSearch} />
                </div>
            </div>

        </div>
    </div>
  )
}

export default Header
