import {useDispatch, useSelector} from 'react-redux';
import {fetchEmployees} from '../redux/actions.ts';
import React, {useEffect, useState} from "react";
import {Employee} from "../types";
import {RootState} from "../redux/store.ts";
import {AppDispatch} from "../redux/store.ts";
import NoResults from "../components/NoResults.tsx";
import Pagination from "../components/Pagination.tsx";
import useEmployeeForm from "../hooks/useEmployeeForm.tsx";

const Home: React.FC = () => {
  const employees = useSelector((state: RootState) => state.employees?.employees);
  const loading = useSelector((state: RootState) => state.employees?.status === 'loading');
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => typeof state.employees?.error === 'string' ? state.employees?.error : undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useSelector((state: RootState) => state.employees?.totalPages || 1);
  const {
    // selectedEmployeeId,
    setSelectedEmployeeId,
    // onSubmit
  } = useEmployeeForm();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onSelect = (id) => {
    setSelectedEmployeeId(id);
    router.push('/employees')
  }

  useEffect(() => {
    dispatch(fetchEmployees({
      page: currentPage,
      limit: 10
    }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    dispatch(fetchEmployees({page: 1, limit: 10}));
  }, [dispatch]);

  return (
    <div
      className='flex flex-col items-center justify-center'>
      <h2 className="text-2xl font-bold my-6">Employees
        List</h2>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {employees && employees.length === 0 && (
        <NoResults/>
      )}
      <ul>
        {Array.isArray(employees) && employees.map((employee: Employee) => (
          <li
            key={employee._id}
            onClick={() => onSelect(employee._id)}
            style={{cursor: 'pointer'}}
          >{employee.name}</li>
        ))}
      </ul>
      {!!employees.length && <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
      />}
    </div>
  );
}

export default Home;