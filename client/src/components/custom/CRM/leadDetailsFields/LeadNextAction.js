import CustomInput from "../../../ui/CustomInput/CustomInput";
import { capitalizeFirstLetter } from "../../../../util/commonFunctions";

const LeadNextAction = ({ selectedLeadItem, isEditMode = false }) => {
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

  return (
    <div className="lead-next-action__wrapper">
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
          value={new Date(selectedLeadItem.nextAction).toLocaleString()}
          readonly={true}
        />
        {/* Next Action Type */}
        <div style={{ width: "20vw" }}>
          <CustomInput
            inputId={"nextActionType"}
            label={"Next Action Type"}
            inputStyle={{ width: "20vw" }}
            placeholder={capitalizeFirstLetter("contact")}
            readonly={true}
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
