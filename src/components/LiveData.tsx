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

  const mqttData = useMqtt("sensor/logdata");

  const gaugeStyle = {
    startAngle: 0,
    endAngle: 360,
    innerRadius: "80%",
    outerRadius: "100%",
  };

  const gauges = [
    { label: "Spannung vor Umrichter", value: 75 },
    { label: "Spannung nach Umrichter", value: 60 },
    { label: "Strom vor Umrichter", value: 45 },
    { label: "Strom nach Umrichter", value: 90 },
    { label: "Drehzahl", custom: true },
    { label: "Frequenz", value: 75 },
    { label: "vibrations", dynamic: true },
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
            {g.custom ? (
              <GaugeContainer
                width={isSmallScreen ? 150 : 200}
                height={isSmallScreen ? 150 : 200}
                startAngle={-110}
                endAngle={110}
                value={30}
              >
                <GaugeReferenceArc />
                <GaugeValueArc />
              </GaugeContainer>
            ) : (
              <Gauge
                value={
                  g.dynamic && mqttData?.value !== undefined
                    ? mqttData.value
                    : g.value ?? 0
                }
                width={300}
                height={200}
                {...gaugeStyle}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LiveData;
