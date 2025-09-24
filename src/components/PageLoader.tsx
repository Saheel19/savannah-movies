import React from "react"
import { Box, CircularProgress } from "@mui/material"

const PageLoader: React.FC = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 2000,
      }}
    >
      <CircularProgress size={60} color="secondary" />
    </Box>
  )
}

export default PageLoader
