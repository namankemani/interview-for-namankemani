import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LaunchTable from '../components/LaunchTable';
import LaunchModal from '../components/LaunchModal';
import Filters from '../components/Filters';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState.jsx';
import DateRangeFilter from '../components/DateRangeFilter';

function LaunchDashboard() {
  const [launches, setLaunches] = useState([]);
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLaunch, setSelectedLaunch] = useState(null);

  const filterByDate = (start, end) => {
    if (!start || !end) {
      setFilteredLaunches(launches);
      return;
    }

    const filtered = launches.filter((launch) => {
      const date = new Date(launch.date_utc);
      return date >= start && date <= end;
    });

    setFilteredLaunches(filtered);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get('https://api.spacexdata.com/v4/launches');
      setLaunches(res.data);
      setFilteredLaunches(res.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const applyFilters = (filterFn) => {
    setFilteredLaunches(launches.filter(filterFn));
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-screen-xl mx-auto">
      {/* Logo Section */}
      <div className="my-4 flex justify-center">
        <img src="/image.png" alt="logo" className="w-60 md:w-72 lg:w-80" />
      </div>

      {/* Filters Section */}
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-6">
        <DateRangeFilter onApply={filterByDate} />
        <Filters onFilter={applyFilters} />
      </div>

      {/* Table or States */}
      {loading ? (
        <LoadingSpinner />
      ) : filteredLaunches.length === 0 ? (
        <EmptyState />
      ) : (
        <LaunchTable launches={filteredLaunches} onRowClick={setSelectedLaunch} />
      )}

      {/* Modal */}
      {selectedLaunch && (
        <LaunchModal launch={selectedLaunch} onClose={() => setSelectedLaunch(null)} />
      )}
    </div>
  );
}

export default LaunchDashboard;
