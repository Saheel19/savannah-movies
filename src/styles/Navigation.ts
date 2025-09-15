import { SxProps, Theme } from "@mui/material"

export const navBarStyles: SxProps<Theme> = {
  backgroundColor: "rgba(15, 23, 42, 0.95)", // slate-900/95
  backdropFilter: "blur(8px)",
  borderBottom: "1px solid rgba(51, 65, 85, 0.5)", // slate-700/50
}

export const containerStyles: SxProps<Theme> = {
  maxWidth: "1280px",
  mx: "",
  px: { xs: 2, sm: 4, lg: 8 },
}

export const innerStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: 64,
}

export const logoStyles: SxProps<Theme> = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  background: "linear-gradient(to right, #818cf8, #f472b6)", // indigo → pink
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}

export const navButtonStyles = (active: boolean): SxProps<Theme> => ({
  px: 2,
  py: 1,
  borderRadius: "8px",
  fontSize: "0.875rem",
  fontWeight: 500,
  transition: "all 0.2s",
  color: active ? "#fff" : "rgba(203,213,225,1)", // slate-300
  backgroundColor: active ? "#4f46e5" : "transparent", // indigo-600
  "&:hover": {
    backgroundColor: active ? "#4338ca" : "rgba(51,65,85,1)", // hover bg
    color: "#fff",
  },
})

export const searchWrapperStyles: SxProps<Theme> = {
  position: "relative",
}

export const searchInputStyles: SxProps<Theme> = {
  width: 256,
  px: 4,
  py: 1.5,
  pl: 10,
  borderRadius: "8px",
  bgcolor: "rgb(30,41,59)", // slate-800
  border: "1px solid rgb(71,85,105)", // slate-600
  color: "#fff",
  "&::placeholder": {
    color: "rgb(148,163,184)", // slate-400
  },
  "&:focus": {
    outline: "none",
    borderColor: "#6366f1", // indigo-500
    boxShadow: "0 0 0 2px rgba(99,102,241,0.5)",
  },
}

export const searchIconStyles: SxProps<Theme> = {
  position: "absolute",
  left: 12,
  top: "50%",
  transform: "translateY(-50%)",
  width: 20,
  height: 20,
  color: "rgb(148,163,184)", // slate-400
}
