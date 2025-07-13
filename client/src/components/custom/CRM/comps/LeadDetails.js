import ContactInfo from "../leadDetailsFields/ContactInfo";
import LeadInfo from "../leadDetailsFields/LeadInfo";
import LeadNotes from "../leadDetailsFields/LeadNotes";
import LeadNextAction from "../leadDetailsFields/LeadNextAction";
import LeadEditControls from "../leadDetailsFields/LeadEditControls";
import UpdateAlert from "../../../core/Alert";
import { Divider } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createSuccessAlert,
  createErrorAlert,
} from "../../../../actions/alert";
import {
  validateEmail,
  validatePhoneNum,
} from "../../../../util/commonFunctions";
import axios from "axios";

const LeadDetails = ({ selectedLeadItem, onLeadUpdated }) => {
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const [leadInfoData, setLeadInfoData] = useState({});
  const [contactInfoData, setContactInfoData] = useState({});
  const [nextActionData, setNextActionData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Validation function
  const validateContactData = (data) => {
    const errors = {};

    // Validate emails (skip index 0)
    if (data.email && Array.isArray(data.email)) {
      data.email.forEach((emailObj, index) => {
        if (index > 0 && emailObj.address && emailObj.address.trim()) {
          if (!validateEmail(emailObj.address)) {
            errors[`email_${index}`] = "Please enter a valid email address";
          }
        }
      });
    }

    // Validate phone numbers (skip index 0)
    if (data.phoneNumbers && Array.isArray(data.phoneNumbers)) {
      data.phoneNumbers.forEach((phoneObj, index) => {
        if (index > 0 && phoneObj.number && phoneObj.number.trim()) {
          if (!validatePhoneNum(phoneObj.number)) {
            errors[`phone_${index}`] =
              "Please enter a valid phone number (10 digits)";
          }
        }
      });
    }

    return errors;
  };

  const handleToggleEdit = () => {
    setIsEditMode(!isEditMode);
    if (!isEditMode) {
      // Clear any existing data when entering edit mode
      setLeadInfoData({});
      setContactInfoData({});
      setNextActionData({});
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      // Merge the updated data with the original lead item
      let updatedLead = Object.assign(
        {},
        selectedLeadItem,
        Object.keys(leadInfoData).length > 0 ? leadInfoData : {},
        Object.keys(contactInfoData).length > 0 ? contactInfoData : {},
        Object.keys(nextActionData).length > 0 ? nextActionData : {}
      );

      // Filter out empty email addresses and phone numbers before saving
      if (updatedLead.email?.length) {
        updatedLead.email = updatedLead.email.filter((e) => e.address?.trim());
      }

      if (updatedLead.phoneNumbers?.length) {
        updatedLead.phoneNumbers = updatedLead.phoneNumbers.filter((p) =>
          p.number?.trim()
        );
      }

      // Validate contact data before saving
      const errors = validateContactData(updatedLead);
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        dispatch(
          createErrorAlert(
            "Please fix validation errors before saving.",
            "LeadDetails"
          )
        );
        setIsSaving(false);
        return;
      }

      // Clear validation errors if validation passes
      setValidationErrors({});

      // Update lead
      const response = await axios.put(
        `/api/crm/leaselead/${selectedLeadItem._id}`,
        updatedLead
      );

      if (response.status === 200) {
        console.log("Lead updated successfully:", response.data);
        dispatch(
          createSuccessAlert(
            "Lead details updated successfully!",
            "LeadDetails"
          )
        );
        setIsEditMode(false);
        // Clear the temporary data
        setLeadInfoData({});
        setContactInfoData({});
        setNextActionData({});
        // Refresh the data in the parent component
        if (onLeadUpdated) {
          await onLeadUpdated();
        }
      } else {
        console.error("Failed to update lead:", response.statusText);
        dispatch(
          createErrorAlert(
            "Failed to update lead details. Please try again.",
            "LeadDetails"
          )
        );
      }
    } catch (err) {
      console.error("Error updating lead:", err);
      if (err.response) {
        console.error("Error response data:", err.response.data);
        console.error("Error response status:", err.response.status);
      }
      dispatch(
        createErrorAlert(
          "Failed to update lead details. Please try again.",
          "LeadDetails"
        )
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
    // Clear any unsaved changes
    setLeadInfoData({});
    setContactInfoData({});
    setNextActionData({});
  };

  const handleLeadInfoChange = (leadInfoDataReceived) => {
    if (isEditMode) {
      setLeadInfoData(leadInfoDataReceived);
    }
  };

  const handleContactInfoChange = (contactInfoDataReceived) => {
    if (isEditMode) {
      // Just store the data as received, filtering will happen during save
      setContactInfoData(contactInfoDataReceived);
    }
  };

  const handleNextActionChange = (nextActionDataReceived) => {
    if (isEditMode) {
      setNextActionData(nextActionDataReceived);
    }
  };

  const clearValidationError = (errorKey) => {
    setValidationErrors((prev) => {
      const updated = { ...prev };
      delete updated[errorKey];
      return updated;
    });
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
            validationErrors={validationErrors}
            clearValidationError={clearValidationError}
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
            onNextActionChange={handleNextActionChange}
            // If status has changed - send to child component
            updatedLeadStatus={
              leadInfoData && leadInfoData.status ? leadInfoData.status : ""
            }
          />
        </div>
      </div>

      {/* Alert System */}
      <UpdateAlert />
    </div>
  );
};

export default LeadDetails;
