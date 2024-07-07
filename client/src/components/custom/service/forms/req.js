import React, { useState } from 'react'
// import Head from "next/head";
import styles from "../../../core/forms/style.css";
import { getServiceTypes } from './utils';
import { isDictEmpty, validators, isNull } from '../../../core/forms/customFormValidators';
import CustomizableForm from '../../../core/forms/CustomizableForm';
import axios from 'axios'

// const test = 'http://localhost:8080'
// const prod = 'https://more-black-magic.herokuapp.com'
// const url = process.env.NODE_ENV === 'production' ? prod : test

// //@desc: fetch call to get property and unit names
// export const getServerSideProps = async ({ query }) => {
//     try {
//         const res = await axios.get(`${url}/api/rentmanager/getAssets`);
//         const data = res.data;
//         console.log('query from maint: ', data.data[0].Units);
        
//         return {
//             props: { assets: data.data, query }
//         };
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return {
//             props: { assets: [], query }
//         };
//     }
// };

export default function RequestMaintenancePage({ assets, query }) {


    return <>
        <div>
            <p>
                <title>Service Request | TLG</title>
                <meta
                    name="description"
                    content="Service request page for property managed by TLG Buidling Services Co."
                />
            </p>
            <div className={styles.contactus__overlay}/>
            {/* <div className="inner__page">
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
            </div> */}
        </div>
    </>
}