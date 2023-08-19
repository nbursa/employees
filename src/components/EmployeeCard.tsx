import React from 'react';
import {Employee} from '../types';

interface EmployeeCardProps {
  employee: Employee;
  onSelect?: (id: string) => void;
  order?: number;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
                                                     employee,
                                                     onSelect,
                                                     order
                                                   }) => {
  return (
    <div
      className={`border p-4 mb-4 rounded-lg shadow-md transition-shadow duration-300 ${onSelect && 'cursor-pointer hover:shadow-lg'} w-full`}
      onClick={onSelect ? () => onSelect(employee._id) : null}
    >
      <h3
        className="text-xl font-bold mb-2">{order && `${order}. - `}{employee.name}</h3>
      <p
        className="text-gray-600">Email: {employee.email}</p>
      <p
        className="text-gray-600">DOB: {employee.dateOfBirth}</p>
      <p
        className="text-gray-600">Phone: {employee.phoneNumber}</p>
      <p className="text-gray-600">Employment
        Date: {employee.dateOfEmployment}</p>
      <p
        className="text-gray-600">Address: {employee.homeAddress.addressLine1}</p>
      <p
        className="text-gray-600">Status: {employee.isDeleted ? 'Deleted' : 'Active'}</p>
    </div>
  );
}

export default EmployeeCard;