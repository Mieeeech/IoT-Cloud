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
  Switch,
  FormControlLabel,
} from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { fetchSensorData } from "../services/influxService";

interface AnalystProps {
  isDarkMode: boolean;
}

const sensorMap: Record<string, { key: string; unit: string }> = {
  "Spannung Vor Umrichter": { key: "spannung_vor_umrichter", unit: "V" },
  "Spannung nach Umrichter": { key: "spannung_nach_umrichter", unit: "V" },
  "Strom vor Umrichter": { key: "strom_vor_umrichter", unit: "A" },
  "Strom nach Umrichter": { key: "strom_nach_umrichter", unit: "A" },
  Drehzahl: { key: "drehzahl", unit: "U/min" },
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
  const [selectedTimeRange, setSelectedTimeRange] = useState("Letzte 60 Minuten");
  const [chartData, setChartData] = useState<number[]>([]);
  const [timeLabels, setTimeLabels] = useState<string[]>([]);
  const [isLive, setIsLive] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const backgroundColor = isDarkMode ? "#7E909A" : "#F1F1F1";

  const fetchData = async () => {
    const measurement = sensorMap[selectedChart].key;
    const timeRange = isLive ? "-1m" : timeOptions[selectedTimeRange];
    try {
      const data = await fetchSensorData(timeRange, measurement);
      setChartData(data.map((d) => d.value));

      const labels = data.map((d) => {
        const date = new Date(d.time);
        return date.toLocaleString("de-DE", {
          day: "2-digit",
          month: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      });

      setTimeLabels(labels);
    } catch (err) {
      console.error("Fehler beim Laden der Daten:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedChart, selectedTimeRange, isLive]);

  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      fetchData();
    }, 2000); // alle 2 Sekunden

    return () => clearInterval(interval);
  }, [isLive, selectedChart]);

  const selectedSensor = sensorMap[selectedChart];

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

      {/* Live Toggle */}
      <FormControlLabel
        control={
          <Switch
            checked={isLive}
            onChange={(e) => setIsLive(e.target.checked)}
            color="success"
          />
        }
        label="Live"
        sx={{ mb: 2 }}
      />

      {/* Zeitbereich Auswahl */}
      <FormControl fullWidth sx={{ mb: 4 }} disabled={isLive}>
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
        <Typography mb={2}>
          📈 {selectedChart} ({selectedSensor.unit})
        </Typography>
        <LineChart
          xAxis={[
            {
              data: timeLabels,
              scaleType: "point",
              label: "Zeit (DD.MM. HH:MM:SS)",
            },
          ]}
          yAxis={[
            {
              label: selectedSensor.unit,
            },
          ]}
          series={[
            {
              data: chartData,
              label: `${selectedChart} (${selectedSensor.unit})`,
            },
          ]}
          height={300}
        />
      </Box>
    </Box>
  );
};

export default Analyst;
