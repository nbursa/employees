import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Tabs, Tab, Box} from '@mui/material';
import {AppDispatch} from '../redux/store';
import {
  fetchEmployees,
} from '../redux/actions';
import DeleteForm from "../components/form/DeleteForm.tsx";
import NewEmployeeForm
  from "../components/form/NewEmployeeForm.tsx";
import {
  EmployeeFormProvider
} from '../contexts/EmployeeFormContext';

const Employees: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    dispatch(fetchEmployees({}));
  }, [dispatch]);

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <div className="container mx-auto px-4">
      <h3 className="text-xl font-bold my-2">Manage
        Employees</h3>

      <Tabs value={activeTab} onChange={handleChangeTab}>
        <Tab label="Create"/>
        <Tab label="Update"/>
        <Tab label="Delete"/>
      </Tabs>

      <EmployeeFormProvider>
        <Box hidden={activeTab !== 0}>
          <NewEmployeeForm formType="create"/>
        </Box>

        <Box hidden={activeTab !== 1}>
          <NewEmployeeForm formType="update"/>
        </Box>

        <Box hidden={activeTab !== 2}>
          <DeleteForm/>
        </Box>
      </EmployeeFormProvider>

    </div>
  );


};

export default Employees;