import ContactInfo from "./leadDetailsFields/ContactInfo";
import LeadInfo from "./leadDetailsFields/LeadInfo";
import LeadNotes from "./leadDetailsFields/LeadNotes";
import LeadNextAction from "./leadDetailsFields/LeadNextAction";

const LeadDetailsTest = ({ selectedLeadItem }) => {
  return (
    <div className="lead-details flex flex-col gap-5 px-2 h-full">
      {/* Row 1 */}
      <div className="first-row flex w-full gap-5">
        {/* Contact Info */}
        <div className="contact-info flex-1/2">
          <ContactInfo selectedLeadItem={selectedLeadItem} />
        </div>
        {/* Lead Notes */}
        <div className="lead-notes flex-1/2">
          <LeadNotes selectedLeadItem={selectedLeadItem} />
        </div>
      </div>
      {/* Row 2 */}
      <div className="second-row mt-5 flex w-full gap-5">
        {/* Lead Info */}
        <div className="lead-info flex-1/2">
          <LeadInfo selectedLeadItem={selectedLeadItem} />
        </div>
        {/* Next Action */}
        <div className="lead-next-action flex-1/2">
          <LeadNextAction selectedLeadItem={selectedLeadItem} />
        </div>
      </div>
      {/* PropertyCondition */}
    </div>
  );
};

export default LeadDetailsTest;
