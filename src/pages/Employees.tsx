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
import {styled} from "@mui/system";
import {useTheme} from "@mui/material/styles";
import useEmployeeForm from "../hooks/useEmployeeForm.tsx";

const Employees: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const {
    selectedEmployeeId,
  } = useEmployeeForm();

  useEffect(() => {
    if (selectedEmployeeId) {
      return setActiveTab(1);
    }
    dispatch(fetchEmployees({}));
  }, [dispatch, selectedEmployeeId]);

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const StyledTab = styled(Tab)({
    '&.Mui-selected': {
      backgroundColor: `${theme.palette.grey[100]}`,
      color: `${theme.palette.grey[900]}`,
      fontWeight: 'bold',
    },
  });

  return (
    <div className="container mx-auto p-4 pb-12">
      <h2
        className="text-2xl font-bold my-6 text-center">Manage
        Employees</h2>

      <Tabs
        value={activeTab}
        onChange={handleChangeTab}
        variant="fullWidth"
        TabIndicatorProps={{
          style: {
            backgroundColor: `${theme.palette.grey[900]}`,
          }
        }}
      >
        <StyledTab label="Create"/>
        <StyledTab label="Update"/>
        <StyledTab label="Delete"/>
      </Tabs>

      <Box hidden={activeTab !== 0}>
        <EmployeeForm formType="create"/>
      </Box>

      <Box hidden={activeTab !== 1}>
        <EmployeeForm formType="update"/>
      </Box>

      <Box hidden={activeTab !== 2}>
        <DeleteForm/>
      </Box>
    </div>
  );

};

export default Employees;