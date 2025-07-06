import CustomReactSelect from "../../../../ui/CustomReactSelect";
import { capitalizeFirstLetter } from "../../../../../util/commonFunctions";
import { Chip } from "@mui/material";
import CustomInput from "../../../../ui/CustomInput/CustomInput";

const LeadInfo = ({ selectedLeadItem, isEditMode = false }) => {
  const statusValues = [
    "new",
    "inProgress",
    "tourPending",
    "toured",
    "applied",
    "lost",
  ];
  const status = statusValues.map((value) => ({
    label: capitalizeFirstLetter(value.replace(/([A-Z])/g, " $1")),
    value,
  }));

  const tempValues = ["neutral", "hot", "warm", "cold", ""];
  const temperatures = tempValues.map((value) => ({
    label: capitalizeFirstLetter(value.replace(/([A-Z])/g, " $1")),
    value,
  }));

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
              options={status}
              label={"Status"}
              value={selectedLeadItem.status}
              placeholder={capitalizeFirstLetter(selectedLeadItem.status)}
              isDisabled={!isEditMode}
            />
          </div>
          <div
            className="lead-status-chip mt-2 flex flex-wrap gap-1"
            style={{ width: "20vw" }}
          >
            {status.map((st, index) => {
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
            options={temperatures}
            label={"Lead Temperature"}
            value={selectedLeadItem.status}
            placeholder={capitalizeFirstLetter(
              selectedLeadItem.leadTemperature
            )}
            isDisabled={!isEditMode}
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
