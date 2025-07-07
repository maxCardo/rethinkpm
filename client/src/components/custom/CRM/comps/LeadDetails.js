import ContactInfo from "../leadDetailsFields/ContactInfo";
import LeadInfo from "../leadDetailsFields/LeadInfo";
import LeadNotes from "../leadDetailsFields/LeadNotes";
import LeadNextAction from "../leadDetailsFields/LeadNextAction";
import LeadEditControls from "../leadDetailsFields/LeadEditControls";
import { Divider, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const LeadDetails = ({ selectedLeadItem, onLeadUpdated }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [leadInfoData, setLeadInfoData] = useState({});
  const [contactInfoData, setContactInfoData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);

  const handleToggleEdit = () => {
    setIsEditMode(!isEditMode);
    if (!isEditMode) {
      // Clear any existing data when entering edit mode
      setLeadInfoData({});
      setContactInfoData({});
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      // Merge the updated data with the original lead item
      const updatedLead = Object.assign(
        {},
        selectedLeadItem,
        Object.keys(leadInfoData).length > 0 ? leadInfoData : {},
        Object.keys(contactInfoData).length > 0 ? contactInfoData : {}
      );

      // Update lead
      const response = await axios.put(
        `/api/crm/leaselead/${selectedLeadItem._id}`,
        updatedLead
      );

      if (response.status === 200) {
        console.log("Lead updated successfully:", response.data);
        setShowSuccessSnackbar(true);
        setIsEditMode(false);
        // Clear the temporary data
        setLeadInfoData({});
        setContactInfoData({});
        // Refresh the data in the parent component
        if (onLeadUpdated) {
          await onLeadUpdated();
        }
      } else {
        console.error("Failed to update lead:", response.statusText);
        setShowErrorSnackbar(true);
      }
    } catch (err) {
      console.error("Error updating lead:", err);
      if (err.response) {
        console.error("Error response data:", err.response.data);
        console.error("Error response status:", err.response.status);
      }
      setShowErrorSnackbar(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
    // Clear any unsaved changes
    setLeadInfoData({});
    setContactInfoData({});
  };

  const handleLeadInfoChange = (leadInfoDataReceived) => {
    if (isEditMode) {
      setLeadInfoData(leadInfoDataReceived);
    }
  };

  const handleContactInfoChange = (contactInfoDataReceived) => {
    if (isEditMode) {
      setContactInfoData(contactInfoDataReceived);
    }
  };

  return (
    <div className="lead-details relative flex flex-col gap-5 px-2 h-auto">
      {/* Edit Controls */}
      <LeadEditControls
        isEditMode={isEditMode}
        isSaving={isSaving}
        onToggleEdit={handleToggleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
      />

      {/* Row 1 */}
      <div className="first-row flex w-full gap-5 mt-5">
        {/* Contact Info */}
        <div className="contact-info flex-1/2">
          <ContactInfo
            selectedLeadItem={selectedLeadItem}
            isEditMode={isEditMode}
            onContactInfoChange={handleContactInfoChange}
          />
        </div>
        {/* Lead Notes */}
        <div className="lead-notes flex-1/2">
          <LeadNotes
            selectedLeadItem={selectedLeadItem}
            isEditMode={isEditMode}
          />
        </div>
      </div>
      <Divider />
      {/* Row 2 */}
      <div className="second-row flex w-full gap-5">
        {/* Lead Info */}
        <div className="lead-info flex-1/2">
          <LeadInfo
            selectedLeadItem={selectedLeadItem}
            isEditMode={isEditMode}
            onLeadInfoChange={handleLeadInfoChange}
          />
        </div>
        {/* Next Action */}
        <div className="lead-next-action flex-1/2">
          <LeadNextAction
            selectedLeadItem={selectedLeadItem}
            isEditMode={isEditMode}
            // If status has changed - send to child component
            updatedLeadStatus={
              leadInfoData &&
              leadInfoData.status &&
              leadInfoData.status !== selectedLeadItem.status
                ? leadInfoData.status
                : ""
            }
          />
        </div>
      </div>
      {/* TODO: Change it to a simple snackbar */}
      {/* Success Snackbar */}
      <Snackbar
        open={showSuccessSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSuccessSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setShowSuccessSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Lead details updated successfully!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={showErrorSnackbar}
        autoHideDuration={4000}
        onClose={() => setShowErrorSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setShowErrorSnackbar(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Failed to update lead details. Please try again.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LeadDetails;
