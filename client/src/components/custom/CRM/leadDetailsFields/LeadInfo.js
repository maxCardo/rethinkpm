import CustomReactSelect from "../../../ui/CustomReactSelect";
import { capitalizeFirstLetter } from "../../../../util/commonFunctions";
import { Chip } from "@mui/material";
import CustomInput from "../../../ui/CustomInput/CustomInput";
import settings from "../../../../settings.json";
import { useEffect, useState } from "react";

const LeadInfo = ({
  selectedLeadItem,
  isEditMode = false,
  onLeadInfoChange,
}) => {
  const SETTINGS = settings.routes.leaseLead;

  const [leadInfoData, setLeadInfoData] = useState({
    // Deault values - from server
    status: selectedLeadItem.status,
    leadTemperature: selectedLeadItem.leadTemperature,
  });

  // Take status and temperature options from settings
  // Turn them to an strings array (from object)
  // Create new object array with 'label' and 'value'
  const statusValues = Object.values(SETTINGS.statusOptions);
  const statusOpt = statusValues.map((value) => ({
    label: capitalizeFirstLetter(value.replace(/([A-Z])/g, " $1")),
    value,
  }));

  const tempValues = Object.values(SETTINGS.temperatureOptions);
  const temperatureOpt = tempValues.map((value) => ({
    label: capitalizeFirstLetter(value.replace(/([A-Z])/g, " $1")),
    value,
  }));
  // End of option conversion

  // Helper function to find the selected option object
  const getSelectedOption = (options, value) => {
    return options.find((option) => option.value === value) || null;
  };

  const handleStatusChange = (selected) => {
    setLeadInfoData((prevData) => ({ ...prevData, status: selected.value }));
  };

  const handleLeadTempChange = (tempValue) => {
    setLeadInfoData((prevData) => ({
      ...prevData,
      leadTemperature: tempValue,
    }));
  };

  const handleLeadStatusChange = (selectedStatus) => {
    switch (selectedStatus) {
      case SETTINGS.statusOptions.tourPending:
        // If tour is pendign - changed the leadTemperature to "hot" by default
        handleLeadTempChange(SETTINGS.temperatureOptions.hot);
        break;
      default:
        handleLeadTempChange(selectedLeadItem.leadTemperature);
        break;
    }
  };

  useEffect(() => {
    // Send leadInfoData to parent when it changes
    if (onLeadInfoChange) {
      handleLeadStatusChange(leadInfoData.status);
      onLeadInfoChange(leadInfoData);
    }
    // eslint-disable-next-line
  }, [leadInfoData, onLeadInfoChange]);

  return (
    <div className="lead-info__wrapper">
      {/* Title */}
      <div className="lead-info__title text-2xl mb-3">Lead Information</div>
      {/* Content */}
      {/* flex-wrap gap-2 */}
      <div className="lead-info__content flex justify-between flex-wrap gap-2">
        {/* Lead Status */}
        <div className="lead-info-status">
          <div style={{ width: "20vw" }}>
            <CustomReactSelect
              options={statusOpt}
              label={"Status"}
              value={getSelectedOption(statusOpt, leadInfoData.status)}
              isDisabled={!isEditMode}
              onChange={handleStatusChange}
            />
          </div>
          <div
            className="lead-status-chip mt-2 flex flex-wrap gap-1"
            style={{ width: "20vw" }}
          >
            {statusOpt.map((st, index) => {
              return (
                <Chip
                  key={index}
                  color={
                    st.value === selectedLeadItem.status ? "primary" : "default"
                  }
                  label={st.label}
                />
              );
            })}
          </div>
        </div>
        {/* Lead Temperature */}
        <div style={{ width: "20vw" }}>
          <CustomReactSelect
            options={temperatureOpt}
            label={"Lead Temperature"}
            value={getSelectedOption(
              temperatureOpt,
              leadInfoData.leadTemperature
            )}
            placeholder={capitalizeFirstLetter(
              selectedLeadItem.leadTemperature
            )}
            isDisabled={!isEditMode}
            onChange={handleLeadTempChange}
          />
        </div>
        {/* Lead Source */}
        <CustomInput
          inputId={"leadSource"}
          label={"Lead Source"}
          inputStyle={{ width: "20vw" }}
          value={selectedLeadItem.leadSource}
          readonly={true}
        />
        {/* Lead Owner */}
        <CustomInput
          inputId={"leadOwner"}
          label={"Lead Owner"}
          inputStyle={{ width: "20vw" }}
          value={selectedLeadItem.leadOwner}
          readonly={true}
        />
        {/* Create Date */}
        <CustomInput
          inputId={"createDate"}
          label={"Create Date"}
          inputStyle={{ width: "20vw" }}
          value={
            selectedLeadItem.createDate
              ? new Date(selectedLeadItem.createDate).toLocaleString()
              : ""
          }
          readonly={true}
        />
        {/* Last Update */}
        <CustomInput
          inputId={"updateDate"}
          label={"Last Update"}
          inputStyle={{ width: "20vw" }}
          value={
            selectedLeadItem.updateDate
              ? new Date(selectedLeadItem.updateDate).toLocaleString()
              : ""
          }
          readonly={true}
        />
      </div>
    </div>
  );
};

export default LeadInfo;
