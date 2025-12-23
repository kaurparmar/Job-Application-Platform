import React, { useState } from 'react';

const BookmarkButton = ({ className = "" }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <button
      onClick={() => setIsBookmarked(!isBookmarked)}
      className={`
        inline-flex items-center justify-center rounded-md text-sm font-medium 
        transition-colors focus-visible:outline-none focus-visible:ring-1 
        focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 
        border border-slate-200 bg-white shadow-sm hover:bg-slate-100 
        hover:text-slate-900 h-9 w-9
        ${className}
      `}
      aria-label="Bookmark this job"
    >
      <svg
        xmlns="www.w3.org"
        viewBox="0 0 24 24"
        fill={isBookmarked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`h-4 w-4 transition-transform active:scale-90 ${
          isBookmarked ? "text-blue-600 fill-blue-600" : "text-slate-500"
        }`}
      >
        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
      </svg>
    </button>
  );
};

export default BookmarkButton;
