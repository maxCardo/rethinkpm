import { Card, Typography, Divider, Box, Chip, Button } from "@mui/material";
import { capitalizeFirstLetter } from "../../../../util/commonFunctions";

const LeadDetails = ({ selectedLeadItem, onGoToTourTab }) => {
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
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      justifyContent="center"
      alignItems="flex-start"
      gap={2}
      mt={8}
    >
      <Card
        sx={{
          width: 420,
          p: 3,
          boxShadow: 3,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600} gutterBottom>
          {selectedLeadItem.fullName || "Unnamed Lead"}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box mb={2}>
          <Typography variant="subtitle2" color="textSecondary">
            Email
          </Typography>
          <Typography>{selectedLeadItem.email?.[0]?.address || "-"}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2" color="textSecondary">
            Phone
          </Typography>
          <Typography>
            {selectedLeadItem.phoneNumbers?.[0]?.number || "-"}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2" color="textSecondary">
            Address
          </Typography>
          <Typography>{selectedLeadItem.listingAddress || "-"}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2" color="textSecondary">
            Status
          </Typography>
          <Chip
            label={capitalizeFirstLetter(selectedLeadItem.status) || "-"}
            color="primary"
            size="small"
          />
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2" color="textSecondary">
            Lead Owner
          </Typography>
          <Typography>{selectedLeadItem.leadOwner || "-"}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2" color="textSecondary">
            Lead Temperature
          </Typography>
          <Chip
            label={
              capitalizeFirstLetter(selectedLeadItem.leadTemperature) || "-"
            }
            color="secondary"
            size="small"
          />
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2" color="textSecondary">
            Next Action
          </Typography>
          <Typography>
            {selectedLeadItem.nextAction
              ? new Date(selectedLeadItem.nextAction).toLocaleDateString()
              : "-"}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2" color="textSecondary">
            Reason For Loss
          </Typography>
          <Typography>{selectedLeadItem.reasonForLoss || "-"}</Typography>
        </Box>
        <Box mt={4} textAlign="center">
          <Button variant="contained" color="primary" onClick={onGoToTourTab}>
            Go to Tour Tracking
          </Button>
        </Box>
      </Card>
      {/* Notes Card */}
      <Card
        sx={{
          width: 420,
          p: 3,
          boxShadow: 2,
          borderRadius: 3,
          maxHeight: 700,
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Notes
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box style={{ whiteSpace: "pre-line" }}>
          {Array.isArray(selectedLeadItem.notes) &&
          selectedLeadItem.notes.length > 0
            ? selectedLeadItem.notes.map((note, idx) =>
                note.content ? (
                  <Box
                    key={idx}
                    mb={2}
                    p={1}
                    sx={{ background: "#f5f5f5", borderRadius: 1 }}
                  >
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      sx={{ wordBreak: "break-word", whiteSpace: "pre-line" }}
                    >
                      • {note.content}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {note.type ? `Type: ${note.type}` : ""}
                      {note.date
                        ? ` | ${new Date(note.date).toLocaleDateString()}`
                        : ""}
                    </Typography>
                  </Box>
                ) : null
              )
            : "-"}
        </Box>
      </Card>
    </Box>
  );
};

export default LeadDetails;
