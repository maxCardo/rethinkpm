import { useState } from "react";
import { useDispatch } from "react-redux";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import CustomReactSelect from "../../../ui/CustomReactSelect";
import settings from "../../../../settings.json";
import { capitalizeFirstLetter } from "../../../../util/commonFunctions";
import { createSuccessAlert, createErrorAlert } from "../../../../actions/alert";
import axios from "axios";

const DeleteLeadDialog = ({
  open,
  onClose,
  leadItem,
  onDeleteSuccess,
}) => {
  const dispatch = useDispatch();
  const [selectedReason, setSelectedReason] = useState(null);

  const SETTINGS = settings.routes.leaseLead;
  const reasonForLossValues = Object.values(SETTINGS.reasonForLossOptions);
  const reasonForLossOptions = reasonForLossValues.map((value) => ({
    label: capitalizeFirstLetter(value.replace(/([A-Z])/g, " $1")),
    value,
  }));

  const handleClose = () => {
    setSelectedReason(null);
    onClose();
  };

  const handleConfirmDelete = async () => {
    if (!leadItem?._id) {
      console.warn("Cannot delete lead: no lead ID provided");
      dispatch(createErrorAlert("Cannot delete lead: no lead ID provided", "DeleteLeadDialog"));
      return;
    }


    try {
      await axios.patch(`/api/crm/leaselead/delete/${leadItem._id}`, {
        reasonForLoss: selectedReason.value,
      });
      
      // Show success message
      dispatch(createSuccessAlert("Lead deleted successfully", "DeleteLeadDialog"));
      
      // Call the success callback to refresh the lead list
      if (onDeleteSuccess) {
        await onDeleteSuccess();
      }
      
      handleClose();
    } catch (err) {
      console.error("Failed to delete lead:", err);
      const errorMessage = err.response?.data?.message || "Failed to delete lead. Please try again.";
      dispatch(createErrorAlert(errorMessage, "DeleteLeadDialog"));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Delete Lead</DialogTitle>
      <DialogContent>
        <div style={{ width: "100%", marginTop: '12px' }}>
          <CustomReactSelect
            options={reasonForLossOptions}
            label={"Reason for Loss"}
            value={selectedReason}
            onChange={(selected) => setSelectedReason(selected)}
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              menu: (base) => ({ ...base, zIndex: 9999 }),
            }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button 
          onClick={handleConfirmDelete} 
          variant="contained" 
          color="error" 
          disabled={!selectedReason?.value}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteLeadDialog;

