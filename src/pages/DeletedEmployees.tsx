import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store.ts";
import NoResults from "../components/NoResults.tsx";
import {getDeletedEmployees} from "../redux/actions.ts";
import {AnyAction} from "redux";

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
      className='flex flex-col justify-center items-center'>
      <h3 className="text-xl font-bold my-6">Deleted
        Employees</h3>
      <ul>
        {!!deletedEmployees.length && deletedEmployees.map(employee => (
          <li key={employee._id}>
            {employee._id} - {employee.name}
          </li>
        ))}
        {!deletedEmployees.length &&
            <NoResults title='No Deleted Employees'
                       message='Deleted employees will show here.'/>
        }
      </ul>
    </div>
  );
};

export default DeletedEmployees;