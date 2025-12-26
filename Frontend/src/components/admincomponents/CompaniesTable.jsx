import React from 'react'

function CompaniesTable() {
  return (
    <div>
      <table className="flex items-center flex-col">
        <h1>Your recent registered Companies</h1>
        <thead>
            <tr className="flex flex-row ">
                <th >Logo</th>

            <th className="p-4">Company Name</th>
            
            <th className="p-4">
                Date
            </th>
            <th className="p-4">Action</th>
            </tr>
        </thead>
      </table>
    </div>
  )
}

export default CompaniesTable
