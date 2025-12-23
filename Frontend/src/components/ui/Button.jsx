import React from 'react'

function button({content}) {
  return (
    <div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        {content}
      </button>
    </div>
  )
}

export default button
