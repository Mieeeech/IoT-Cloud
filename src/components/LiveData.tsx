import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import {
  Gauge,
  GaugeContainer,
  GaugeReferenceArc,
  GaugeValueArc,
} from "@mui/x-charts/Gauge";
import React from "react";
import { useMqtt } from "../services/useMqtt";


interface LiveDataProps {
  isDarkMode: boolean;
}

const LiveData: React.FC<LiveDataProps> = ({ isDarkMode }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const backgroundColor = isDarkMode ? "#7E909A" : "#F1F1F1";

  // 🟢 Zwei Topics einlesen → unterschiedliche Variablennamen verwenden
  const logData = useMqtt("sensor/logdata");
  const vibrationData = useMqtt("sensor/vibration");

  // 🧠 Kombinierte Daten für Anzeige
  const mqttData = {
    ...logData,
    ...vibrationData,
  };

  const gaugeStyle = {
    startAngle: 0,
    endAngle: 360,
    innerRadius: "80%",
    outerRadius: "100%",
  };

  const gauges = [
    { label: "Sollfrequenz", field: "Sollfrequenz" },
    { label: "IstfrequenzmitSlip", field: "IstfrequenzmitSlip" },
    { label: "IstfrequenzohneSlip", field: "IstfrequenzohneSlip" },
    {label: "Drehmoment", field:"Drehmoment"},
    { label: "ZSW", field: "ZSW" },
    { label: "Vibration", field: "Vibration" },
  ];

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        px: 2,
        py: 4,
        backgroundColor,
      }}
    >
      <Grid container spacing={4}>
        {gauges.map((g, i) => (
          <Grid
            key={i}
            size={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography mb={1}>{g.label}</Typography>
            <Gauge
              value={mqttData?.[g.field] ?? 0}
              width={300}
              height={200}
              {...gaugeStyle}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LiveData;
