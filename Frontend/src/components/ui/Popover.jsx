// popover using tailwindcss
import React, { useEffect, useRef, useState } from 'react';

function Popover({ content, children }) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    function handleDocumentClick(e) {
      if (!containerRef.current) return
      if (!containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    function handleEscape(e) {
      if (e.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', handleDocumentClick)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative inline-block">
      <div onClick={() => setIsOpen((s) => !s)}>
        {children}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
          <div className="p-4">{content}</div>
        </div>
      )}
    </div>
  )
}

export default Popover;
