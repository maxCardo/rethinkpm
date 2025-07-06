import CustomInput from "../../../../ui/CustomInput/CustomInput";

const ContactInfo = ({ selectedLeadItem }) => {
  return (
    <div>
      <div className="contact-info_title text-2xl mb-3">
        Contact Information
      </div>
      {/* First Name */}
      <div className="flex flex-row w-full justify-between">
        <CustomInput
          inputId={"firstName"}
          label={"First Name"}
          inputStyle={{ width: "20vw" }}
          value={selectedLeadItem.firstName}
          readonly={true}
        />
        {/* Last Name */}
        <CustomInput
          inputId={"lastName"}
          label={"Last Name"}
          inputStyle={{ width: "20vw" }}
          value={selectedLeadItem.lastName}
          readonly={true}
        />
      </div>
      {/* Email */}
      {Array.isArray(selectedLeadItem.email) &&
        selectedLeadItem.email.length > 0 && (
          <div className="flex flex-col w-full mb-2">
            {selectedLeadItem.email.map((em, idx) => (
              <CustomInput
                key={`email-${idx}`}
                inputId={`email-${idx}`}
                label={`Email${
                  selectedLeadItem.email.length > 1 ? ` #${idx + 1}` : ""
                }`}
                inputStyle={{ width: "100%" }}
                value={em.address}
                readonly={true}
              />
            ))}
          </div>
        )}
      {/* Phone Numbers */}
      {Array.isArray(selectedLeadItem.phoneNumbers) &&
        selectedLeadItem.phoneNumbers.length > 0 && (
          <div className="flex flex-col w-full mb-2">
            {selectedLeadItem.phoneNumbers.map((ph, idx) => (
              <CustomInput
                key={`phone-${idx}`}
                inputId={`phone-${idx}`}
                label={`Phone${
                  selectedLeadItem.phoneNumbers.length > 1 ? ` #${idx + 1}` : ""
                }`}
                inputStyle={{ width: "100%" }}
                value={ph.number}
                readonly={true}
              />
            ))}
          </div>
        )}
    </div>
  );
};

export default ContactInfo;
