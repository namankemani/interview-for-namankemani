import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import format from 'date-fns/format';

const ITEMS_PER_PAGE = 10;

const LaunchTable = ({ launches, onRowClick }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentPageData = launches.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(launches.length / ITEMS_PER_PAGE);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <table className="w-full table-auto border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className='p-3 pl-0'>No:</th>
            <th>Launched (UTC)</th>
            <th>Location</th>
            <th>Mission</th>
            <th>Orbit</th>
            <th>Launch Status</th>
            <th>Rocket</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((launch, index) => (
            <tr
              key={launch.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => onRowClick(launch)}
            >
              <td className='p-3'>{offset + index + 1}</td>
              <td>{format(new Date(launch.date_utc), "dd MMMM yyyy 'at' HH:mm")}</td>
              <td>{launch.launchpad}</td>
              <td>{launch.name}</td>
              <td>{launch.orbit || 'LEO'}</td>
              <td>
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    launch.upcoming
                      ? 'bg-yellow-200 text-yellow-800'
                      : launch.success
                      ? 'bg-green-200 text-green-800'
                      : 'bg-red-200 text-red-800'
                  }`}
                >
                  {launch.upcoming
                    ? 'Upcoming'
                    : launch.success
                    ? 'Success'
                    : 'Failed'}
                </span>
              </td>
              <td>{launch.rocket_name || 'Falcon 9'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName="flex justify-center items-center gap-2 mt-4"
        pageClassName="px-2 py-1 border rounded"
        activeClassName="bg-blue-500 text-white"
        previousClassName="px-2 py-1 border rounded"
        nextClassName="px-2 py-1 border rounded"
        breakClassName="px-2 py-1"
      />
    </div>
  );
};

export default LaunchTable;
