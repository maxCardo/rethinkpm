import { useState, useEffect, useRef } from "react";
import { Modal, Box, Button, Divider, IconButton } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import LeaseLeadForm from "./LeaseLeadForm";
import axios from "axios";
import MaterialAlert from "../../../core/MaterialAlert";

const LeaseModal = ({ isModalOpen, closeModal, getLeaseLeadData }) => {
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const formRef = useRef();

  const boxStyle = {
    width: "50%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderWidth: "1px",
    borderRadius: "4px",
    height: "80%",
    overflowY: "auto",
  };

  const modalStyle = {
    zIndex: "999999",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

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
      const response = await axios.post("/api/crm/leaselead", formData);

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
      <Modal open={isModalOpen} style={modalStyle}>
        <Box sx={boxStyle}>
          <div className="flex items-center justify-between mb-2">
            <p className="leasing-modal__title text-3xl">Add Lead</p>
            <IconButton aria-label="close" onClick={closeModal} size="large">
              <AiOutlineClose size={24} />
            </IconButton>
          </div>
          <Divider />
          <div className="leasing-modal__content my-8">
            <LeaseLeadForm
              getFormData={(data) => setFormData(data)}
              ref={formRef}
            />
            {formError && (
              <div className="mt-4 p-2 bg-red-100 text-red-700 rounded border border-red-300 text-center">
                {formError}
              </div>
            )}
          </div>
          <Divider />
          <div className="lesing-modal__actions flex justify-end mt-8">
            <Button color="error" onClick={() => closeModal()} className="mx-2">
              Cancel
            </Button>
            <Button variant="outlined" color="primary" onClick={saveData}>
              Save
            </Button>
          </div>
        </Box>
      </Modal>
      <MaterialAlert
        open={successAlert}
        onClose={() => setSuccessAlert(false)}
        message="Saved successfully!"
        severity="success"
        duration={3000}
      />
    </>
  );
};

export default LeaseModal;
