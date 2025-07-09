import React from 'react';
import { Menu } from '@headlessui/react';
import { FunnelIcon } from '@heroicons/react/24/outline';

const filterOptions = [
  { label: 'All Launches', filterFn: () => true },
  { label: 'Upcoming Launches', filterFn: (launch) => launch.upcoming },
  { label: 'Successful Launches', filterFn: (launch) => launch.success },
  { label: 'Failed Launches', filterFn: (launch) => launch.success === false },
];

const Filters = ({ onFilter }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex items-center px-4 py-2  bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
        <FunnelIcon className="w-4 h-4 mr-2" />
        All Launches
      </Menu.Button>

      <Menu.Items className="absolute z-10 right-0 mt-2 w-56 bg-white border rounded shadow-lg focus:outline-none">
        {filterOptions.map(({ label, filterFn }) => (
          <Menu.Item key={label}>
            {({ active }) => (
              <button
                className={`w-full text-left px-4 py-2 text-sm ${
                  active ? 'bg-gray-100' : ''
                }`}
                onClick={() => onFilter(filterFn)}
              >
                {label}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default Filters;
