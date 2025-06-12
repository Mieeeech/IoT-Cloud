import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Box, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme";
import Analyst from "./components/Analyst";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MuiDrawer from "./components/MuiDrwer";
import { homeContainer } from "./style";
//import DataTable from "./components/DataTable";
import DataTable from "./components/gridTable";

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: "100%vw",
            minHeight: "100vh",
            backgroundColor: theme.palette.background.default,
          }}
        >
          <MuiDrawer toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
          <Routes>
            <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
            <Route
              path="/Analyst"
              element={<Analyst isDarkMode={isDarkMode} />}
            />
            <Route
              path="/DataTable"
              element={<DataTable isDarkMode={isDarkMode} />}
            />
          </Routes>
        </Box>
      </ThemeProvider>
    </Router>
  );
};

export default App;
