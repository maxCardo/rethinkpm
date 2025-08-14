import React, { useState } from 'react'
import Head from "next/head";
import styles from "../styles/contact.module.css";
import { getServiceTypes } from "../utils/serviceType";
import { isDictEmpty, validators, isNull } from '../utils/customFormValidators';
import CustomizableForm from '../components/CustomizableForm';
import axios from 'axios'

const test = 'http://localhost:8080'
const prod = 'https://more-black-magic.herokuapp.com'
const url = process.env.NODE_ENV === 'production' ? prod : test

//@desc: fetch call to get property and unit names
export const getServerSideProps = async ({ query }) => {
    try {
        const res = await axios.get(`${url}/api/rentmanager/getAssets`);
        const data = res.data;
        console.log('query from maint: ', data.data[0].Units);
        
        return {
            props: { assets: data.data, query }
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: { assets: [], query }
        };
    }
};

export default function RequestMaintenancePage({ assets, query }) {
    const [currentStep, setCurrentStep] = useState('address')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        property: null,
        unit: null,
        duplicateTask: null,
        prevReqRes: null, 
        hasIssueNumber: null,
        issueNum: null,
        priority: null,
        pte: false,
        pets: false,
        availability: null,
        serviceType: {},
        serviceDescription: '',
    })
    const [rmIssue, setRMIssue] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (formData) => {
        setIsLoading(true)
        setCurrentStep('submitted')
        try {
            console.log('submiting form: ', formData)
            //alert(JSON.stringify(formData, null, 2))
            const res = await fetch(`${url}/api/web/tlg/service`, {
                method: "post",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const response = await res.json()
            console.log(response)
            setRMIssue(response?.[0]?.ServiceManagerIssueID)
        } catch(error) {
            console.log('error: ', error)
        } finally {
            setIsLoading(false)
        }
    }

    const propertyOptions = assets.map(x => {
        return {value: x.PropertyID, label: x.Name, units: x.Units}
    })

    const getUnitOption = (propertyID) => {
        const propertyData = assets.filter(x => x.PropertyID === propertyID)
        const unitData = propertyData.length > 0 && propertyData[0].Units.map(x => {
            return {value: x.UnitID, label: x.Name}
        })
        return unitData
    }

    const getFormErrs = (fields = []) => {
        const validatorsMapping = {
            name: validators.getNameErr(formData.name, { required: true, requiredMsg: 'Full name required' }),
            email: validators.getEmailErr(formData.email, { required: true, requiredMsg: 'Email required' }),
            phone: validators.getPhoneNumberErr(formData.phone, { required: false, requiredMsg: 'Valid phone number required' }),
            property: isNull(formData.property) && 'Must select a property',
            unit: formData.property?.units && formData.property?.units?.length > 1 && isNull(formData.unit) && 'Must select a unit',
            duplicateTask: isNull(formData.duplicateTask) && 'Must input a value',
            hasIssueNumber: isNull(formData.hasIssueNumber) && 'Must input a value',
            issueNum: isNull(formData.issueNum) && 'Must input an issue number',
            priority: isNull(formData.priority) && 'Must select priority',
            pte: false,
            pets: false,
            availability: !formData.availability && 'Must provide a description',
            serviceType: isDictEmpty(formData.serviceType) && 'Must select a serviceType',
            serviceDescription: !formData.serviceDescription && 'Must provide a description',
        }
        const formErrs = {}
        for (const field of fields) {
            if (validatorsMapping[field]) {
                formErrs[field] = validatorsMapping[field]
            }
        }
        return formErrs
    };

    const stepsMapping = {
        address: {
            handleClickNext: () => setCurrentStep('prevRequest'),
            fields: [
                {
                    type: 'text',
                    label: 'Full Name*:',
                    name: 'name',
                    handleChange: handleInputChange,
                    value: formData.name,
                    halfWidth: true,
                },
                {
                    type: 'text',
                    label: 'Email*:',
                    name: 'email',
                    handleChange: handleInputChange,
                    value: formData.email,
                    halfWidth: true
                },
                {
                    type: 'text',
                    label: 'Mobile Number*:',
                    name: 'phone',
                    handleChange: handleInputChange,
                    value: formData.phone
                },
                {
                    type: 'select',
                    label: 'Property Location*:',
                    name: 'property',
                    options: propertyOptions,
                    handleChange: (option) => setFormData({ ...formData, property: option }),
                    value: formData.property
                },
            ],
        },
        prevRequest: {
            handleClickPrev: () => setCurrentStep('address'),
            fields: [
                { 
                    type: 'radio',
                    label: 'Have you made this same request in the recent past that has yet to be responded too.',
                    name: 'duplicateTask',
                    options: [{ label: 'Yes', value: 'yes'}, { label: 'No', value: 'no' }],
                    handleChange: (e) => {
                        handleInputChange(e)
                        setCurrentStep(e.target.value === 'yes' ? 'prevReqRes' : 'isUrgent')
                    },
                    value: formData.duplicateTask
                },
            ],
        },
        prevReqRes: {
            handleClickPrev: () => {
                setCurrentStep('prevRequest')
                setFormData({ ...formData, duplicateTask: null })
            },
            fields: [
                { 
                    type: 'radio',
                    label: 'Has it been over 48 hours since your last attempt to make this request?',
                    name: 'prevReqRes',
                    options: [{ label: 'Yes', value: 'yes'}, { label: 'No', value: 'no' }],
                    handleChange: (e) => {
                        handleInputChange(e)
                        setCurrentStep(e.target.value === 'no' ? 'currentReq' : 'issueNumberQuery')
                    },
                    value: formData.prevReqRes
                },
            ],
        },
        issueNumberQuery: {
            handleClickPrev: () => {
                setCurrentStep('prevReqRes')
                setFormData({ ...formData, prevReqRes: null })
            },
            fields: [
                { 
                    type: 'radio',
                    label: 'Do you have the issue number?',
                    name: 'hasIssueNumber',
                    options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }],
                    handleChange: (e) => {
                        handleInputChange(e)
                        setCurrentStep(e.target.value === 'yes' ? 'issueNumberForm' : 'isUrgent')
                    },
                    value: formData.hasIssueNumber
                },
            ],
        },
        issueNumberForm: {
            handleClickNext: () => setCurrentStep('isUrgent'),
            handleClickPrev: () => {
                setCurrentStep('issueNumberQuery')
                setFormData({ ...formData, hasIssueNumber: null })
            },
            fields: [
                {
                    type: 'text',
                    label: 'Issue Number*:',
                    name: 'issueNum',
                    handleChange: handleInputChange,
                    value: formData.issueNum
                }
            ],
        },
        isUrgent: {
            handleClickNext: () => setCurrentStep('pets'),
            handleClickPrev: () => {
                setCurrentStep('prevRequest')
                setFormData({ ...formData, hasIssueNumber: null, duplicateTask: null, prevReqRes: null })
            },
            fields: [
                { 
                    type: 'radio',
                    label: 'Does this issue reqire urgent response or can this wait until the next buisness hour.',
                    name: 'priority',
                    options: [
                        { label: 'Please respond during buisness hours at the next available time', value: 'no' },
                        { label: 'I certify that this is an "urgent" issue as per the property policy and procedures', value: 'yes' } 
                    ],
                    handleChange: (e) => handleInputChange(e),
                    value: formData.priority,
                    startContent: `
                        Our goal is to respond to maintenance as quickly as possible. Please allow 24 - 48 hours for standard request. 
                        "Urgent" request are defined as items that have an imidiate threat to health or property and can not wait until the next buisness day. 
                        Per the lease, owners may hold residnets responsbilbe for the cost of any request put in as "Urgent" that does not fit this criteria. 
                        If you are experince a medical emergency please hang up and call 911.     
                    `
                },
            ],
        },
        pets: {
            handleClickPrev: () => {
                setCurrentStep('isUrgent')
                setFormData({ ...formData, pets: null,})
            },
            fields: [
                { 
                    type: 'radio',
                    label: 'Do you have any Pets?',
                    name: 'pets',
                    options: [{ label: 'Yes', value: 'yes' }, {label: 'No', value: 'no' }],
                    handleChange: (e) => {
                        handleInputChange(e)
                        setCurrentStep('pte')
                    },
                    value: formData.pets,
                    endContent: 'If the answer is yes to the above quastion please state the type of pets that are located in the home in the service description below.'
                },
            ],
        },
        pte: {
            handleClickPrev: () => {
                setCurrentStep('pets')
                setFormData({ ...formData, pets: null, pte: null})
            },
            fields: [
                { 
                    type: 'radio',
                    label: 'Does the tech have "Permission To Enter" in the case you are not home?',
                    name: 'pte',
                    options: [{ label: 'Yes', value: 'yes' }, {label: 'No', value: 'no' }],
                    handleChange: (e) => {
                        handleInputChange(e)
                        setCurrentStep(e.target.value === 'no' ? 'avail' : 'service')
                    },
                    value: formData.pte,
                    // endContent: 'If the answer is no the above quastions' 
                },
            ],
        },
        avail: {
            handleClickPrev: () => {
                setCurrentStep('pte')
                setFormData({ ...formData, pte: null})
            },
            handleClickNext: () => setCurrentStep('service'),
            fields: [
                {
                    type: 'textArea',
                    startContent: `
                        Please include your availability in box below. 
                        Servie request are schedualed in 4 hours windows, Mon - Fri. Available windows are 'Morning' from 8am to 12pm and 'Afternoon' from 12pm to 4pm. 
                        Do to the unpredictability of schduling and preforming maintenance on service request, we are unable to schedual service in smaller windows.
                    `,
                    name: 'availability',
                    placeholder: " Please state at least 2 different windows when you will be available for an appointment",
                    // options: getServiceTypes(),
                    handleChange: handleInputChange,
                    value: formData.availability 
                },
            ],
        },
        service: {
            canSubmit: true,
            handleClickPrev: () => {
                setCurrentStep('pte')
                setFormData({ ...formData, pte: null})
            },
            fields: [
                {
                    type: 'select',
                    label: '*Type of service:',
                    name: 'serviceType',
                    options: getServiceTypes(),
                    handleChange: (option) => setFormData({ ...formData, serviceType: option }),
                    value: formData.serviceType
                },
                {
                    type: 'textArea',
                    label: '*Service Request Summary:',
                    name: 'serviceDescription',
                    placeholder: "Enter a brief description of your services",
                    options: getServiceTypes(),
                    handleChange: handleInputChange,
                    value: formData.serviceDescription
                },
            ],
        },
        submitted: {
            title: 'Thank you for submitting a request. Someone will contact you shortly',
            children: <span style={{ fontSize: 18, textAlign: 'center' }}>{`A ticket has been created in the system for this request. Issue number: `}<strong>{rmIssue}</strong></span> 
        },

        currentReq: {
            handleClickPrev: () => {
                setCurrentStep('prevReqRes')
                setFormData({ ...formData, prevReqRes: null })
            },
            title: `
                You previous request has already been sent to our service team. Please allow 24 - 48 hours for standard request and 1 -2 hours for urgent request for our team to respond. 
                "Urgent" request are defined as items that have an imidiate threat to health or property and can not wait until the next buisness day. Per the lease, owners may hold residnets responsbilbe for the cost 
                of any request put in as "Urgent" that does not fit this criteria. If you are experince a medical emergency please call 911.    
            `,
        }
    }
    
    if (formData.property && formData.property.units && formData.property.units.length > 1) {
        stepsMapping.address.fields.push({
            type: 'select',
            label: 'Unit Number*:',
            name: 'unit',
            options: getUnitOption(formData.property.value),
            handleChange: (option) => setFormData({ ...formData, unit: option }),
            value: formData.unit
        },)
    }

    return <>
        <div className="contact-us bgimg-1">
            <Head>
                <title>Service Request | TLG</title>
                <meta
                    name="description"
                    content="Service request page for property managed by TLG Buidling Services Co."
                />
            </Head>
            <div className={styles.contactus__overlay}/>
            <div className="inner__page">
                <div className="container">
                    <CustomizableForm
                        title={"Service Request"}
                        stepsMapping={stepsMapping}
                        currentStep={currentStep}
                        handleSubmit={() => handleSubmit(formData)}
                        getFormErrs={getFormErrs}
                        isLoading={isLoading}
                    />
            </div>
            </div>
        </div>
    </>
}