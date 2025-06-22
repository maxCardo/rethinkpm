import { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

function sanitizeGoogleFormsUrl(url) {
  // Only allow Google Forms URLs and strip extra params/fragments
  try {
    const parsed = new URL(url);
    if (
      !parsed.hostname.endsWith(".google.com") ||
      !parsed.pathname.startsWith("/forms")
    ) {
      return null;
    }
    // Remove fragment/hash and search params for embed
    return parsed.origin + parsed.pathname;
  } catch {
    return null;
  }
}

const LeadTourTracking = ({ selectedLeadItem }) => {
  const [formUrl, setFormUrl] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormUrl(e.target.value);
    setError("");
  };

  const handleEmbed = () => {
    const sanitized = sanitizeGoogleFormsUrl(formUrl);
    if (sanitized) {
      setEmbedUrl(sanitized);
      setError("");
    } else {
      setEmbedUrl("");
      setError("Please enter a valid Google Forms URL.");
    }
  };

  if (!selectedLeadItem || Object.keys(selectedLeadItem).length === 0) {
    return (
      <Box p={4} textAlign="center">
        <Typography variant="subtitle1" color="textSecondary">
          No lead selected.
        </Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 3, maxWidth: 700, mx: "auto", mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Google Forms Tour Tracking
      </Typography>
      {selectedLeadItem &&
        (selectedLeadItem.fullName || selectedLeadItem.listingAddress) && (
          <Typography variant="subtitle1" color="textSecondary" mb={2}>
            {selectedLeadItem.fullName && (
              <>
                For Lead: <b>{selectedLeadItem.fullName}</b>
              </>
            )}
            {selectedLeadItem.listingAddress && (
              <>
                {selectedLeadItem.fullName ? " | " : null}
                Address: <b>{selectedLeadItem.listingAddress}</b>
              </>
            )}
          </Typography>
        )}
      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Google Forms URL"
          value={formUrl}
          onChange={handleInputChange}
          fullWidth
          size="small"
          placeholder="Paste your Google Forms link here"
        />
        <Button variant="contained" onClick={handleEmbed}>
          Embed
        </Button>
      </Box>
      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}
      {embedUrl && (
        <Box mt={2}>
          <iframe
            title="Google Form"
            src={embedUrl}
            width="100%"
            height="600"
            style={{ border: 0 }}
            allowFullScreen
          />
        </Box>
      )}
    </Paper>
  );
};

export default LeadTourTracking;
