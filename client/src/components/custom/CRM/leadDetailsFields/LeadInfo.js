import CustomReactSelect from "../../../ui/CustomReactSelect";
import { capitalizeFirstLetter } from "../../../../util/commonFunctions";
import { Chip } from "@mui/material";
import CustomInput from "../../../ui/CustomInput/CustomInput";
import settings from "../../../../settings.json";
import { useEffect, useState } from "react";
import axios from "axios";

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
    reasonForLoss: selectedLeadItem.reasonForLoss,
    leadOwner: selectedLeadItem.leadOwner,
  });
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

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

  const reasonForLossValues = Object.values(SETTINGS.reasonForLossOptions);
  const reasonForLossOpt = reasonForLossValues.map((value) => ({
    label: capitalizeFirstLetter(value.replace(/([A-Z])/g, " $1")),
    value,
  }));

  // Convert users to options format for CustomReactSelect
  const userOptions = [
    { label: "System", value: "System" },
    ...users.map((user) => ({
      label: user.name,
      value: user.name,
    })),
  ];
  // End of option conversion

  // Helper function to find the selected option object
  const getSelectedOption = (options, value) => {
    return options.find((option) => option.value === value) || null;
  };

  const handleStatusChange = (selected) => {
    statusChangeEffect(selected.value);
    setLeadInfoData((prevData) => ({ ...prevData, status: selected.value }));
  };

  const handleLeadTempChange = (tempValue) => {
    setLeadInfoData((prevData) => ({
      ...prevData,
      leadTemperature: tempValue,
    }));
  };

  const handleReasonForLossChange = (selected) => {
    setLeadInfoData((prevData) => ({
      ...prevData,
      reasonForLoss: selected.value,
    }));
  };

  const handleLeadOwnerChange = (selected) => {
    setLeadInfoData((prevData) => ({
      ...prevData,
      leadOwner: selected.value,
    }));
  };

  // Function to fetch all users
  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const response = await axios.get("/api/users/all");
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  };

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const statusChangeEffect = (selectedStatusVal) => {
    switch (selectedStatusVal) {
      case SETTINGS.statusOptions.tourPending:
        // If tour is pendign - changed the leadTemperature to "hot" by default
        handleLeadTempChange(SETTINGS.temperatureOptions.hot);
        break;
      default:
        // Default - current leadTemperature
        handleLeadTempChange(selectedLeadItem.leadTemperature);
        break;
    }

    // Clear reason for loss when status is not 'lost'
    if (selectedStatusVal !== SETTINGS.statusOptions.lost) {
      setLeadInfoData((prevData) => ({
        ...prevData,
        reasonForLoss: "",
      }));
    }
  };

  useEffect(() => {
    // Send leadInfoData to parent when it changes
    if (onLeadInfoChange) {
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
                  size="small"
                  color={
                    st.value === leadInfoData.status ? "primary" : "default"
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
            placeholder={capitalizeFirstLetter(
              selectedLeadItem.leadTemperature
            )}
            isDisabled={!isEditMode}
            onChange={handleLeadTempChange}
          />
        </div>
        {/* Reason for Loss - only show when status is 'lost' */}
        {leadInfoData.status === SETTINGS.statusOptions.lost && (
          <div style={{ width: "20vw" }}>
            <CustomReactSelect
              options={reasonForLossOpt}
              label={"Reason for Loss"}
              value={getSelectedOption(
                reasonForLossOpt,
                leadInfoData.reasonForLoss
              )}
              isDisabled={!isEditMode}
              onChange={handleReasonForLossChange}
            />
          </div>
        )}
        {/* Lead Source */}
        <CustomInput
          inputId={"leadSource"}
          label={"Lead Source"}
          inputStyle={{ width: "20vw" }}
          value={selectedLeadItem.leadSource}
          readonly={true}
        />
        {/* Lead Owner */}
        <div style={{ width: "20vw" }}>
          <CustomReactSelect
            options={userOptions}
            label={"Lead Owner"}
            value={getSelectedOption(userOptions, leadInfoData.leadOwner)}
            isDisabled={!isEditMode || loadingUsers}
            onChange={handleLeadOwnerChange}
            placeholder={
              loadingUsers ? "Loading users..." : "Select Lead Owner"
            }
          />
        </div>
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
