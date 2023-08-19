import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Tabs, Tab, Box} from '@mui/material';
import {AppDispatch} from '../redux/store';
import {
  fetchEmployees,
} from '../redux/actions';
import DeleteForm from "../components/form/DeleteForm.tsx";
import EmployeeForm
  from "../components/form/EmployeeForm.tsx";
import {
  EmployeeFormProvider
} from '../contexts/EmployeeFormContext';
import {styled} from "@mui/system";
// import theme from "tailwindcss/defaultTheme";
import {useTheme} from "@mui/material/styles";

const Employees: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchEmployees({}));
  }, [dispatch]);

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const StyledTab = styled(Tab)({
    '&.Mui-selected': {
      backgroundColor: `${theme.palette.grey[100]}`,
      color: `${theme.palette.grey[700]}`,
    },
  });

  return (
    <div className="container mx-auto px-4">
      <h3 className="text-xl font-bold my-2">Manage
        Employees</h3>

      <Tabs
        value={activeTab}
        onChange={handleChangeTab}
        variant="fullWidth"
        TabIndicatorProps={{
          style: {
            backgroundColor: `${theme.palette.grey[500]}`,
          }
        }}
      >
        <StyledTab label="Create"/>
        <StyledTab label="Update"/>
        <StyledTab label="Delete"/>
      </Tabs>

      <EmployeeFormProvider>
        <Box hidden={activeTab !== 0}>
          <EmployeeForm formType="create"/>
        </Box>

        <Box hidden={activeTab !== 1}>
          <EmployeeForm formType="update"/>
        </Box>

        <Box hidden={activeTab !== 2}>
          <DeleteForm/>
        </Box>
      </EmployeeFormProvider>

    </div>
  );


};

export default Employees;