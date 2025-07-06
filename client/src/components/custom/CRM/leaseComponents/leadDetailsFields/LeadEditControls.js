import { IconButton, Tooltip } from "@mui/material";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";

const LeadEditControls = ({ isEditMode, onToggleEdit, onSave, onCancel }) => {
  return (
    <div className="edit-controls absolute top-0 right-2 flex gap-2 z-10">
      {!isEditMode ? (
        <Tooltip title="Edit Lead Details">
          <IconButton onClick={onToggleEdit} color="primary">
            <FaEdit />
          </IconButton>
        </Tooltip>
      ) : (
        <div className="flex gap-2">
          <Tooltip title="Save Changes">
            <IconButton onClick={onSave} color="success">
              <FaSave />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cancel Changes">
            <IconButton onClick={onCancel} color="error">
              <FaTimes />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default LeadEditControls;
