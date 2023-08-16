import React from 'react';

const NoResults: React.FC = () => {
  return (
    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4">
      <strong>No Employees Found!</strong>
      <p>Please add an employee or check back later.</p>
    </div>
  );
};

export default NoResults