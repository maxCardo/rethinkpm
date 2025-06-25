import React from "react";
import { Box, Button, Typography } from "@mui/material";

const LeaseConfirmModal = ({ open, onConfirm, onCancel, title, message }) => {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 32,
          borderRadius: 8,
          minWidth: 320,
          boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" mb={2}>
          {title}
        </Typography>
        <Typography mb={3}>{message}</Typography>
        <Box display="flex" justifyContent="center" gap={2}>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={onConfirm}>
            Delete
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default LeaseConfirmModal;
