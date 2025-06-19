import TextField from "../../profile/addLead/InputFields/TextField";
import Select from "react-select";
import { TextareaAutosize } from "@mui/material";
import MaterialCheckbox from "../../profile/addLead/InputFields/MaterialCheckbox";

const LeasingLeadsLeads = () => {
  //  first name
  // last name
  // email
  // phone numbers (input + 2 checkbox)
  // listing address
  // status
  // lead temp
  // lead owner (select?)
  // lead source (select?)
  // lastContact (calendar)
  // nextAction (calendar)
  // notes (text area)

  return (
    <form>
      {/* Lead contact info */}
      <div className="contact-info w-100 h-100 flex flex-col justify-between">
        <div className="contact-info-name d-flex mb-3">
          <TextField
            field={{ name: "First Name", accessor: "firstName" }}
            withLabel={false}
            col={4}
          />
          <TextField
            field={{ name: "Last Name", accessor: "lastName" }}
            withLabel={false}
            col={4}
          />
          <TextField
            field={{ name: "Email", accessor: "email" }}
            withLabel={false}
            col={4}
            type="email"
          />
        </div>
        <div className="contact-info-phone flex mb-3">
          <TextField
            field={{ name: "Phone", accessor: "phoneNumbers" }}
            withLabel={false}
            col={4}
            type="tel"
          />
          <div className="ml-10 mt-auto"></div>
          <MaterialCheckbox label={"Primary"} />
          <MaterialCheckbox label={"Ok to text"} />
        </div>
      </div>
      {/* Location info */}
      <div className="location-info flex mb-3 items-center">
        <TextField
          field={{ name: "Address", accessor: "address" }}
          withLabel={false}
          col={4}
        />
        <Select
          className="marketplace__filter-select"
          // onChange={handleFieldChange}
          defaultValue="All"
          // options={FIELDS}
          placeholder="State"
        />
        <TextField
          field={{ name: "Zip Code", accessor: "zipCode" }}
          withLabel={false}
          col={3}
        />
      </div>
      {/* Lead Info */}
      <div className="lead-info-status flex mb-3">
        <Select
          className="marketplace__filter-select"
          // onChange={handleFieldChange}
          defaultValue="All"
          // options={FIELDS}
          placeholder="Lead Temperature"
        />
        <Select
          className="marketplace__filter-select"
          // onChange={handleFieldChange}
          defaultValue="All"
          // options={FIELDS}
          placeholder="Lead Source"
        />
        <Select
          className="marketplace__filter-select"
          // onChange={handleFieldChange}
          defaultValue="All"
          // options={FIELDS}
          placeholder="Lead Owner"
        />
      </div>
      <div className="lead-info-date flex mb-3">
        <TextField
          field={{ name: "Last Contact (date)", accessor: "lastContact" }}
          withLabel={false}
          col={6}
        />
        <TextField
          field={{ name: "Next Action (date)", accessor: "nextAction" }}
          withLabel={false}
          col={6}
        />
      </div>
      <div className="lead-notes">
        <TextareaAutosize
          placeholder={" Write your notes here ...."}
          className="w-100"
          minRows={5}
          maxRows={5}
          style={{ border: "1px solid lightgrey" }}
        />
      </div>
    </form>
  );
};

export default LeasingLeadsLeads;
