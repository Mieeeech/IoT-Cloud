// src/pages/Analyst.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { fetchSensorData } from "../services/influxService";

interface AnalystProps {
  isDarkMode: boolean;
}

const sensorMap: Record<string, string> = {
  "Spannung Vor Umrichter": "spannung_vor_umrichter",
  "Spannung nach Umrichter": "spannung_nach_umrichter",
  "Strom vor Umrichter": "strom_vor_umrichter",
  "Strom nach Umrichter": "strom_nach_umrichter",
  Drehzahl: "drehzahl",
};

const timeOptions: Record<string, string> = {
  "Letzte 1 Minute": "-1m",
  "Letzte 5 Minuten": "-5m",
  "Letzte 30 Minuten": "-30m",
  "Letzte 60 Minuten": "-1h",
  "Letzte 24 Stunden": "-24h",
  "Alle Daten": "0",
};

const Analyst: React.FC<AnalystProps> = ({ isDarkMode }) => {
  const [selectedChart, setSelectedChart] = useState("Spannung Vor Umrichter");
  const [selectedTimeRange, setSelectedTimeRange] =
    useState("Letzte 60 Minuten");
  const [chartData, setChartData] = useState<number[]>([]);
  const [timeLabels, setTimeLabels] = useState<string[]>([]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const backgroundColor = isDarkMode ? "#7E909A" : "#F1F1F1";

  useEffect(() => {
    const fetchData = async () => {
      const measurement = sensorMap[selectedChart];
      const timeRange = timeOptions[selectedTimeRange];
      try {
        const data = await fetchSensorData(timeRange, measurement);
        setChartData(data.map((d) => d.value));
        setTimeLabels(data.map((d) => new Date(d.time).toLocaleTimeString()));
      } catch (err) {
        console.error("Fehler beim Laden der Daten:", err);
      }
    };

    fetchData();
  }, [selectedChart, selectedTimeRange]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 3,
        backgroundColor,
      }}
    >
      {/* Diagramm Auswahl */}
      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel id="chart-select-label">Diagramm auswählen</InputLabel>
        <Select
          labelId="chart-select-label"
          value={selectedChart}
          label="Diagramm auswählen"
          onChange={(e) => setSelectedChart(e.target.value)}
        >
          {Object.keys(sensorMap).map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Zeitbereich Auswahl */}
      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel id="time-range-label">Zeitbereich</InputLabel>
        <Select
          labelId="time-range-label"
          value={selectedTimeRange}
          label="Zeitbereich"
          onChange={(e) => setSelectedTimeRange(e.target.value)}
        >
          {Object.keys(timeOptions).map((label) => (
            <MenuItem key={label} value={label}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Diagramm */}
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          boxShadow: 2,
          backgroundColor: isDarkMode ? "#556070" : "#ffffff",
        }}
      >
        <Typography mb={2}>📈 {selectedChart}</Typography>
        <LineChart
          xAxis={[{ data: timeLabels, scaleType: "point" }]}
          series={[{ data: chartData }]}
          height={300}
        />
      </Box>
    </Box>
  );
};

export default Analyst;
