import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#A5D8DD",
    },
    secondary: {
      main: "#1C4E80",
      contrastText: "#47008F",
    },
    background: {
      default: "#A5D8DD", // Heller Hintergrund
      paper: "#ffffff",
    },
    text: {
      primary: "#000000", // Schwarzer Text
      secondary: "#333333",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1C4E80",
    },
    secondary: {
      main: "#A5D8DD",
      contrastText: "#A5D8DD",
    },
    background: {
      default: "#1C4E80", // Dunkler Hintergrund
      paper: "#121212",
    },
    text: {
      primary: "#ffffff", // Weißer Text
      secondary: "#cccccc",
    },
  },
});
