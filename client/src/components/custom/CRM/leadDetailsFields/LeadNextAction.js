import CustomInput from "../../../ui/CustomInput/CustomInput";
import CustomReactSelect from "../../../ui/CustomReactSelect";
import { useEffect } from "react";
import { capitalizeFirstLetter, getFormattedDate } from "../../../../util/commonFunctions";
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
  const actionTypesOpt = SETTINGS.nextActionTypeOptions;

  // Convert action types to options format for CustomReactSelect
  const actionTypeOptions = Object.values(actionTypesOpt).map((value) => ({
    label: capitalizeFirstLetter(value.replace(/([A-Z])/g, " $1")),
    value,
  }));

  // Helper function to find the selected option object
  const getSelectedOption = (options, value) => {
    return options.find((option) => option.value === value) || null;
  };

  const [nextActionData, setNextActionData] = useState({
    nextActionDate: selectedLeadItem.nextActionDate,
    nextActionType: selectedLeadItem.nextActionType,
  });

  // Send nextActionData to parent when it changes
  useEffect(() => {
    if (onNextActionChange) {
      onNextActionChange(nextActionData);
    }
  }, [nextActionData, onNextActionChange]);

  const handleActionTypeChange = (selected) => {
    setNextActionData((prevData) => ({
      ...prevData,
      nextActionType: selected.value,
    }));
  };

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
          newActionType = "";
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
  const formatDateForRead = (date) => {
    if (!date) return "";
    const dateObj = new Date(date);
    return dateObj.toLocaleString();
  };


  return (
    <div className="lead-next-action__wrapper">
      {/* Title */}
      <div className="lead-next-action__title text-2xl mb-3">
        Lead Next Action
      </div>
      <div className="lead-next-action__content">
        <div className="flex flex-row w-full gap-2">
          {/* Next Action Date */}
          <CustomInput
            inputId={"nextActionDate"}
            label={"Next Action Date"}
            inputStyle={{ width: "100%" }}
            value={
              isEditMode
                ? getFormattedDate(nextActionData.nextActionDate).ISO
                : formatDateForRead(nextActionData.nextActionDate)
            }
            readonly={!isEditMode}
            type={isEditMode ? "date" : "text"}
            onChange={handleActionDateChange}
          />
          {/* Next Action Type */}
          <div style={{ width: "100%" }}>
            <CustomReactSelect
              options={actionTypeOptions}
              label={"Next Action Type"}
              value={getSelectedOption(
                actionTypeOptions,
                nextActionData.nextActionType
              )}
              isDisabled={!isEditMode}
              onChange={handleActionTypeChange}
              placeholder="Select Action Type"
            />
          </div>
        </div>
        <div className="flex flex-row w-full gap-2 mt-2">
          {/* Last Contact */}
          <CustomInput
            inputId={"lastContact"}
            label={"Last Contact"}
            inputStyle={{ width: "100%" }}
            value={new Date(selectedLeadItem.createDate).toLocaleString()}
            readonly={true}
          />
          {/* Placeholder for future field or leave empty for now */}
          <div style={{ width: "100%" }} />
        </div>
      </div>
    </div>
  );
};

export default LeadNextAction;
