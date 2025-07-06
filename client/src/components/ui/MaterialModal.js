import { Modal, Box, Divider, IconButton } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";

const MaterialModal = ({
  isOpen,
  onClose,
  title,
  children,
  showActions = true,
  showCloseButton = true,
  width = "50%",
  height = "80%",
  actions,
}) => {
  const boxStyle = {
    width: width,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderWidth: "1px",
    borderRadius: "4px",
    height: height,
    overflowY: "auto",
  };

  const modalStyle = {
    zIndex: "999999",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const handleKeyDown = (event) => {
    // Close modal on 'esc' keyboard
    if (event.key === "Escape") {
      onClose();
    }
  };

  return (
    <Modal open={isOpen} style={modalStyle} onKeyDown={handleKeyDown}>
      <Box sx={boxStyle}>
        {/* Title && Close Button */}
        {(title || showCloseButton) && (
          <>
            <div className="flex items-center justify-between mb-2">
              {title && (
                <p className="material-modal__title text-3xl">{title}</p>
              )}
              {showCloseButton && (
                <IconButton aria-label="close" onClick={onClose} size="large">
                  <AiOutlineClose size={24} />
                </IconButton>
              )}
            </div>
            <Divider />
          </>
        )}
        {/* Content */}
        <div className="material-modal__content my-8 h-full">{children}</div>
        {/* Action Buttons */}
        {showActions && actions && (
          <>
            <Divider />
            <div className="material-modal__actions flex justify-end mt-8">
              {actions}
            </div>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default MaterialModal;
