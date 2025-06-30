import { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import LeaseLeadForm from "./LeaseLeadForm";
import axios from "axios";
import MaterialAlert from "../../../core/MaterialAlert";
import MaterialModal from "../../../../ui/MaterialModal";

const LeaseModal = ({
  isModalOpen,
  closeModal,
  getLeaseLeadData,
  settings,
  isEditMode,
  selectedLeadItem,
}) => {
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const formRef = useRef();

  // Validate email and phone on submit
  const validateForm = () => {
    const email = formData.email && formData.email[0]?.address;
    const phone = formData.phoneNumbers && formData.phoneNumbers[0]?.number;
    let errorMsg = "";
    if (!email || !window.validateEmail(email)) {
      errorMsg = "Please enter a valid email address.";
    } else if (!phone || !window.validatePhoneNum(phone)) {
      errorMsg = "Please enter a valid phone number.";
    }
    setFormError(errorMsg);
    return !errorMsg;
  };

  const saveData = async () => {
    if (!validateForm()) return;
    setFormError("");
    try {
      let response;
      if (isEditMode && formData._id) {
        response = await axios.put(
          `/api/crm/leaselead/${formData._id}`,
          formData
        );
      } else {
        response = await axios.post("/api/crm/leaselead", formData);
      }

      if (response?.data) {
        setSuccessAlert(true);
        closeModal();
        if (getLeaseLeadData) getLeaseLeadData(); // Refresh lease leads list
      }
    } catch (error) {
      setFormError(
        error.response?.data?.message ||
          "Failed to save lead. Please try again."
      );
    }
  };

  useEffect(() => {
    // Expose validation functions globally for this modal (since LeaseLeadForm uses them from commonFunctions)
    if (!window.validateEmail) {
      import("../../../../util/commonFunctions").then((mod) => {
        window.validateEmail = mod.validateEmail;
        window.validatePhoneNum = mod.validatePhoneNum;
      });
    }
  }, []);

  return (
    <>
      <MaterialModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={`${!isEditMode ? "Add" : "Edit"} Lead`}
        actions={
          <>
            <Button color="error" onClick={closeModal} className="mx-2">
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={saveData}>
              Save
            </Button>
          </>
        }
      >
        <LeaseLeadForm
          getFormData={(data) => setFormData(data)}
          ref={formRef}
          isEditMode={isEditMode}
          selectedLeadItem={selectedLeadItem}
          settings={settings}
        />
        {formError && (
          <div className="mt-4 p-2 bg-red-100 text-red-700 rounded border border-red-300 text-center">
            {formError}
          </div>
        )}
      </MaterialModal>
      <MaterialAlert
        open={successAlert}
        onClose={() => setSuccessAlert(false)}
        message="Lead saved successfully!"
        severity="success"
        duration={3000}
      />
    </>
  );
};

export default LeaseModal;
