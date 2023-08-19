import React from 'react';
import {Typography} from '@mui/material';
import CustomButton from "./CustomButton.tsx";
import {useTheme} from "@mui/material/styles";

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
      <CustomButton
        label="Prev"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        sx={{
          mr: 2,
          backgroundColor: theme.palette.grey[200],
          padding: '.75rem 1.25rem',
          color: theme.palette.grey[700],
          '&:hover': {
            backgroundColor: theme.palette.grey[300],
          },
        }}
      />
      <Typography>
        Page {currentPage} of {totalPages}
      </Typography>
      <CustomButton
        label="Next"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        sx={{
          ml: 2,
          backgroundColor: theme.palette.grey[200],
          padding: '.75rem 1.25rem',
          color: theme.palette.grey[700],
          '&:hover': {
            backgroundColor: theme.palette.grey[300],
          },
        }}
      />
    </div>
  );
};

export default Pagination;