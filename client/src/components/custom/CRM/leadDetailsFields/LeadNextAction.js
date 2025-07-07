import { useEffect } from "react";
import CustomInput from "../../../ui/CustomInput/CustomInput";
import { capitalizeFirstLetter } from "../../../../util/commonFunctions";
import { useState } from "react";
import dayjs from "dayjs";
import settings from "../../../../settings.json";

const LeadNextAction = ({
  selectedLeadItem,
  isEditMode = false,
  updatedLeadStatus,
}) => {
  const SETTINGS = settings.routes.leaseLead;

  const [nextActionDate, setNextActionDate] = useState(
    selectedLeadItem.nextAction
  );

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

  useEffect(() => {
    console.log("status has changed?", updatedLeadStatus);
    if (updatedLeadStatus) {
      switch (updatedLeadStatus) {
        case SETTINGS.statusOptions.inProgress:
          // Set next action date to tomorrow when status becomes inProgress
          const tomorrow = dayjs().add(1, "day").toDate();
          setNextActionDate(tomorrow);
          break;

        default:
          setNextActionDate(selectedLeadItem.nextAction);

          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedLeadStatus]);

  const handleActionDateChange = (event) => {
    const inputValue = event.target.value; // This will be in YYYY-MM-DD format from date input

    if (inputValue) {
      // Create a new Date object from the input value
      const dateObject = new Date(inputValue);
      // Save the date as a Date object (this will be converted to string when sent to server)
      setNextActionDate(dateObject);
    } else {
      // Handle empty/cleared date
      setNextActionDate(null);
    }
  };

  // Helper function to format date for display
  const formatDateForDisplay = (date) => {
    if (!date) return "";
    const dateObj = new Date(date);
    return dateObj.toLocaleString();
  };

  // Helper function to format date for input (YYYY-MM-DD)
  const formatDateForInput = (date) => {
    if (!date) return "";
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return "";
    return dayjs(dateObj).format("YYYY-MM-DD");
  };

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
          value={
            isEditMode
              ? formatDateForInput(nextActionDate)
              : formatDateForDisplay(nextActionDate)
          }
          readonly={!isEditMode}
          type={isEditMode ? "date" : "text"}
          onChange={handleActionDateChange}
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
