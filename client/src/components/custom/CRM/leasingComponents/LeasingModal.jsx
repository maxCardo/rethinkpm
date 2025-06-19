import { useState } from "react";
import { Modal, Box, Button } from "@mui/material";

const LeasingModal = ({ isModalOpen, closeModal }) => {
  // const [isOpen, setIsOpen] = useState(true);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ zIndex: "999999" }}
      >
        <Box sx={style}>
          <p id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </p>
          <p id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => closeModal()}
          >
            Close Me!
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default LeasingModal;
