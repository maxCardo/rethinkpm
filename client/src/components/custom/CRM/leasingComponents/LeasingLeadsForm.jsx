import { useState } from "react";
import TextField from "../../profile/addLead/InputFields/TextField";
import Select from "react-select";
import { Button, TextareaAutosize } from "@mui/material";
import LeasingFormPhoneField from "./LeasingFormPhoneField";
import { FaPlus } from "react-icons/fa";

const LeasingLeadsLeads = () => {
  const NUMBER_FIELD_OBJECT = { number: "", isPrimary: false, okToText: true };
  const [phoneFileds, setPhoneFields] = useState([{ ...NUMBER_FIELD_OBJECT }]);

  const addPhoneField = () => {
    let _phoneFieldsCopy = [...phoneFileds];
    let _newPhoneNumber = { ...NUMBER_FIELD_OBJECT };

    _phoneFieldsCopy.push(_newPhoneNumber);

    setPhoneFields(_phoneFieldsCopy);
  };

  return (
    <form className="flex flex-col gap-3">
      {/* Lead contact info */}
      <div className="contact-info w-100 h-100 flex flex-col justify-between gap-3">
        <div className="contact-info-name d-flex gap-3">
          <TextField
            field={{ name: "First Name", accessor: "firstName" }}
            withLabel={false}
            col={3}
          />
          <TextField
            field={{ name: "Last Name", accessor: "lastName" }}
            withLabel={false}
            col={3}
          />
          <TextField
            field={{ name: "Email", accessor: "email" }}
            withLabel={false}
            col={5}
            type="email"
          />
        </div>
        <div className="contact-info-phone ">
          <div className="flex flex-col">
            {phoneFileds.map((item, index) => (
              <div className="flex">
                <LeasingFormPhoneField
                  isPrimary={index === 0 ? true : false}
                  isOkToText={true}
                />
                {index === 0 && (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<FaPlus size={"0.8rem"} />}
                    style={{ textTransform: "none" }}
                    onClick={() => addPhoneField()}
                  >
                    Add Number
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Location info */}
      <div className="location-info flex items-center">
        <TextField
          field={{ name: "Address", accessor: "address" }}
          withLabel={false}
          col={5}
        />
        <Select
          className="marketplace__filter-select"
          defaultValue="All"
          placeholder="State"
        />
        <TextField
          field={{ name: "Zip Code", accessor: "zipCode" }}
          withLabel={false}
          col={3}
        />
      </div>
      {/* Lead Info */}
      <div className="lead-info-status flex ">
        <Select
          className="marketplace__filter-select"
          defaultValue="All"
          placeholder="Lead Temperature"
          style={{ width: "200px" }}
        />
        <Select
          className="marketplace__filter-select"
          defaultValue="All"
          placeholder="Lead Source"
        />
        <Select
          className="marketplace__filter-select"
          defaultValue="All"
          placeholder="Lead Owner"
        />
      </div>
      <div className="lead-info-date flex gap-3">
        <TextField
          field={{ name: "Last Contact (date)", accessor: "lastContact" }}
          withLabel={false}
          col={5}
        />
        <TextField
          field={{ name: "Next Action (date)", accessor: "nextAction" }}
          withLabel={false}
          col={5}
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
