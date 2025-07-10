// src/Home.tsx
import React from "react";
import { Box, Typography, Container,  Menu, MenuItem, } from "@mui/material";
import { Button } from "@mui/material";

import { useState, useEffect  } from "react";
import { fetchSensorDataWithField } from "../services/influxService";


interface HomeProps {
  isDarkMode: boolean;
}



const Home: React.FC<HomeProps> = ({ isDarkMode }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
const [selectedDrive, setSelectedDrive] = useState<string>("Antrieb auswählen");
const [meldung, setMeldung] = useState<boolean>(false);
const updateMeldung = async () => {
  try {
    const results = await fetchSensorDataWithField(
      "-1m",           
      "Maintenance",   
      "Meldung",       
      "5s"             
    );

    if (results.length > 0) {
      setMeldung(results[0].value === 1); 
    } else {
      setMeldung(false);
    }
  } catch (error) {
    console.error("Fehler beim Laden der Meldung:", error);
    setMeldung(false);
  }
};


useEffect(() => {
  updateMeldung(); 

  const interval = setInterval(() => {
    updateMeldung(); 
  }, 2000);

  return () => clearInterval(interval); // Aufräumen bei Unmount
}, []);





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
  <Typography variant="h6">System Nachrichten:</Typography>

  {meldung && (
    <Typography
      sx={{
        mt: 2,
        p: 2,
        borderRadius: 2,
        backgroundColor: "#f8d7da",
        color: "#721c24",
        fontWeight: "bold",
        border: "1px solid #f5c6cb",
      }}
    >
      ⚠️ Unerwartete Vibrationen erkannt, bitte Wartung am Motor durchführen!
    </Typography>
  )}
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
    sx={{ backgroundColor: "#1976d2",fontSize: 20, px: 4, py: 2 }} 
  >
    {selectedDrive}
  </Button>

  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={() => handleClose()}
    PaperProps={{
      sx: {
        backgroundColor: "#1976d2",
        color: "white",            
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
