import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Drawer,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { TbDeviceAnalytics } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { FaFileDownload } from "react-icons/fa";
import SensorsIcon from "@mui/icons-material/Sensors";
interface MuiDrawerProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const AnalyticsIcon = TbDeviceAnalytics as unknown as React.FC<{
  size?: number;
}>;
const DashboardIcon = RxDashboard as unknown as React.FC<{ size?: number }>;
const DownloadIcon = FaFileDownload as unknown as React.FC<{ size?: number }>;
const LiveDataIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <SensorsIcon sx={{ fontSize: size }} />
);

const MuiDrawer: React.FC<MuiDrawerProps> = ({ toggleTheme, isDarkMode }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const backgroundColor = isDarkMode ? "#1C4E80" : "#A5D8DD";
  const textColor = isDarkMode ? "#FFFFFF" : "#000000";

  return (
    <Box sx={{ width: "100%", p: 1 }}>
      <IconButton
        size="large"
        edge="start"
        aria-label="logo"
        onClick={() => setIsDrawerOpen(true)}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: backgroundColor,
            color: textColor,
            width: 250,
            p: 2,
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <Link
              to="/"
              style={{
                color: textColor,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <DashboardIcon size={50} />
              Dashboard
            </Link>
          </Box>
          <Box>
            <Link
              to="/Analyst"
              style={{
                color: textColor,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px", // Abstand zwischen Icon und Text
              }}
            >
              <AnalyticsIcon size={50} />
              Analytics
            </Link>
          </Box>
          <Box>
            <Link
              to="/LiveData"
              style={{
                color: textColor,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px", // Abstand zwischen Icon und Text
              }}
            >
              <LiveDataIcon size={50} />
              Live Data
            </Link>
          </Box>
          <Box>
            <Link
              to="/DataTable"
              style={{
                color: textColor,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <DownloadIcon size={50} />
              Data
            </Link>
          </Box>
        </Box>

        <Button
          variant="contained"
          onClick={toggleTheme}
          sx={{ mt: 4, backgroundColor: textColor, color: backgroundColor }}
        >
          Switch to {isDarkMode ? "Light" : "Dark"} Theme
        </Button>
      </Drawer>
    </Box>
  );
};

export default MuiDrawer;
