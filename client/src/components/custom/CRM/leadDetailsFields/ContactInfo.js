import { useState, useEffect } from "react";
import CustomInput from "../../../ui/CustomInput/CustomInput";
import MaterialCheckbox from "../../../ui/MaterialCheckbox";
import { FaPlus } from "react-icons/fa";

const ContactInfo = ({
  selectedLeadItem,
  isEditMode = false,
  onContactInfoChange,
  validationErrors = {},
  clearValidationError,
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
    setContactInfoData((prevData) => {
      const updatedData = { ...prevData, [field]: value };

      // Automatically update fullName when firstName or lastName changes
      if (field === "firstName" || field === "lastName") {
        const firstName = field === "firstName" ? value : prevData.firstName;
        const lastName = field === "lastName" ? value : prevData.lastName;
        updatedData.fullName = `${firstName || ""} ${lastName || ""}`.trim();
      }

      return updatedData;
    });
  };

  const handleEmailChange = (index, value) => {
    setContactInfoData((prevData) => {
      const updatedEmail = [...prevData.email];
      updatedEmail[index] = { ...updatedEmail[index], address: value };
      return { ...prevData, email: updatedEmail };
    });

    // Clear validation error when user starts typing
    if (clearValidationError) {
      clearValidationError(`email_${index}`);
    }
  };

  const handlePhoneChange = (index, value) => {
    setContactInfoData((prevData) => {
      const updatedPhones = [...prevData.phoneNumbers];
      updatedPhones[index] = { ...updatedPhones[index], number: value };
      return { ...prevData, phoneNumbers: updatedPhones };
    });

    // Clear validation error when user starts typing
    if (clearValidationError) {
      clearValidationError(`phone_${index}`);
    }
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

  // Handle email primary checkbox change
  const handleEmailPrimaryChange = (index, checked) => {
    setContactInfoData((prevData) => {
      const updatedEmail = [...prevData.email];
      updatedEmail[index] = { ...updatedEmail[index], isPrimary: checked };
      return { ...prevData, email: updatedEmail };
    });
  };

  // Handle phone primary checkbox change
  const handlePhonePrimaryChange = (index, checked) => {
    setContactInfoData((prevData) => {
      const updatedPhones = [...prevData.phoneNumbers];
      updatedPhones[index] = { ...updatedPhones[index], isPrimary: checked };
      return { ...prevData, phoneNumbers: updatedPhones };
    });
  };

  // Send contactInfoData to parent when it changes
  useEffect(() => {
    if (onContactInfoChange) {
      onContactInfoChange(contactInfoData);
    }
  }, [contactInfoData, onContactInfoChange]);

  // Filter out empty fields when not in edit mode, but always show at least one field
  const getDisplayEmails = () => {
    if (isEditMode) {
      const emails = contactInfoData.email || [];
      // Always show at least one email field in edit mode
      return emails.length > 0 ? emails : [{ address: "", isPrimary: false }];
    }
    const filteredEmails = (contactInfoData.email || []).filter(
      (em) => em.address && em.address.trim() !== ""
    );
    // Always show at least one email field
    return filteredEmails.length > 0
      ? filteredEmails
      : [{ address: "", isPrimary: false }];
  };

  const getDisplayPhoneNumbers = () => {
    if (isEditMode) {
      const phones = contactInfoData.phoneNumbers || [];
      // Always show at least one phone field in edit mode
      return phones.length > 0 ? phones : [{ number: "", isPrimary: false }];
    }
    const filteredPhones = (contactInfoData.phoneNumbers || []).filter(
      (ph) => ph.number && ph.number.trim() !== ""
    );
    // Always show at least one phone field
    return filteredPhones.length > 0
      ? filteredPhones
      : [{ number: "", isPrimary: false }];
  };

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
      <div className="flex flex-col w-full">
        {getDisplayEmails().map((em, idx) => {
          // Get the original index for edit mode operations
          const originalIndex = isEditMode
            ? idx
            : contactInfoData.email.findIndex((email) => email === em);
          return (
            <div
              key={`email-container-${
                originalIndex >= 0 ? originalIndex : idx
              }`}
              className="flex flex-row items-end gap-3 w-full mb-2"
            >
              <div className="flex-1">
                <CustomInput
                  inputId={`email-${originalIndex >= 0 ? originalIndex : idx}`}
                  label={`Email${
                    getDisplayEmails().length > 1 ? ` #${idx + 1}` : ""
                  }`}
                  inputStyle={{ width: "100%" }}
                  value={em.address || ""}
                  placeholder={
                    !isEditMode && !em.address
                      ? "No email provided"
                      : "Enter email address"
                  }
                  readonly={!isEditMode}
                  onChange={(e) =>
                    handleEmailChange(
                      originalIndex >= 0 ? originalIndex : idx,
                      e.target.value
                    )
                  }
                  appendIcon={
                    isEditMode && idx === getDisplayEmails().length - 1 ? (
                      <FaPlus />
                    ) : null
                  }
                  onAppendClick={
                    idx === getDisplayEmails().length - 1
                      ? handleAddEmail
                      : null
                  }
                  hasError={
                    !!validationErrors[
                      `email_${originalIndex >= 0 ? originalIndex : idx}`
                    ]
                  }
                  errorMessage={
                    validationErrors[
                      `email_${originalIndex >= 0 ? originalIndex : idx}`
                    ] || ""
                  }
                />
              </div>
              <div className="flex-shrink-0 mb-1">
                <MaterialCheckbox
                  label="Primary"
                  checked={em.isPrimary || false}
                  disabled={!isEditMode}
                  onChange={(e) =>
                    handleEmailPrimaryChange(
                      originalIndex >= 0 ? originalIndex : idx,
                      e.target.checked
                    )
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
      {/* Phone Numbers */}
      <div className="flex flex-col w-full mb-2">
        {getDisplayPhoneNumbers().map((ph, idx) => {
          // Get the original index for edit mode operations
          const originalIndex = isEditMode
            ? idx
            : contactInfoData.phoneNumbers.findIndex((phone) => phone === ph);
          return (
            <div
              key={`phone-container-${
                originalIndex >= 0 ? originalIndex : idx
              }`}
              className="flex flex-row items-end gap-3 w-full mb-2"
            >
              <div className="flex-1">
                <CustomInput
                  inputId={`phone-${originalIndex >= 0 ? originalIndex : idx}`}
                  label={`Phone${
                    getDisplayPhoneNumbers().length > 1 ? ` #${idx + 1}` : ""
                  }`}
                  inputStyle={{ width: "100%" }}
                  value={ph.number || ""}
                  placeholder={
                    !isEditMode && !ph.number
                      ? "No phone number provided"
                      : "Enter phone number"
                  }
                  readonly={!isEditMode}
                  onChange={(e) =>
                    handlePhoneChange(
                      originalIndex >= 0 ? originalIndex : idx,
                      e.target.value
                    )
                  }
                  appendIcon={
                    isEditMode &&
                    idx === getDisplayPhoneNumbers().length - 1 ? (
                      <FaPlus />
                    ) : null
                  }
                  onAppendClick={
                    idx === getDisplayPhoneNumbers().length - 1
                      ? handleAddPhone
                      : null
                  }
                  hasError={
                    !!validationErrors[
                      `phone_${originalIndex >= 0 ? originalIndex : idx}`
                    ]
                  }
                  errorMessage={
                    validationErrors[
                      `phone_${originalIndex >= 0 ? originalIndex : idx}`
                    ] || ""
                  }
                />
              </div>
              <div className="flex-shrink-0 mb-1">
                <MaterialCheckbox
                  label="Primary"
                  checked={ph.isPrimary || false}
                  disabled={!isEditMode}
                  onChange={(e) =>
                    handlePhonePrimaryChange(
                      originalIndex >= 0 ? originalIndex : idx,
                      e.target.checked
                    )
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactInfo;
