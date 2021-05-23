import React, { useEffect, useState, Fragment } from 'react'
import {connect} from 'react-redux'
import { Button } from 'react-bootstrap';
import IconButton from "../../../../core/IconButton/IconButton";
import { formatMoney, formatRange } from "../../../../../util/commonFunctions";
import { arrAvg, getStanDev, getQuantMean , getQuantArr} from "../../../../../util/math";

import WorkUpTiles from "./WorkUpTiles";
import GalleryModal from "./models/GalleryModal";
import StreetMapViewModal from "./models/StreetMapViewModal";
import EditCompListingModal from "./models/EditCompListingModal";
import InfoModal from "./models/infoModal";
import missingImage from '../../../../../img/missingImage.jpg'

//actions

// like
// blacklist
//Property condition A-D
//area condition
//parking
//stairs

const CompWorkup = ({showModal, hideModal, focusedProp}) => {
    const [property, setProperty] = useState({});
    const [comps, setComps] = useState([])
    const [activePropertyReport, setActivePropertyReport] = useState({});
    const [reportPrice, setReportPrice] = useState('0')

    const [activeComp, setActiveComp] = useState({});
    const [streetView, setStreetView] = useState(false)
    const [streetViewModalOpen, setStreetViewModalOpen] = useState(false)
    const [galleryModalOpen, setGalleryModalOpen] = useState(false)
    const [compEditModal, setCompEditModal] = useState(false)
    const [compInfoModal, setCompInfoModal] = useState(false)
    const [propertyEditModal, setPropertyEditModal] = useState(false)
   
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

    const handlePropertyEdit = (value) => {
        setPropertyEditModal(value)
    }

    const simpleAction = () => {
        console.log('simple action')
    }

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
                setCompEditModal(true)
                break;
            case 'info':
                setCompInfoModal(true)
                break;
            default:
                console.log('defaulT!!!!')
        }
    }

    var sliderSettings = {
        dots: true,
        infinite: false,
        slidesToShow: 3,
        slidesToScrikk: 1,
        variableWidth: true,
        cssEase: 'linear',
    };

    const likeComp = async (compId) => {
        console.log('running like comp')
        const updated = comps.map(comp => comp._id === compId ? comp.like != true ? { ...comp, like: true, blacklist: false } : { ...comp, like: false } : comp)
        //updated.unshift(updated.splice(updated.findIndex(comp => comp._id === compId), 1)[0])
        console.log(updated)
        setComps(updated)
        calcCompAdj(updated)
    }

    const unlikeComp = (compId) => {
        const updated = comps.map(comp => comp._id === compId ? comp.blacklist != true ? { ...comp, blacklist: true, like: false } : { ...comp, blacklist: false } : comp)
        updated.push(updated.splice(updated.findIndex(comp => comp._id === compId),1)[0])
        console.log(updated)
        setComps(updated)
    }
    const setSubjectPrice = (price) => {
        const priceArr = [(price * .25), (price * .35), (price * .45), (price * .55), (price * .65), (price * .75), price]
        console.log(priceArr)
        priceArr.forEach(x => {
            setTimeout(() => {
                console.log(x);
                setReportPrice(x)    
            },1)
        })
    }

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
        }
    }

    const submitSupData = (compId, data) => {
        console.log('submiting data sup');
        console.log(compId, data);
        //const updated = arr.map(comp => comp._id === compId ? {...comp, } )
        //setComps(updated)
        
    }


    return (
       <Fragment>
            < div className="flex-between" >
                <div className="editComps__container">
                    <WorkUpTiles list={comps} simpleAction={simpleAction} openModel={openModel} like={likeComp} unlike={unlikeComp}/>
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
                            onClickFunc={() => handlePropertyEdit(true)} />
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
                            onClick={() => console.log('save and exit')}
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
       </Fragment>
    )

}

const mapStateToProps = state => ({
    focusedProp: state.marketplace.focusedProp
})

export default connect(mapStateToProps, null)(CompWorkup)

    