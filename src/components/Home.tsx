// src/Home.tsx
import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { homeContainer } from "../style";
import Button from "./Button";
import GearIcon from "./GearIcon";
import TextField from "./TextField";
import { useState } from "react";
import axios from "axios";
import Icon from "@mdi/react";
import { mdiEngine, mdiEngineOff } from "@mdi/js";
import { FaCog, FaCogs } from "react-icons/fa";
import { motion } from "framer-motion";

interface HomeProps {
  isDarkMode: boolean;
}

const Home: React.FC<HomeProps> = ({ isDarkMode }) => {
  const [isMotorOn, setIsMotorOn] = useState(false);
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
          <Typography>demo text</Typography>
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
        {isMotorOn ? (
          <>
            <Icon path={mdiEngine} size={15} color="green" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              style={{ display: "inline-block" }}
            >
              <GearIcon size={80} color="black" />
            </motion.div>
          </>
        ) : (
          <>
            <Icon path={mdiEngineOff} size={15} color="red" />
            <GearIcon size={80} color="black" />
          </>
        )}
        <Button
          label={isMotorOn ? "Motor AUS" : "Motor AN"}
          onClick={() => setIsMotorOn((prev) => !prev)}
        />
      </Box>
    </Box>
  );
};

export default Home;
