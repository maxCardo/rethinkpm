import { useState } from "react";
import { Modal, Box, Button, Divider } from "@mui/material";
import LeasingLeadsForm from "./LeasingLeadsForm";

const LeasingModal = ({ isModalOpen, closeModal }) => {
  // const [isOpen, setIsOpen] = useState(true);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderWidth: "1px",
    borderRadius: "4px",
  };

  return (
    <>
      <Modal open={isModalOpen} style={{ zIndex: "999999" }}>
        <Box sx={style}>
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
