import { useState } from "react";
import { Modal, Box, Button, Divider } from "@mui/material";
import LeasingLeadsForm from "./LeasingLeadsForm";

const LeasingModal = ({ isModalOpen, closeModal }) => {
  // const [isOpen, setIsOpen] = useState(true);

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

  return (
    <>
      <Modal open={isModalOpen} style={modalStyle}>
        <Box sx={boxStyle}>
          <p className="leasing-modal__title text-3xl">Add Lead</p>
          <Divider />
          <div className="leasing-modal__content my-8">
            <LeasingLeadsForm />
          </div>
          <Divider />
          <div className="lesing-modal__actions flex justify-end mt-8">
            <Button
              // variant="outlined"
              color="error"
              onClick={() => closeModal()}
              className="mx-2"
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="primary"
              // onClick={() => closeModal()}
            >
              Save
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default LeasingModal;
