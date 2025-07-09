import React from 'react';
import { Dialog } from '@headlessui/react';

const LaunchModal = ({ launch, onClose }) => {
  if (!launch) return null;

  const {
    name,
    details,
    links,
    success,
    flight_number,
    rocket,
    date_utc,
    payloads,
    launchpad,
  } = launch;

  const statusLabel = success === true ? 'Success' : success === false ? 'Failed' : 'Upcoming';
  const statusColor =
    success === true ? 'bg-green-100 text-green-800' :
    success === false ? 'bg-red-100 text-red-800' :
    'bg-yellow-100 text-yellow-800';

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50 max-h-screen">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>

          {/* Header */}
          <div className="flex items-center space-x-4">
            {links?.patch?.small && (
              <img src={links.patch.small} alt={name} className="w-14 h-14 rounded shadow" />
            )}
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{name}</h2>
              <div className="text-sm text-gray-600">{rocket?.name || 'Falcon 9'}</div>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded ${statusColor}`}>
              {statusLabel}
            </span>
          </div>

          {/* Description */}
          <p className="mt-4 text-sm text-gray-700">
            {details || 'No description available.'}{' '}
            {links?.wikipedia && (
              <a
                href={links.wikipedia}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline"
              >
                Wikipedia
              </a>
            )}
          </p>

          {/* Metadata */}
          <div className="mt-5">
            <dl className="grid gap-x-4 gap-y-1 text-sm text-gray-800">
              <div><dt className="font-medium">Flight Number</dt><dd>{flight_number}</dd></div>
              <div><dt className="font-medium">Mission Name</dt><dd>{name}</dd></div>
              <div><dt className="font-medium">Rocket Type</dt><dd>{rocket?.type || 'N/A'}</dd></div>
              <div><dt className="font-medium">Rocket Name</dt><dd>{rocket?.name || 'N/A'}</dd></div>
              <div><dt className="font-medium">Manufacturer</dt><dd>SpaceX</dd></div>
              <div><dt className="font-medium">Nationality</dt><dd>SpaceX</dd></div>
              <div><dt className="font-medium">Launch Date</dt><dd>{new Date(date_utc).toUTCString()}</dd></div>
              <div><dt className="font-medium">Payload Type</dt><dd>{payloads?.[0]?.type || 'N/A'}</dd></div>
              <div><dt className="font-medium">Orbit</dt><dd>{payloads?.[0]?.orbit || 'N/A'}</dd></div>
              <div><dt className="font-medium">Launch Site</dt><dd>{launchpad?.name || 'N/A'}</dd></div>
            </dl>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default LaunchModal;
