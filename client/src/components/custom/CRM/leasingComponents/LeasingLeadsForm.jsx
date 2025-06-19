import LeasingInput from "./LeasingInput";

const LeasingForm = () => {
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
          <LeasingInput
            inputComponent={1}
            placeholder={"Enter First Name"}
            className={"w-100"}
          />
          <LeasingInput
            inputComponent={1}
            placeholder={"Enter Last Name"}
            className={"w-100 mx-4"}
          />
          <LeasingInput
            inputComponent={1}
            placeholder={"Enter Email"}
            type="email"
            className={"w-100"}
          />
        </div>
        <div className="contact-info-phone flex mb-3">
          <LeasingInput
            inputComponent={1}
            placeholder={"Enter Phone Number"}
            type="tel"
          />
          <div className="ml-10"></div>
          <LeasingInput
            inputComponent={4}
            checkboxLabel={"Primary"}
            className={"mx-3"}
          />
          <LeasingInput
            inputComponent={4}
            checkboxLabel={"Ok to text"}
            className={"mx-3"}
          />
        </div>
      </div>
      {/* Location info */}
      <div className="location-info flex mb-3">
        <LeasingInput
          inputComponent={1}
          placeholder={"Enter Street Address"}
          className={"w-100"}
        />
        <LeasingInput
          inputComponent={1}
          placeholder={"Enter State"}
          className={"w-100 px-4"}
        />
        <LeasingInput
          inputComponent={1}
          placeholder={"Enter Zip Code"}
          className={"w-1 flex-1/2"}
        />
      </div>
      {/* Lead Info */}
      <div className="lead-info ">
        <div className="lead-info-status flex mb-3">
          <LeasingInput
            inputComponent={2}
            placeholder={"Lead Temperature"}
            className={"w-100"}
          />
          <LeasingInput
            inputComponent={2}
            placeholder={"Lead Source"}
            className={"w-100 px-4"}
          />
          <LeasingInput
            inputComponent={2}
            placeholder={"Lead Owner"}
            className={"w-100"}
          />
        </div>
        <div className="lead-info-date flex mb-3">
          <LeasingInput
            inputComponent={1}
            placeholder={"Last Contact (date)"}
          />
          <LeasingInput
            inputComponent={1}
            placeholder={"Next Action (date)"}
            className={"mx-4"}
          />
        </div>
      </div>
      <div className="lead-notes">
        <LeasingInput
          inputComponent={3}
          placeholder={" Write your notes here ...."}
          className={"w-100"}
        />
      </div>
    </form>
  );
};

export default LeasingForm;
