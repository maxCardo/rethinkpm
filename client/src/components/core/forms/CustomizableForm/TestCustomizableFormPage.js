import React, { useState } from 'react';
import CustomizableForm from './index';

const stepsMapping = [
  {
    title: 'Test Form',
    fields: [
      {
        type: 'text',
        label: 'Name',
        name: 'name',
        value: '',
        handleChange: () => {},
      },
      {
        type: 'radio',
        label: 'Favorite Color',
        name: 'color',
        value: '',
        options: [
          { value: 'red', label: 'Red' },
          { value: 'blue', label: 'Blue' },
          { value: 'green', label: 'Green' },
        ],
        handleChange: () => {},
      },
      {
        type: 'select',
        label: 'Country',
        name: 'country',
        value: '',
        options: [
          { value: 'us', label: 'United States' },
          { value: 'ca', label: 'Canada' },
        ],
        handleChange: () => {},
      },
      {
        type: 'checkbox',
        label: 'Subscribe to newsletter',
        name: 'subscribe',
        checked: false,
        handleChange: () => {},
      },
    ],
    canSubmit: true,
  },
];

export default function TestCustomizableFormPage() {
  const [formState, setFormState] = useState({
    name: '',
    color: '',
    country: '',
    subscribe: false,
  });
  const [formErrs, setFormErrs] = useState({});

  const handleFieldChange = (fieldName) => (e) => {
    let value;
    if (e && e.target && e.target.type === 'checkbox') {
      value = e.target.checked;
    } else if (e && e.target) {
      value = e.target.value;
    } else if (e && e.value) {
      value = e;
    } else {
      value = e;
    }
    setFormState((prev) => ({ ...prev, [fieldName]: value }));
    setFormErrs((prev) => ({ ...prev, [fieldName]: undefined })); // Clear error on change
  };

  // Validation function
  const getFormErrs = (fieldsToValidate) => {
    const errs = {};
    if (!formState.name && fieldsToValidate.includes('name')) {
      errs.name = 'Name is required';
    }
    if (!formState.color && fieldsToValidate.includes('color')) {
      errs.color = 'Favorite color is required';
    }
    if (!formState.country && fieldsToValidate.includes('country')) {
      errs.country = 'Country is required';
    }
    if (!formState.subscribe && fieldsToValidate.includes('subscribe')) {
      errs.subscribe = 'Subscribe to newsletter is required';
    }
    return errs;
  };

  const handleSubmit = () => {
    const fieldsToValidate = ['name', 'color', 'country', 'subscribe'];
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
      if (field.type === 'checkbox') {
        return {
          ...field,
          checked: formState[field.name],
          handleChange: handleFieldChange(field.name),
        };
      }
      if (field.type === 'select') {
        return {
          ...field,
          value: formState[field.name],
          handleChange: (option) => setFormState((prev) => ({ ...prev, [field.name]: option })),
        };
      }
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
      <h2>Test CustomizableForm</h2>
      <CustomizableForm
        stepsMapping={mappedSteps}
        currentStep={0}
        title="Test CustomizableForm"
        handleSubmit={handleSubmit}
        getFormErrs={getFormErrs}
        isLoading={false}
      />
    </div>
  );
} 