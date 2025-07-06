import { useState, useEffect } from "react";
import CustomInput from "../../../../ui/CustomInput/CustomInput";
import { FaPlus } from "react-icons/fa";

const ContactInfo = ({
  selectedLeadItem,
  isEditMode = false,
  onContactInfoChange,
}) => {
  // Default values from the server
  const { firstName, lastName, fullName, email, phoneNumbers } =
    selectedLeadItem;
  const [contactInfoData, setContactInfoData] = useState({
    firstName,
    lastName,
    fullName,
    email,
    phoneNumbers,
  });

  // Handle input changes
  const handleInputChange = (field, value) => {
    setContactInfoData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleEmailChange = (index, value) => {
    setContactInfoData((prevData) => {
      const updatedEmail = [...prevData.email];
      updatedEmail[index] = { ...updatedEmail[index], address: value };
      return { ...prevData, email: updatedEmail };
    });
  };

  const handlePhoneChange = (index, value) => {
    setContactInfoData((prevData) => {
      const updatedPhones = [...prevData.phoneNumbers];
      updatedPhones[index] = { ...updatedPhones[index], number: value };
      return { ...prevData, phoneNumbers: updatedPhones };
    });
  };

  // Add new email field
  const handleAddEmail = () => {
    setContactInfoData((prevData) => ({
      ...prevData,
      email: [...prevData.email, { address: "", isPrimary: false }],
    }));
  };

  // Add new phone number field
  const handleAddPhone = () => {
    setContactInfoData((prevData) => ({
      ...prevData,
      phoneNumbers: [
        ...prevData.phoneNumbers,
        { number: "", isPrimary: false },
      ],
    }));
  };

  // Send contactInfoData to parent when it changes
  useEffect(() => {
    if (onContactInfoChange) {
      onContactInfoChange(contactInfoData);
    }
  }, [contactInfoData, onContactInfoChange]);

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
          value={contactInfoData.firstName}
          readonly={!isEditMode}
          onChange={(e) => handleInputChange("firstName", e.target.value)}
        />
        {/* Last Name */}
        <CustomInput
          inputId={"lastName"}
          label={"Last Name"}
          inputStyle={{ width: "20vw" }}
          value={contactInfoData.lastName}
          readonly={!isEditMode}
          onChange={(e) => handleInputChange("lastName", e.target.value)}
        />
      </div>
      {/* Email */}
      {Array.isArray(contactInfoData.email) &&
        contactInfoData.email.length > 0 && (
          <div className="flex flex-col w-full">
            {contactInfoData.email.map((em, idx) => (
              <CustomInput
                key={`email-${idx}`}
                inputId={`email-${idx}`}
                label={`Email${
                  contactInfoData.email.length > 1 ? ` #${idx + 1}` : ""
                }`}
                inputStyle={{ width: "100%" }}
                value={em.address}
                readonly={!isEditMode}
                onChange={(e) => handleEmailChange(idx, e.target.value)}
                appendIcon={isEditMode && idx === 0 ? <FaPlus /> : null}
                onAppendClick={idx === 0 ? handleAddEmail : null}
              />
            ))}
          </div>
        )}
      {/* Phone Numbers */}
      {Array.isArray(contactInfoData.phoneNumbers) &&
        contactInfoData.phoneNumbers.length > 0 && (
          <div className="flex flex-col w-full mb-2">
            {contactInfoData.phoneNumbers.map((ph, idx) => (
              <CustomInput
                key={`phone-${idx}`}
                inputId={`phone-${idx}`}
                label={`Phone${
                  contactInfoData.phoneNumbers.length > 1 ? ` #${idx + 1}` : ""
                }`}
                inputStyle={{ width: "100%" }}
                value={ph.number}
                readonly={!isEditMode}
                onChange={(e) => handlePhoneChange(idx, e.target.value)}
                appendIcon={isEditMode && idx === 0 ? <FaPlus /> : null}
                onAppendClick={idx === 0 ? handleAddPhone : null}
              />
            ))}
          </div>
        )}
    </div>
  );
};

export default ContactInfo;
