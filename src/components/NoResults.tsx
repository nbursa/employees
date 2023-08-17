import React from 'react';

interface NoResultsProps {
  title?: string;
  message?: string;
}

const NoResults: React.FC<NoResultsProps> = ({title = 'No Employees Found!', message = 'Please add an employee or check back later.'}) => {
  return (
    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4">
      <strong>{title}</strong>
      <p>{message}</p>
    </div>
  );
};

export default NoResults;