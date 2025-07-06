import CustomReactSelect from "../../../../ui/CustomReactSelect";
import { capitalizeFirstLetter } from "../../../../../util/commonFunctions";
import { Chip } from "@mui/material";

const LeadInfo = ({ selectedLeadItem }) => {
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
  return (
    <div className="lead-info">
      {/* Title */}
      <div className="lead-info__title text-2xl mb-3">Lead Information</div>
      <div className="lead-info__content">
        <div style={{ width: "20vw", marginTop: 16 }}>
          <CustomReactSelect
            options={status}
            label={"Status"}
            value={selectedLeadItem.status}
            placeholder={capitalizeFirstLetter(selectedLeadItem.status)}
            isDisabled={true}
          />
          <div className="lead-status-chip mt-2 flex flex-wrap gap-1">
            {status.map((st, index) => {
              return (
                <Chip
                  key={index}
                  color={
                    st.value === selectedLeadItem.status ? "primary" : "default"
                  }
                  label={st.label}
                  variant="outlined"
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadInfo;
