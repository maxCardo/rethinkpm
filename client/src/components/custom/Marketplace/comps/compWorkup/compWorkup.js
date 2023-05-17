import React, { useEffect, useState, Fragment } from 'react'
import {connect} from 'react-redux'
import { Button } from 'react-bootstrap';
import IconButton from "../../../../core/IconButton/IconButton";
import { formatMoney, formatRange } from "../../../../../util/commonFunctions";
import {arrAvg, getStanDev, getQuantMean,getQuantArr} from "../../../../../util/math";
import {createErrorAlert, setAlert} from '../../../../../actions/alert'
import {submitCompAnalysis} from '../../../../../actions/marketplace/comps'

import WorkUpTiles from "./WorkUpTiles";
import GalleryModal from "./modals/GalleryModal";
import StreetMapViewModal from "./modals/StreetMapViewModal";
import EditCompListingModal from "./modals/EditCompListingModal";
import EditSubjectModal from './modals/EditSubjectModal'
import InfoModal from "./modals/infoModal";
import missingImage from '../../../../../img/missingImage.jpg'

//actions

// like
// blacklist
//Property condition A-D
//area condition
//parking
//stairs

const CompWorkup = ({showModal, hideModal, focusedProp, setAlert, createErrorAlert,submitCompAnalysis, type}) => {
    const [property, setProperty] = useState({});
    //@desc: subject condition updated. should varify from record on useEffect. if false user can not update comp condtion (trigger alert, open propCondition)
    const [propCond, setProbCond]= useState({avail: false, features:{}, adjustment:{}})
    const [comps, setComps] = useState([])
    const [activePropertyReport, setActivePropertyReport] = useState({});
    const [reportPrice, setReportPrice] = useState('0')

    const [activeComp, setActiveComp] = useState({});
    const [streetView, setStreetView] = useState(false)
    const [streetViewModalOpen, setStreetViewModalOpen] = useState(false)
    const [galleryModalOpen, setGalleryModalOpen] = useState(false)
    const [compEditModal, setCompEditModal] = useState(false)
    const [compInfoModal, setCompInfoModal] = useState(false)
    const [subEdModal, setSubEdModal] = useState(false)
   
    useEffect(() => {
        const props = focusedProp
        // console.log('compReport');
        // console.log(compReport);
        //setProperty(focusedProp);
        console.log('props: ',props);
        

        if (props) {
            
            const compReport = props.compReport
            const theComps = compReport.comps ? compReport.comps : [];
            const theReport = compReport.price;
            setComps(theComps);
            setProperty(props);
            setActivePropertyReport(theReport)

            console.log('property: ', property)
            console.log('comps');
            console.log(theComps);

        }

    }, [focusedProp])

    //@desc: switch to set active comp and open modal
    const openModel = (model, comp) => {
        //const selectedComp = comps.filter(x => x._id === compId)
        setActiveComp(comp)
        console.log('activeComp: ',activeComp)
        console.log('model: ', model)
        switch(model){
            case 'streetView':
                setStreetViewModalOpen(true)
                break;
            case 'gallery':
                setGalleryModalOpen(true)
                break;
            case 'edit':
                openCompEdit()
                break;
            case 'info':
                setCompInfoModal(true)
                break;
            default:
                console.log('defaulT!!!!')
        }
    }

    //@desc: settings for gallary slider
    //todo: move to gallery modal. set loading until setting have run??
    var sliderSettings = {
        dots: true,
        infinite: false,
        slidesToShow: 3,
        slidesToScrikk: 1,
        variableWidth: true,
        cssEase: 'linear',
    };

    //@desc: like comp, update rec in comp arr, move item index in arr (commented out).
    const likeComp = async (compId) => {
        const updated = comps.map(comp => comp._id === compId ? comp.like != true ? { ...comp, like: true, blacklist: false } : { ...comp, like: false } : comp)
        //updated.unshift(updated.splice(updated.findIndex(comp => comp._id === compId), 1)[0])
        setComps(updated)
        calcCompAdj(updated)
    }

    //@desc: unlike comp, update rec in comp arr, move item index in arr.
    const unlikeComp = (compId) => {
        const updated = comps.map(comp => comp._id === compId ? comp.blacklist != true ? { ...comp, blacklist: true, like: false } : { ...comp, blacklist: false } : comp)
        updated.push(updated.splice(updated.findIndex(comp => comp._id === compId),1)[0])
        console.log(updated)
        setComps(updated)
        calcCompAdj(updated)
    }

    //@desc: effect to count up comp price 
    const setSubjectPrice = (price) => {
        const priceArr = [(price * .25), (price * .35), (price * .45), (price * .55), (price * .65), (price * .75), price]
        console.log(priceArr)
        priceArr.forEach(x => {
            setTimeout(() => {
                console.log(x);
                setReportPrice(x)    
            },.5)
        })
    }

    //@desc: calculate value of liked comps
    const calcCompAdj = (arr) => {
        console.log(arr)
        const data = arr.filter(comp => comp.like === true)
        console.log(data);
        const priceArr = data.map(x => x.adjSalePrice)
        console.log(priceArr);
        if (data.length > 0) {
            const arr25_75 = getQuantArr(priceArr, .25, .75)
            const arr10_90 = getQuantArr(priceArr, .1, .9)
            const price = {
                average: arrAvg(priceArr),
                //Median,
                priceRange: `${Math.min(...priceArr)} - ${Math.max(...priceArr)}`,
                _25_75: `${Math.min(...arr25_75)} - ${Math.max(...arr25_75)}`,
                _10_90: `${Math.min(...arr10_90)} - ${Math.max(...arr10_90)}`,
                stdDev: getStanDev(priceArr),
                sampleSize: priceArr.length,
                searchRad: Math.max(...data.map(x => x.distance)),
                arv: getQuantMean(priceArr, .75, .9),
                oov: arrAvg(priceArr)
            }
            setActivePropertyReport(price)
            setSubjectPrice(price.oov)
        }else {
            setActivePropertyReport({})
            setSubjectPrice('0')
        }
        
    }

    //@desc: add manual adjustments to comp, re calculate price.
    //todo: update comps listing record with assesment 
    const submitSupData = (compId, data) => {
        const features =  {
            car: {
                _1: data.car1 === 'garage' ? 6000 : data.car1 === 'offStreet' ? 3000 : 0,
                _2: data.car2 === 'garage' ? 5000 : data.car2 === 'offStreet' ? 2500 : 0,
                _3: data.car3 === 'garage' ? 3000 : data.car3 === 'offStreet' ? 1500 : 0,
            },
            AC: data.AC === true ? 10000 : 0,
            cave: data.cave === true ? 10000 : 0,
        }
        
        const newAdjustment = {
            parking: (propCond.adjustments.car._1 + propCond.adjustments.car._2 + propCond.adjustments.car._3) - (features.car._1 + features.car._2 + features.car._3) ,
            AC: (propCond.adjustments.AC - features.AC),
            cave: (propCond.adjustments.cave - features.cave)
        }
        const totalAdjustments = Object.values(newAdjustment).reduce((acc, item) => acc + item)

        console.log('propCond: ', propCond);
        console.log('features: ', features);
        console.log('adjustments: ',newAdjustment);
        console.log('total: ', totalAdjustments);

        const comp = comps.filter(comp => comp._id === compId)[0]
        console.log('comp: ', comp);
        const currentAdj = comp.adjustments
        console.log('current: ', currentAdj);
        const compAdj = {...currentAdj, ...newAdjustment}
        console.log('compAdj: ', compAdj);
        const newSalePrice = Number(comp.adjSalePrice) + totalAdjustments
        console.log('newSalesPrice', newSalePrice);
        const updated = comps.map(comp => comp._id === compId ? {...comp, adjustments:compAdj, adjSalePrice: newSalePrice , updated: true} : comp )
        console.log('updated: ', updated);
        setComps(updated)
        calcCompAdj(updated)
    } 

    //@desc check propery data completed before opening comp edit model
    //todo: add alert of else clause
    const openCompEdit = () => {
        console.log(propCond);
        if (propCond.avail) {
            setCompEditModal(true)
        } else {
            console.log('PROP CONDITION NOT UPDATED');
            setAlert('Please Edit Subject Propety Entry Prior to comps')
            //SEND ALERT
        }
    }

    //@desc: Add manual property features to subject. 
    //todo: update listing record with info. 
    const submitSubjectEdit = (id, data) => {
        console.log('submiting data subEd');
        console.log(id, data);
        const report = {
            avail: true,
            features: data,
            adjustments: {
                car: {
                    _1: data.car1 === 'garage' ? 6000 : data.car1 === 'offStreet' ? 3000 : 0,
                    _2: data.car2 === 'garage' ? 5000 : data.car2 === 'offStreet' ? 2500 : 0,
                    _3: data.car3 === 'garage' ? 3000 : data.car3 === 'offStreet' ? 1500 : 0,
                },
                AC: data.AC === true ? 10000 : 0,
                cave: data.cave === true ? 10000 : 0,
            }
        }
        setProbCond(report)
    }

    //@desc: check minimal manual entry requirements, save record to DB, update state  
    const saveReport = () => {
        console.log('running save report')
        const likedComps = comps.filter(comp => comp.like === true)
        console.log(likedComps.length);
        if (likedComps.length > 2) {
            
            const notUpdated = likedComps.filter(comp => comp.updated != true)
            console.log('notUpdated: ', notUpdated);
            if (notUpdated.length >= 1) {
                //setAlert
                console.log(`Some properties have not been updated with manual data. Please review records for ${notUpdated.map(x => `${x.listing_id.streetNumber} ${x.listing_id.streetName} `)} and update prior to submiting`);
            }else{
                //save report
                console.log('saving report');
                const compReport = focusedProp.compReport
                const updated = {...compReport, price: activePropertyReport, comps: comps, review: propCond, updated: true}
                submitCompAnalysis(updated, type)
            }

        }else{
            //setAlert
            console.log('please like at least 3 comps prior to saving comp');
        }
        //check more then 3 liked
        //check all liked updated
        //if all clear save compreport to DB with updated: true
    }


    return (
       <Fragment>
            < div className="flex-between" >
                <div className="editComps__container">
                    <WorkUpTiles list={comps} openModel={openModel} like={likeComp} unlike={unlikeComp}/>
                </div>
                <div className="calcSidebar">
                    <div className="EditComp__card">
                        <div className="Comp__details-imgContainer" style={{ backgroundImage: 'url(' + missingImage + ')', backgroundSize: 'cover', backgroundPosition: 'center center', minHeight: '220px' }}>
                        </div>
                        <IconButton placement='bottom'
                            tooltipContent='Click to Edit Main Property'
                            iconClass='fas fa-edit'
                            variant='action-button'
                            btnClass='singleFieldEdit CardList__infoBtn'
                            onClickFunc={() => setSubEdModal(true)} />
                        <div>
                            <div className="Comp__details">
                                <span>Subject</span>
                                <span className="Comp__details-prices">{`${property.streetNumber} ${property.streetName} (${property.city})`}</span>
                                <div className="Comp__details-bar">
                                    {property.bedrooms ? <span>Bedrooms: {property.bedrooms} |</span> : ''}
                                    <span>Baths: {property.bathsFull + property.bathsPartial} |</span>
                                    {property.buildingSize ? <span>{property.buildingSize} sq.ft</span> : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Calculator">
                        <div className="activeReport">
                            <p className="op__bigMoney">{formatMoney(reportPrice)}</p>
                            <p className="op__smCentered">Sample Size: {activePropertyReport.sampleSize}</p>
                            <p className="op__smCentered">Search Radius: {activePropertyReport.searchRad}</p>
                            <p className="op__smCentered">&sigma;: {formatMoney(activePropertyReport.stdDev)}</p>
                            <p className="op__smCentered">10-90: {formatRange(activePropertyReport._10_90)}</p>
                            <p className="op__smCentered">25-75: {formatRange(activePropertyReport._25_75)}</p>
                        </div>
                    </div>
                    <div className="calcSidebar__actions">
                        <Button className="btn btn-danger" variant="secondary"
                            onClick={hideModal}
                        >
                            Cancel
                                </Button>
                        <Button className="btn btn-primary" disabled={false} variant="secondary"
                            onClick={() => saveReport()}
                        >
                            Save and Exit
                                </Button>
                    </div>
                </div>
            </div>
            {activeComp && streetViewModalOpen && (
                <StreetMapViewModal modalOpen={streetViewModalOpen} activeComp={activeComp} streetView={streetView} openModal={setStreetViewModalOpen} changeStreetView={setStreetView} />
            )}
            {activeComp && galleryModalOpen && (
                <GalleryModal modalOpen={galleryModalOpen} activeComp={activeComp} sliderSettings={sliderSettings} openModal={setGalleryModalOpen}/>
            )}
            {activeComp && compEditModal && (
                <EditCompListingModal modalOpen={compEditModal} activeComp={activeComp} openModal={setCompEditModal} submit={submitSupData}/>
            )}
            {activeComp && compInfoModal && (
                <InfoModal modalOpen={compInfoModal} activeComp={activeComp} openModal={setCompInfoModal}/>
            )}
            <EditSubjectModal createErrorAlert={createErrorAlert} modalOpen={subEdModal} activeComp={property} openModal={setSubEdModal} submit={submitSubjectEdit}/>
       </Fragment>
    )
}

const mapStateToProps = state => ({
    focusedProp: state.marketplace.focusedProp
})

export default connect(mapStateToProps, {setAlert, createErrorAlert, submitCompAnalysis})(CompWorkup)

    