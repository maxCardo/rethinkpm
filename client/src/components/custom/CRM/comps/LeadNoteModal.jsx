import React from "react";
import { Box, Button, Typography } from "@mui/material";

const LeadNoteModal = ({ open, value, onChange, onClose, onSave, error }) => {
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
          minWidth: 480,
          maxWidth: 600,
          width: "100%",
          boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" mb={2}>
          Add Note
        </Typography>
        <textarea
          value={value}
          onChange={onChange}
          rows={7}
          style={{
            width: "96%",
            minWidth: 400,
            maxWidth: 560,
            padding: 12,
            borderRadius: 4,
            border: "1px solid #ccc",
            resize: "vertical",
            fontSize: 16,
          }}
          placeholder="Enter note content..."
        />
        {error && (
          <Typography color="error" mt={1}>
            {error}
          </Typography>
        )}
        <Box mt={2} display="flex" justifyContent="center" gap={2}>
          <Button color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={onSave}>
            Save
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default LeadNoteModal;
