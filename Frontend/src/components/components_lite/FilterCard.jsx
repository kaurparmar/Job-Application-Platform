import React from 'react'
import { useState } from 'react';

    const filterData=[
        {
            filterType:"Location",
            array:[
                "Delhi",
                "Kolkata",
                "Chennai",
                "Banglore",
                "Pune",
                "Ahemdabad",
                "Surat",
                
            ],
        },
    {
        filterType:"Industry",
        array:['IT',"Finance","Marketing","Healthcare","Education","Manufacturing"],
    },
     {
        filterType:"Experience",
        array:['0-3 years',"3-5 years","5-7 years","7+ years"],
    },
     {
        filterType:"Salary",
        array:['0-50k',"50k-100k","100k-200k","200k+"],
    }
];

function FilterCard() {
     const [selectedFilters, setSelectedFilters] = useState({});

  const handleChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  return (
    <div className="w-full bg-white rounded-md ">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-1 mb-2 "/>
       {filterData.map((filter, index) => (
        <fieldset key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <legend  className="p-2 ml-2" style={{ fontWeight: 'bold' }}>{filter.filterType}</legend>
          {filter.array.map((option) => (
            <div key={option} style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '5px 0' }}>
              <input
                type="radio"
                id={`${filter.filterType}-${option}`}
                name={filter.filterType} // Groups radio buttons by category
                value={option}
                checked={selectedFilters[filter.filterType] === option}
                onChange={() => handleChange(filter.filterType, option)}
              />
              <label htmlFor={`${filter.filterType}-${option}`} style={{ cursor: 'pointer' }}>
                {option}
              </label>
            </div>
          ))}
        </fieldset>
      ))}
    </div>
  )
}

export default FilterCard
