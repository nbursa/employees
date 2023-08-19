/// <reference types="vite/client" />
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    yellow?: PaletteColor;
  }

  interface PaletteOptions {
    yellow?: PaletteColorOptions;
  }
}