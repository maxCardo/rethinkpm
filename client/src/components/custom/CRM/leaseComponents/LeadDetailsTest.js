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

  const handleLeadInfoChange = (leadInfoData) => {
    if (isEditMode) {
      console.log("Lead info data received from child:", leadInfoData);
      // Here you can do whatever you need with the leadInfoData
      // For example, store it in state, send it to an API, etc.
    }
  };

  const handleContactInfoChange = (contactInfoData) => {
    if (isEditMode) {
      console.log("Contact info data received from child:", contactInfoData);
      // Here you can do whatever you need with the contactInfoData
      // For example, store it in state, send it to an API, etc.
    }
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
            onContactInfoChange={handleContactInfoChange}
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
          />
        </div>
      </div>
      {/* PropertyCondition */}
    </div>
  );
};

export default LeadDetailsTest;
