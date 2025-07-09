import React from 'react';

const EmptyState = () => {
  return (
    <div className="text-center py-20 text-gray-500">
      <svg
        className="mx-auto h-16 w-16 text-gray-300"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 17v-2a4 4 0 014-4h6"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 13h.01M15 13h.01M19 13h.01M4 6h16M4 10h16M10 21h4"
        />
      </svg>
      <h2 className="mt-4 text-lg font-medium">No Launches Found</h2>
      <p className="text-sm mt-2">
        Try adjusting the filters or date range to see more results.
      </p>
    </div>
  );
};

export default EmptyState;
