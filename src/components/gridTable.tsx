import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { fetchSensorData } from "../services/influxService";

interface DataTableProps {
  isDarkMode: boolean;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "time", headerName: "Zeit", width: 220 },
  { field: "value", headerName: "Wert", width: 130 },
];




const timeOptions: { [key: string]: string } = {
  "Letzte 1 Minute": "-1m",
  "Letzte 5 Minuten": "-5m",
  "Letzte 30 Minuten": "-30m",
  "Letzte 60 Minuten": "-1h",
  "Letzte 24 Stunden": "-24h",
  "Alle Daten": "0",
};

const measurementOptions: string[] = [
  "spannung_vor_umrichter",
  "spannung_nach_umrichter",
  "strom_vor_umrichter",
  "strom_nach_umrichter",
  "drehzahl",
];

export default function DataTable({ isDarkMode }: DataTableProps) {
  const [rows, setRows] = useState<any[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] =
    useState("Letzte 30 Minuten");
  const [selectedMeasurement, setSelectedMeasurement] = useState(
    "spannung_vor_umrichter"
  );

  const loadData = async () => {
    try {
      const data = await fetchSensorData(
        timeOptions[selectedTimeRange],
        selectedMeasurement
      );

      const formattedRows = data.map((item, index) => ({
        id: index + 1,
        time: new Date(item.time).toLocaleString(),
        value: item.value,
      }));
      setRows(formattedRows);
    } catch (error) {
      console.error("Fehler beim Laden der Daten:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedTimeRange, selectedMeasurement]);

  const handleTimeChange = (event: SelectChangeEvent) => {
    setSelectedTimeRange(event.target.value);
  };

  const handleMeasurementChange = (event: SelectChangeEvent) => {
    setSelectedMeasurement(event.target.value);
  };
  const downloadCSV = () => {
  if (rows.length === 0) return;

  const header = "ID,Zeit,Wert\n";
  const csvRows = rows
    .map((row) => `${row.id},"${row.time}",${row.value}`)
    .join("\n");
  const csvContent = header + csvRows;

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `sensor_data_${selectedMeasurement}_${selectedTimeRange.replaceAll(" ", "_")}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  return (
    <>
     <Box sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}>
  <FormControl fullWidth>
    <InputLabel id="zeitfilter-label">Zeitfilter</InputLabel>
    <Select
      labelId="zeitfilter-label"
      value={selectedTimeRange}
      label="Zeitfilter"
      onChange={handleTimeChange}
    >
      {Object.keys(timeOptions).map((label) => (
        <MenuItem key={label} value={label}>
          {label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>

  <FormControl fullWidth>
    <InputLabel id="measurement-label">Messung</InputLabel>
    <Select
      labelId="measurement-label"
      value={selectedMeasurement}
      label="Messung"
      onChange={handleMeasurementChange}
    >
      {measurementOptions.map((m) => (
        <MenuItem key={m} value={m}>
          {m.replaceAll("_", " ")}
        </MenuItem>
      ))}
    </Select>
  </FormControl>

  <Box>
    <button
      onClick={downloadCSV}
      style={{
        padding: "8px 16px",
        backgroundColor: isDarkMode ? "#4CAF50" : "#2196F3",
        color: "white",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
      }}
    >
      CSV herunterladen
    </button>
  </Box>
</Box>


      <Paper
        sx={{
          height: 500,
          width: "100%",
          backgroundColor: isDarkMode ? "#7E909A" : "#F1F1F1",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          
          sx={{
            border: 0,
            backgroundColor: isDarkMode ? "#7E909A" : "#F1F1F1",
            color: isDarkMode ? "#fff" : "#000",
          }}
        />
      </Paper>
    </>
  );
}
