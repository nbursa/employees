import React from 'react';
import {Typography} from '@mui/material';
import CustomButton from "./CustomButton.tsx";

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
      <CustomButton
        label="Prev"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        sx={(theme) => ({
          mx: 2,
          backgroundColor: theme.palette.grey[200],
          '&:hover': {
            backgroundColor: theme.palette.grey[300],
          }
        })}
      >
        Previous
      </CustomButton>
      <Typography>
        Page {currentPage} of {totalPages}
      </Typography>
      <CustomButton
        label="Next"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        sx={(theme) => ({
          mx: 2,
          backgroundColor: theme.palette.grey[200],
          '&:hover': {
            backgroundColor: theme.palette.grey[300],
          }
        })}
      >
        Next
      </CustomButton>
    </div>
  );
};

export default Pagination;