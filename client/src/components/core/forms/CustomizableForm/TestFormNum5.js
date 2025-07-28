import React, { useState } from 'react';
import CustomizableForm from './index';

const stepsMapping = [
  {
    title: 'Work Order Update',
    fields: [
      {
        type: 'text',
        label: '* Email',
        required: true,
        name: 'email',
        value: '',
        handleChange: () => {},
      },
      {
        type: 'text',
        label: '* RM Issue Number',
        required: true,
        name: 'rmIssueNumber',
        value: '',
        handleChange: () => {},
      },
      {
        type: 'text',
        label: '* Tech',
        name: 'tech',
        value: '',
        handleChange: () => {},
      },
      {
        type: 'date',
        label: 'Date Of Work ',
        name: 'dateOfWork',
        value: '',
        handleChange: () => {},
      },
      {
        type: 'text',
        label: '* Job Name',
        required: true,
        name: 'jobName',
        value: '',
        handleChange: () => {},
      },
      {
        type: 'text',
        label: '* Please Describe Course of action taken and any future follow-up needed (if applicable)',
        required: true,
        name: 'courseOfAction',
        value: '',
        handleChange: () => {},
      },
      {
        type: 'text',
        label: 'Internal Notes (Not visible to owner)',
        name: 'notes',
        value: '',
        handleChange: () => {},
      },
        {
          type: 'text',
          label: 'Total Labor Charged',
          endContent: 'Combine total hours for all techs, e.g. 2 guys 8 hours = 16 hours',
          name: 'totalLaborCharged',
          value: '',
          handleChange: () => {},
        },
        {
          type: 'text',
          label: 'Include Trip Charge',
          name: 'includeTripCharge',
          value: '',
          handleChange: () => {},
        },
        {
          type: 'text',
          label: 'Materiel  Charge',
          name: 'materielCharge',
          endContent: 'Leave Blank if N/A Only for items taken from TLG stock. PO\'s allocated to this ticket should not be tracked here.  ',
          value: '',
          handleChange: () => {},
        },
        {
          type: 'select',
          label: 'Tenant Responsibility',
          name: 'tenantResponsibility',
          options: [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
          ],
          value: '',
          handleChange: () => {},
        },
        {
          type: 'file',
          label: 'Attached Doc or Picture',
          name: 'attachedDocOrPicture',
          
          value: '',
          handleChange: () => {},
        },
        {
          type: 'select',
          label: '* Job Status',
          required: true,
          name: 'jobStatus',
          options: [
            { label: 'Update', value: 'update' },
            { label: 'Escalate', value: 'escalate' },
            { label: 'Completed', value: 'completed' },
          ],
          endContent: "Update = In house follow up needed,     Escalation = Escalate to outside vendor",
          value: '',
          handleChange: () => {},
        },
     
    ],
    canSubmit: true,
  },
];

export default function TestFormNum5() {
  const [formState, setFormState] = useState({
    email: '',
    rmIssueNumber: '',
    tech: '',
    dateOfWork: '',
    jobName: '',
    courseOfAction: '',
    notes: '',
    totalLaborCharged: '',
    includeTripCharge: '',
    materielCharge: '',
    tenantResponsibility: '',
    attachedDocOrPicture: '',
    jobStatus: '',
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
    // check if the field is required and if it is not filled, add the error
     fieldsToValidate.forEach(field => {
      const requiredStep = stepsMapping[0].fields.find(stepField => stepField.name === field && stepField.required);
      if (!formState[field] && requiredStep) {
         errs[field] = `${requiredStep.label.split('*')[1]} is required`
      }
    })
    return errs;
  };

  const handleSubmit = () => {
    // const fieldsToValidate = ['email', 'rmIssueNumber', 'tech'];
    const fieldsToValidate = Object.keys(formState).filter(key => stepsMapping[0].fields.find(field => field.name === key)?.required);
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
    <div style={{ maxWidth: 600, margin: '2rem auto', height: '100vh', overflow: 'auto', marginBottom: '100px', paddingBottom: '100px' }}>
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