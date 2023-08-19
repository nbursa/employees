import React from 'react';
import {Button, Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
                                                 currentPage,
                                                 totalPages,
                                                 onPageChange
                                               }) => {
  const theme = useTheme();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <Button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        sx={{
          mx: 2,
          backgroundColor: `${theme.palette.grey[200]}`,
          '&:hover': {
            backgroundColor: `${theme.palette.grey[300]}`,
          },
        }}
      >
        Previous
      </Button>
      <Typography>
        Page {currentPage} of {totalPages}
      </Typography>
      <Button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        sx={{
          mx: 2,
          backgroundColor: `${theme.palette.grey[200]}`,
          '&:hover': {
            backgroundColor: `${theme.palette.grey[300]}`,
          },
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;