import CustomInput from "../../../ui/CustomInput/CustomInput";
import { useEffect } from "react";
import { capitalizeFirstLetter } from "../../../../util/commonFunctions";
import { useState } from "react";
import dayjs from "dayjs";
import settings from "../../../../settings.json";

const LeadNextAction = ({
  selectedLeadItem,
  isEditMode = false,
  updatedLeadStatus,
  onNextActionChange,
}) => {
  const SETTINGS = settings.routes.leaseLead;

  //  Action types available for future implementation
  const actionTypesOpt = {
    contact: "contact",
    scheduleTour: "schedule Tour",
    performTour: "perform Tour",
    apply: "apply",
  };

  const [nextActionData, setNextActionData] = useState({
    nextActionDate: selectedLeadItem.nextActionDate,
    nextActionType: actionTypesOpt.contact,
  });

  // Send nextActionData to parent when it changes
  useEffect(() => {
    if (onNextActionChange) {
      onNextActionChange(nextActionData);
    }
  }, [nextActionData, onNextActionChange]);

  useEffect(() => {
    if (updatedLeadStatus) {
      const tomorrow = dayjs().add(1, "day").toDate();
      let newActionType = actionTypesOpt.contact;
      let newActionDate = selectedLeadItem.nextActionDate;

      switch (updatedLeadStatus) {
        case SETTINGS.statusOptions.new:
          newActionType = actionTypesOpt.contact;
          break;
        case SETTINGS.statusOptions.inProgress:
          newActionType = actionTypesOpt.scheduleTour;
          // Set next action date to tomorrow when status becomes inProgress or toured
          newActionDate = tomorrow;
          break;
        case SETTINGS.statusOptions.tourPending:
          newActionType = actionTypesOpt.performTour;
          break;
        case SETTINGS.statusOptions.toured:
          newActionType = actionTypesOpt.apply;
          // Set next action date to tomorrow when status becomes inProgress or toured
          newActionDate = tomorrow;
          break;
        default:
          // Default - current nextActionDate date and empty action type
          newActionDate = selectedLeadItem.nextActionDate;
          newActionType = "N/A";
          break;
      }

      // Update the nextActionData state
      setNextActionData({
        nextActionDate: newActionDate,
        nextActionType: newActionType,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedLeadStatus]);

  const handleActionDateChange = (event) => {
    const inputValue = event.target.value; // This will be in YYYY-MM-DD format from date input

    let newDate;
    if (inputValue) {
      // Create a new Date object from the input value
      const dateObject = new Date(inputValue);
      // Save the date as a Date object (this will be converted to string when sent to server)
      newDate = dateObject;
    } else {
      // Handle empty/cleared date
      newDate = null;
    }

    // Update the nextActionData state
    setNextActionData((prevData) => ({
      ...prevData,
      nextActionDate: newDate,
    }));
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
              ? formatDateForInput(nextActionData.nextActionDate)
              : formatDateForDisplay(nextActionData.nextActionDate)
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
            placeholder={capitalizeFirstLetter(nextActionData.nextActionType)}
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
