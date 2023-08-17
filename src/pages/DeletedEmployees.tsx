import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../redux/store.ts";
import NoResults from "../components/NoResults.tsx";

const DeletedEmployees: React.FC = () => {
  const deletedEmployees = useSelector((state: RootState) =>
    state.employees.employees.filter(employee => employee.isDeleted)
  );

  return (
    <div className='flex flex-col justify-center items-center'>
      <h3 className="text-xl font-bold mb-2">Deleted Employees</h3>
      <ul>
        {!!deletedEmployees.length && deletedEmployees.map(employee => (
          <li key={employee._id}>
            {employee._id} - {employee.name}
          </li>
        ))}
        {!deletedEmployees.length &&
            <NoResults title='No Deleted Employees' message='Deleted employees will show here.'/>
        }
      </ul>
    </div>
  );
};

export default DeletedEmployees;