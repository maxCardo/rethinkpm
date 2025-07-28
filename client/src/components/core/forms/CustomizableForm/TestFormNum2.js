import React, { useState } from 'react';
import CustomizableForm from './index';

const stepsMapping = [
  {
    title: 'Move Out Inspection',
    fields: [
      {
        type: 'text',
        label: '* Email',
        name: 'email',
        value: '',
        handleChange: () => {},
      },
      {
        type: 'text',
        label: '* RM Issue Number',
        name: 'rmIssueNumber',
        value: '',
        handleChange: () => {},
      },
      {
        type: 'text',
        label: 'Tech',
        name: 'tech',
        value: '',
        handleChange: () => {},
      },
     
    ],
    canSubmit: true,
  },
];

export default function TestFormNum2() {
  const [formState, setFormState] = useState({
    email: '',
    rmIssueNumber: '',
    tech: '',
  });
  const [formErrs, setFormErrs] = useState({});

  const handleFieldChange = (fieldName) => (e) => {
    let value;
    if (e && e.target) {
      value = e.target.value;
    } else {
      value = e;
    }
    setFormState((prev) => ({ ...prev, [fieldName]: value }));
    setFormErrs((prev) => ({ ...prev, [fieldName]: undefined })); // Clear error on change
  };

  // Validation function
  const getFormErrs = (fieldsToValidate) => {
    const errs = {};
    if (!formState.email && fieldsToValidate.includes('email')) {
      errs.email = 'Email is required';
    }
    if (!formState.rmIssueNumber && fieldsToValidate.includes('rmIssueNumber')) {
      errs.rmIssueNumber = 'RM Issue Number is required';
    }
    if (!formState.tech && fieldsToValidate.includes('tech')) {
      errs.tech = 'Tech is required';
    }
    return errs;
  };

  const handleSubmit = () => {
    const fieldsToValidate = ['email', 'rmIssueNumber', 'tech'];
    const errs = getFormErrs(fieldsToValidate);
    setFormErrs(errs);
    if (Object.keys(errs).length === 0) {
      alert('Form submitted! ' + JSON.stringify(formState, null, 2));
    }
  };

  // Map state and handlers to fields
  const mappedSteps = stepsMapping.map((step) => ({
    ...step,
    fields: step.fields.map((field) => {
      return {
        ...field,
        value: formState[field.name],
        handleChange: handleFieldChange(field.name),
      };
    }),
    canSubmit: true,
  }));

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto' }}>
      <CustomizableForm
        stepsMapping={mappedSteps}
        currentStep={0}
        title={mappedSteps[0].title}
        handleSubmit={handleSubmit}
        getFormErrs={getFormErrs}
        isLoading={false}
      />
    </div>
  );
} 