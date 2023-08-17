import {useDispatch, useSelector} from 'react-redux';
import {fetchEmployees} from '../redux/actions.ts';
import React, {useEffect} from "react";
import {Employee} from "../types";
import {RootState} from "../redux/store.ts";
import {AppDispatch} from "../redux/store.ts";
import NoResults from "../components/NoResults.tsx";

const Home: React.FC = () => {
  const employees = useSelector((state: RootState) => state.employees?.employees);
  const loading = useSelector((state: RootState) => state.employees?.status === 'loading');
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => typeof state.employees?.error === 'string' ? state.employees?.error : undefined);


  useEffect(() => {
    dispatch(fetchEmployees({page: 1, limit: 10}));
  }, [dispatch]);

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className="text-2xl font-bold mb-4">Employees List</h2>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {employees && employees.length === 0 && (
        <NoResults/>
      )}
      <ul>
        {Array.isArray(employees) && employees.map((employee: Employee) => (
          <li key={employee._id}>{employee.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;