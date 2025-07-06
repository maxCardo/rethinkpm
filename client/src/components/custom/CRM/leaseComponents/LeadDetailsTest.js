import ContactInfo from "./leadDetailsFields/ContactInfo";
import LeadInfo from "./leadDetailsFields/LeadInfo";
import LeadNotes from "./leadDetailsFields/LeadNotes";
import LeadNextAction from "./leadDetailsFields/LeadNextAction";
import LeadEditControls from "./leadDetailsFields/LeadEditControls";
import { Divider } from "@mui/material";
import { useState } from "react";

const LeadDetailsTest = ({ selectedLeadItem }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleToggleEdit = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSave = () => {
    // TODO: Implement save logic
    console.log("Saving changes...");
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setIsEditMode(false);
  };
  return (
    <div className="lead-details relative flex flex-col gap-5 px-2 h-auto">
      {/* Edit Controls */}
      <LeadEditControls
        isEditMode={isEditMode}
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
          />
        </div>
        {/* Next Action */}
        <div className="lead-next-action flex-1/2">
          <LeadNextAction
            selectedLeadItem={selectedLeadItem}
            isEditMode={isEditMode}
          />
        </div>
      </div>
      {/* PropertyCondition */}
    </div>
  );
};

export default LeadDetailsTest;
