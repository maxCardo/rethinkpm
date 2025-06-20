import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import {
  validateEmail,
  validatePhoneNum,
} from "../../../../util/commonFunctions";
import ContactInfoFields from "./ContactInfoFields";
import PropertyLocationFields from "./PropertyLocationFields";
import LeadDetailsFields from "./LeadDetailsFields";

const LeasingLeadsForm = ({ getFormData }) => {
  const [phoneFields, setPhoneFields] = useState([
    { number: "", isPrimary: true, okToText: true },
  ]);
  const [noteField, setNoteField] = useState([
    { type: "", content: "", user: "", date: new Date() },
  ]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fullName: "",
    email: [{ address: "", isPrimary: true }],
    phoneNumbers: phoneFields,
    notes: noteField,
    status: "new",
    reasonForLoss: "",
    leadOwner: "System",
    leadSource: "",
    leadTemperature: "",
    createDate: new Date(),
    leadDate: new Date(),
    lastContact: "",
    nextAction: "",
    listingAddress: "",
    listing: [],
  });
  const [errors, setErrors] = useState({ email: "", phone: "" });
  const [formError, setFormError] = useState("");

  // Update parent with form data
  useEffect(() => {
    getFormData(formData);
  }, [formData, getFormData]);

  // Handle input changes
  const handleInputChange = (event, field, value) => {
    if (field === "email.address") {
      const emailValue = event ? event.target.value : value;
      setFormData((prev) => ({
        ...prev,
        email: [{ address: emailValue, isPrimary: true }],
      }));
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(emailValue) ? "" : "Invalid email",
      }));
    } else if (field === "phoneNumbers") {
      // handled separately
    } else if (event) {
      setFormData((prevData) => ({ ...prevData, [field]: event.target.value }));
    } else if (!event && value) {
      setFormData((prevData) => ({ ...prevData, [field]: value }));
    }
  };

  // Handle phone field changes
  const handlePhoneChange = (index, key, value) => {
    const updatedPhones = phoneFields.map((item, idx) =>
      idx === index ? { ...item, [key]: value } : item
    );
    setPhoneFields(updatedPhones);
    setFormData((prev) => ({ ...prev, phoneNumbers: updatedPhones }));
    // Validate phone number
    if (key === "number") {
      setErrors((prev) => ({
        ...prev,
        phone: validatePhoneNum(value) ? "" : "Invalid phone number",
      }));
    }
  };

  // Add new phone field
  const addPhoneField = () => {
    setPhoneFields((prev) => {
      const newFields = [
        ...prev,
        { number: "", isPrimary: false, okToText: false },
      ];
      setFormData((f) => ({ ...f, phoneNumbers: newFields }));
      return newFields;
    });
  };

  // Handle notes
  const handleNotesFieldChange = (e) => {
    const content = e?.target?.value.trim() || "";
    const updatedNote = [{ ...noteField[0], content, date: new Date() }];
    setNoteField(updatedNote);
    setFormData((prev) => ({ ...prev, notes: updatedNote }));
  };

  // Add a form validation function
  const validateForm = () => {
    if (!formData.firstName || !formData.lastName) {
      setFormError("First name and last name are required.");
      return false;
    }
    if (!formData.email[0].address || errors.email) {
      setFormError("A valid email is required.");
      return false;
    }
    if (!formData.phoneNumbers[0].number || errors.phone) {
      setFormError("A valid phone number is required.");
      return false;
    }
    setFormError("");
    return true;
  };

  // Example submit handler (add this to your form or parent component as needed)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    // ...submit logic here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md"
    >
      {formError && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded border border-red-300">
          {formError}
        </div>
      )}
      <Paper elevation={2} className="p-5 mb-6">
        <ContactInfoFields
          formData={formData}
          errors={errors}
          phoneFields={phoneFields}
          handleInputChange={handleInputChange}
          handlePhoneChange={handlePhoneChange}
          addPhoneField={addPhoneField}
        />
      </Paper>
      <Paper elevation={2} className="p-5 mb-6">
        <PropertyLocationFields
          formData={formData}
          handleInputChange={handleInputChange}
        />
      </Paper>
      <Paper elevation={2} className="p-5 mb-6">
        <LeadDetailsFields
          formData={formData}
          handleInputChange={handleInputChange}
          handleNotesFieldChange={handleNotesFieldChange}
          errors={errors}
          noteField={noteField}
        />
      </Paper>
    </form>
  );
};

export default LeasingLeadsForm;
