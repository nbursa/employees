import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store.ts";
import NoResults from "../components/NoResults.tsx";
import {getDeletedEmployees} from "../redux/actions.ts";
import {AnyAction} from "redux";
import EmployeeCard from "../components/EmployeeCard.tsx";

const DeletedEmployees: React.FC = () => {
  const deletedEmployees = useSelector((state: RootState) =>
    state.employees.deletedEmployees
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getDeletedEmployees({
      page: 1,
      limit: 10
    }) as unknown as AnyAction);
  }, [dispatch]);

  return (
    <div
      className='container mx-auto flex p-4 pb-12 flex-col justify-center items-center'>
      <h2
        className="text-2xl font-bold my-6 text-center">Deleted
        Employees</h2>
      <div className='w-full max-w-2xl'>
        {!!deletedEmployees.length && deletedEmployees.map((employee, index) => (
          <EmployeeCard
            order={index + 1}
            key={employee._id}
            employee={employee}
          />
        ))}
        {!deletedEmployees.length &&
            <NoResults title='No Deleted Employees'
                       message='Deleted employees will show here.'/>
        }
      </div>
    </div>
  );
};

export default DeletedEmployees;