import {createTheme} from '@mui/material/styles';

const defaultTheme = createTheme({
  palette: {
    yellow: {
      main: 'rgb(254, 249, 195)',
      100: 'rgb(234, 229, 175)',
      200: '#FFEB3B',
      400: '#FDD835',
      700: '#FBC02D',
    },
  },
});

export default defaultTheme;