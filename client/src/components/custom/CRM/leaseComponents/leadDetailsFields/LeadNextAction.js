import CustomInput from "../../../../ui/CustomInput/CustomInput";
import CustomReactSelect from "../../../../ui/CustomReactSelect";
import { capitalizeFirstLetter } from "../../../../../util/commonFunctions";

const LeadNextAction = ({ selectedLeadItem }) => {
  const actionTypesValues = [
    "contact",
    "scheduleTour",
    "performTour",
    "apply",
    "",
  ];
  const actionTypes = actionTypesValues.map((value) => ({
    label: capitalizeFirstLetter(value.replace(/([A-Z])/g, " $1")),
    value,
  }));
  const contactByValues = ["call", "email", "sms", ""];

  const contactByOptions = contactByValues.map((value) => ({
    label: capitalizeFirstLetter(value.replace(/([A-Z])/g, " $1")),
    value,
  }));

  const nextAction = {
    actionDate: new Date(),
    actionType: "contact",
    contactBy: "",
  };

  return (
    <div className="lead-next-action">
      {/* Title */}
      <div className="lead-next-action__title text-2xl mb-3">
        Lead Next Action
      </div>
      <div className="lead-next-action__content flex flex-wrap gap-2">
        {/* Next Action Date */}
        <CustomInput
          inputId={"nextActionDate"}
          label={"Next Action Date"}
          inputStyle={{ width: "20vw" }}
          value={new Date(nextAction.actionDate).toLocaleString()}
          readonly={true}
        />
        {/* Next Action Type */}
        <div style={{ width: "20vw" }}>
          <CustomReactSelect
            options={actionTypes}
            label={"Next Action Type"}
            // value={selectedLeadItem.status}
            placeholder={capitalizeFirstLetter(nextAction.actionType)}
            isDisabled={true}
          />
        </div>
        {/* Next Action Contact By */}
        <div style={{ width: "20vw" }}>
          <CustomReactSelect
            options={contactByOptions}
            label={"Contact By"}
            // value={selectedLeadItem.status}
            placeholder={capitalizeFirstLetter(nextAction.contactBy)}
            isDisabled={true}
          />
        </div>
        {/* Last Contact */}
        <CustomInput
          inputId={"lastContact"}
          label={"Last Contact"}
          inputStyle={{ width: "20vw" }}
          value={new Date(selectedLeadItem.createDate).toLocaleString()}
          readonly={true}
        />
      </div>
    </div>
  );
};

export default LeadNextAction;
