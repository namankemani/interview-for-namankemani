import React, { useState } from 'react';
import { subMonths, subYears } from 'date-fns';

const DateRangeFilter = ({ onApply }) => {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState('Filter by Date');

  const handleFilter = (rangeType, displayLabel) => {
    const endDate = new Date();
    let startDate = null;

    switch (rangeType) {
      case '6months':
        startDate = subMonths(endDate, 6);
        break;
      case '1year':
        startDate = subYears(endDate, 1);
        break;
      case '3years':
        startDate = subYears(endDate, 3);
        break;
      default:
        return;
    }

    setLabel(displayLabel); // Set label to button name
    setOpen(false);
    onApply(startDate, endDate);
  };

  const handleClear = () => {
    setLabel('Filter by Date');
    setOpen(false);
    onApply(null, null);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center px-4 py-2  bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        📅 {label}
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-56 bg-white border rounded shadow-md p-4">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleFilter('6months', 'Past 6 Months')}
              className=" hover:bg-gray-200 text-sm px-3 py-1 rounded text-left"
            >
              Past 6 Months
            </button>
            <button
              onClick={() => handleFilter('1year', 'Past 1 Year')}
              className=" hover:bg-gray-200 text-sm px-3 py-1 rounded text-left"
            >
              Past 1 Year
            </button>
            <button
              onClick={() => handleFilter('3years', 'Past 3 Years')}
              className="hover:bg-gray-200 text-sm px-3 py-1 rounded text-left"
            >
              Past 3 Years
            </button>
            <button
              onClick={handleClear}
              className="text-sm text-red-600 mt-2 hover:underline"
            >
              Clear Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeFilter;
