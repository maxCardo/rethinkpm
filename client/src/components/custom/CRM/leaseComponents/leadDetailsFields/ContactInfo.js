import CustomInput from "../../../../ui/CustomInput/CustomInput";

const ContactInfo = ({ selectedLeadItem, isEditMode = false }) => {
  return (
    <div className="contact-info__wrapper">
      <div className="contact-info__title text-2xl mb-3">
        Contact Information
      </div>
      <div className="contact-info__content flex flex-row w-full justify-between">
        {/* First Name */}
        <CustomInput
          inputId={"firstName"}
          label={"First Name"}
          inputStyle={{ width: "20vw" }}
          value={selectedLeadItem.firstName}
          readonly={!isEditMode}
        />
        {/* Last Name */}
        <CustomInput
          inputId={"lastName"}
          label={"Last Name"}
          inputStyle={{ width: "20vw" }}
          value={selectedLeadItem.lastName}
          readonly={!isEditMode}
        />
      </div>
      {/* Email */}
      {Array.isArray(selectedLeadItem.email) &&
        selectedLeadItem.email.length > 0 && (
          <div className="flex flex-col w-full">
            {selectedLeadItem.email.map((em, idx) => (
              <CustomInput
                key={`email-${idx}`}
                inputId={`email-${idx}`}
                label={`Email${
                  selectedLeadItem.email.length > 1 ? ` #${idx + 1}` : ""
                }`}
                inputStyle={{ width: "100%" }}
                value={em.address}
                readonly={!isEditMode}
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
                readonly={!isEditMode}
              />
            ))}
          </div>
        )}
    </div>
  );
};

export default ContactInfo;
