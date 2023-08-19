import React from 'react';
import {Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useTheme} from "@mui/material/styles";

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
  const theme = useTheme();
  const navigate = useNavigate();

  const handleRouteChange = () => {
    navigate('/employees');
  };

  return (
    <div
      className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4 flex flex-col">
      <strong>{title}</strong>
      <p className='mb-4'>{message}</p>
      {withButton && <Button
          variant="contained"
          onClick={handleRouteChange}
          sx={{
            backgroundColor: theme => theme.palette.yellow.main,
            borderColor: theme => theme.palette.yellowmain,
            color: theme => theme.palette.yellow[700],
            '&:hover': {
              backgroundColor: theme => theme.palette.yellow[100],
            },
            borderRadius: '0.375rem',
          }}
      >
          Go to Employees
      </Button>}
    </div>
  );
};

export default NoResults;