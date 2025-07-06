import { IconButton, Tooltip, CircularProgress } from "@mui/material";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";

const LeadEditControls = ({
  isEditMode,
  isSaving,
  onToggleEdit,
  onSave,
  onCancel,
}) => {
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
            <IconButton onClick={onSave} color="success" disabled={isSaving}>
              {isSaving ? (
                <CircularProgress size={20} color="success" />
              ) : (
                <FaSave />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Cancel Changes">
            <IconButton onClick={onCancel} color="error" disabled={isSaving}>
              <FaTimes />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default LeadEditControls;
