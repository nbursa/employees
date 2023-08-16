import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from '../redux/actions.ts';
import {useEffect} from "react";
import {Employee} from "../types";
import {RootState} from "../redux/store.ts";
import { AppDispatch } from "../redux/store.ts";

const Home: React.FC = () => {
  const employees = useSelector((state: RootState) => state.employees?.employees);
  const loading = useSelector((state: RootState) => state.employees?.status === 'loading');
  const error = useSelector((state: RootState) => state.employees?.error);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchEmployees({page: 1, limit: 10}));
  }, [dispatch]);

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-3xl'>Home Page</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {Array.isArray(employees) && employees.map((employee: Employee) => (
          <li key={employee._id}>{employee.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;