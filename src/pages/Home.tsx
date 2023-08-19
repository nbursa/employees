import {useDispatch, useSelector} from 'react-redux';
import {fetchEmployees} from '../redux/actions.ts';
import React, {useEffect, useState} from "react";
import {Employee} from "../types";
import {RootState} from "../redux/store.ts";
import {AppDispatch} from "../redux/store.ts";
import NoResults from "../components/NoResults.tsx";
import Pagination from "../components/Pagination.tsx";
import useEmployeeForm from "../hooks/useEmployeeForm.tsx";
import {useNavigate} from 'react-router-dom';
import EmployeeCard from "../components/EmployeeCard.tsx";

const Home: React.FC = () => {
  const employees = useSelector((state: RootState) => state.employees?.employees);
  const loading = useSelector((state: RootState) => state.employees?.status === 'loading');
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => typeof state.employees?.error === 'string' ? state.employees?.error : undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useSelector((state: RootState) => state.employees?.totalPages || 1);
  const navigate = useNavigate();
  const {
    setSelectedEmployeeId,
  } = useEmployeeForm();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onSelect = (id) => {
    setSelectedEmployeeId(id);
    navigate('/employees')
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
      className='container mx-auto p-4 pb-12 flex flex-col items-center justify-center'>
      <h2 className="text-2xl font-bold my-6">Employees
        List</h2>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className='w-full max-w-2xl'>
        {Array.isArray(employees) && employees.map((employee: Employee, index: number) => (
          <EmployeeCard
            order={index + 1}
            key={employee._id}
            employee={employee}
            onSelect={onSelect}
          />
        ))}
      </div>
      {!!employees.length && <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
      />}
      {employees && employees.length === 0 && (
        <NoResults withButton/>
      )}
    </div>
  );
}

export default Home;