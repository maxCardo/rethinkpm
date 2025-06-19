import TextField from "../../profile/addLead/InputFields/TextField";
import MaterialCheckbox from "../../profile/addLead/InputFields/MaterialCheckbox";

const LeasingFormPhoneField = ({ isPrimary, isOkToText }) => {
  return (
    <>
      <TextField
        field={{ name: "Phone", accessor: "phoneNumbers" }}
        withLabel={false}
        col={4}
        type="tel"
      />
      <div className="ml-5 mt-auto"></div>
      <MaterialCheckbox label={"Primary"} checked={isPrimary} />
      <MaterialCheckbox label={"Ok to text"} checked={isOkToText} />
    </>
  );
};

export default LeasingFormPhoneField;
