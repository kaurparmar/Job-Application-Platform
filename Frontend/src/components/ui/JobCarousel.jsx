import React, { useRef } from 'react';

const JobCarousel = ({ categories = [] }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      // Small rectangular cards are roughly 220px wide
      const scrollAmount = 250; 
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-[80%] max-w-7xl mx-auto py-10 px-4 text-center ">
      <div className="flex items-center justify-between mb-6  text-center">
        <div className="mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Categories</h2>
          <p className="text-gray-500 text-sm text-center">Explore our extensive job market</p>
        </div>

        {/* Small Rectangular Button Controls */}
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="h-9 w-12 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm active:scale-95"
            aria-label="Previous"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="h-9 w-12 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm active:scale-95"
            aria-label="Next"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category, index) => (
          <div
            key={index}
            className="min-w-[200px] md:min-w-[240px] flex-shrink-0 bg-white border border-gray-100 rounded-xl p-5 shadow-sm snap-start hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex flex-col gap-3">
              {/* <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                <svg className="w-5 h-5 text-blue-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg> 
              </div> */}
              <div>
                <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {category}
                </h3>
                {/* <p className="text-xs text-gray-400 mt-1">120+ Openings</p> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCarousel;
