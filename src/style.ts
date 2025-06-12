import { SxProps, Theme } from "@mui/system";

export const homeContainer: SxProps<Theme> = (theme) => ({
  padding: "16px",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  borderRadius: "4px",
});

export const textStyleColor: SxProps<Theme> = (theme) => ({
  color: theme.palette.secondary.main,
});
