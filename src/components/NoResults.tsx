import React from 'react';
import {useNavigate} from 'react-router-dom';
import CustomButton from "./CustomButton.tsx";

// import {useTheme} from "@mui/material/styles";

interface NoResultsProps {
  title?: string;
  message?: string;
  withButton?: boolean;
}

const NoResults: React.FC<NoResultsProps> = ({
                                               withButton = false,
                                               title = 'No Employees Found!',
                                               message = 'Please add an employee or check back later.'
                                             }) => {
  // const theme = useTheme();
  const navigate = useNavigate();

  const handleRouteChange = () => {
    navigate('/employees');
  };

  return (
    <div
      className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4 flex flex-col">
      <strong>{title}</strong>
      <p className='mb-4'>{message}</p>
      {withButton &&
          <CustomButton
              onClick={handleRouteChange}
              label="Go to Employees"
              className="bg-yellow-100 border-yellow-100 text-yellow-700 hover:bg-yellow-200 hover:text-yellow-700"
            // sx={{
            //   backgroundColor: theme.palette.yellow[100],
            //   borderColor: theme.palette.yellow[100],
            //   color: theme.palette.yellow[700],
            //   '&:hover': {
            //     backgroundColor: theme.palette.yellow[100],
            //   }
            // }}
          />
      }
    </div>
  );
};

export default NoResults;