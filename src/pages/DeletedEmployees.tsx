import React from 'react';
import {Employee} from "../types";

interface DeletedEmployeesProps {
  deletedEmployees: Employee[];
}

const DeletedEmployees: React.FC<DeletedEmployeesProps> = ({ deletedEmployees }) => {
  return (
    <div>
      <h2>Deleted Employees</h2>
      <ul>
        {deletedEmployees.map(employee => (
          <li key={employee._id}>
            {employee._id} - {employee.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeletedEmployees;