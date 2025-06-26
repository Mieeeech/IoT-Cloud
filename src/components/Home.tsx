// src/Home.tsx
import React from "react";
import { Box, Typography, Container,  Menu, MenuItem, } from "@mui/material";
import { Button } from "@mui/material";

import { useState } from "react";


interface HomeProps {
  isDarkMode: boolean;
}



const Home: React.FC<HomeProps> = ({ isDarkMode }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
const [selectedDrive, setSelectedDrive] = useState<string>("Antrieb auswählen");


const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = (drive?: string) => {
  if (drive) setSelectedDrive(drive);
  setAnchorEl(null);
};

  const URL =
    "https://hec.de/fileadmin/_processed_/3/c/csm_Smart-Port_AdobeStock_Pugun_Photo-Studio_222573128_k_fc4ccadad6.jpg";

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "200vh",
        p: 2,
        backgroundColor: isDarkMode ? "#1C4E80" : "#A5D8DD",
      }}
    >
      <Box display="flex" sx={{ border: "2px solid grey" }}>
        <Box className="logo" sx={{ flex: 1, minHeight: 600 }}>
          <img
            src={URL}
            alt="Logo"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>

        <Box className="demo-text" sx={{ flex: 1 }}>
          <Typography>System Nachrichten: </Typography>
        </Box>
      </Box>

      <Box
  sx={{
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: 2,
    fontSize: 40,
  }}
>
  <Button
    variant="contained"
    onClick={handleClick}
    sx={{ backgroundColor: "#1976d2",fontSize: 20, px: 4, py: 2 }} // größerer Button
  >
    {selectedDrive}
  </Button>

  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={() => handleClose()}
    PaperProps={{
      sx: {
        backgroundColor: "#1976d2", // Blau (Standard-MUI-Blue)
        color: "white",             // Weißer Text
        minWidth: 200,
      },
    }}
  >
    <MenuItem
      onClick={() => handleClose("Antrieb 1")}
      sx={{ fontSize: 18, py: 2 }}
    >
      Antrieb 1
    </MenuItem>
    <MenuItem
      onClick={() => handleClose("Antrieb 2")}
      sx={{ fontSize: 18, py: 2 }}
    >
      Antrieb 2
    </MenuItem>
    <MenuItem
      onClick={() => handleClose("Antrieb 3")}
      sx={{ fontSize: 18, py: 2 }}
    >
      Antrieb 3
    </MenuItem>
  </Menu>
</Box>

    </Box>
  );
};

export default Home;
