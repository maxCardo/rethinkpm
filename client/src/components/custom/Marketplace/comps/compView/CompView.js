import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import CardList from "./CardList";
import { Button, Modal } from 'react-bootstrap';
import {mortgageCalc, incomeValue} from '../mortgageCalc'
import ProfileIcon from "../../../../core/ProfileIcon";
import {formatMoney, formatRange} from "../../../../../util/commonFunctions";
import IconButton from "../../../../core/IconButton/IconButton";
import CompWorkup from '../compWorkup/compWorkup'
import GoogleMapReact from 'google-map-react';
import missingImage from '../../../../../img/missingImage.jpg'
import '../style.css'
import { clippingParents } from '@popperjs/core';

const CompView = ({focusedProp, type}) => {

    const [comps, setComps] = useState([])
    const [incVal, setIncVal] = useState()
    const [mktRent, setMktRent] = useState()
    /* MODAL state*/
    const [activeComp, setActiveComp] = useState({});
    const [showModal, setShowModal] = useState(false);

    const [property, setProperty] = useState({});
    const [activePropertyReport, setActivePropertyReport] = useState({});

    const mktIncomeValue = async (noi) => {
        const res = await incomeValue(noi)
        setIncVal(res)
    }

    useEffect(() => {
        const props = focusedProp
        if (props.compReport) {
            const compReport = props.compReport ? props.compReport : {}   
            const theComps = compReport.comps ? compReport.updated ? compReport.comps.filter(comp => comp.like === true): compReport.comps : [];
            const theReport = compReport.price;
            setComps(theComps);
            setProperty(props);
            setActivePropertyReport(theReport)
            console.log('comps');
            console.log(theComps);

            //calculate NOI issues: no reserves, taxes based on current which can be low
            const areaRents = props.rents ? props.rents.area > 0 ? props.rents.area : null : null
            const subRent = props.rents ? props.rents.HA ? props.rents.HA.rent > 0 ? props.rents.HA.rent : null : null : null
            const rents = areaRents && areaRents < subRent ? areaRents : subRent
            if (props.model) {
                const { rentalIncome, vacancyLoss, management, leasing, maintenance, utilities, taxes, insurance } = props.model
                const totalExpPreTax = management + leasing + maintenance + utilities + insurance
                const netOpIncome = (rents * 12) - vacancyLoss - totalExpPreTax - taxes.low
                console.log('rent: ', rents)
                console.log('vac: ', vacancyLoss)
                console.log('exp: ', totalExpPreTax)
                console.log('tax: ', taxes.low)
                console.log('NOI',netOpIncome)
                mktIncomeValue(netOpIncome)
                setMktRent(rents)
            }
        }

       

    }, [focusedProp])

    useEffect(() => {
        console.log('activePropertyReport')
        console.log(activePropertyReport)
    }, [comps])

    const hideModal = () => {
        setShowModal(false)
        setActiveComp({})
    }

    const [propertyEditModal, setPropertyEditModal] = useState(false)
    const handlePropertyEdit = (value) => {
        setPropertyEditModal(value)
    }

    /* TODO: for markers */
    const [compsCoordinates, setCompsCoordinates] = useState([]);


    useEffect(() => {
        if (comps.length > 0) {
            let coordinatesList = [];
            comps.forEach((item, index) => {
                let geoObject = {}
                if (item.listing_id && item.listing_id.longitude && item.listing_id.latitude) {
                    geoObject = {
                        id: item.listing_id._id,
                        lng: item.listing_id.longitude,
                        lat: item.listing_id.latitude,
                        price: item.listing_id.listPrice
                    }
                }

                coordinatesList.push(geoObject)

                // return {longitude: item.data.listing_id.longitude, latitude: item.data.listing_id.latitude}
                
            })
            let noEmpties = coordinatesList.filter(value => Object.keys(value).length !== 0);
            console.log('coordinatesList');
            console.log(noEmpties);
            setCompsCoordinates(noEmpties)
        }
       

    }, [comps])

    const MarkerComponent = ({ content, onClick, idx, theId }) => <a className={'btn btn-primary btn-sm'} href={`#target${theId}`} onClick={onClick}>{content}</a>;

    const mapMarkerList = (compsCoordinates) && compsCoordinates.map((comp, idx) => {
        const onCLickMapMarker = () => {
            console.log('comp');
            console.log(comp);
        }
        return (<MarkerComponent key={`${comp.id}-${idx}`} idx={idx} theId={comp.id} lat={comp.lat} lng={comp.lng} content={comp.price} onClick={onCLickMapMarker}/>);
    })

    const defaultMapProps = {
        center: {
            lat: 40.4406,
            lng: -79.9959
        },
        zoom: 11
    };

    return (
        <div className="container-fluid flex-row">
            <div className="OwnedProperty">
                <div className="op__preparedBy">
                    <p>Prepared by:</p>
                    <div className="op__userBox">
                        <div className="op__userAvatar">
                            <ProfileIcon name={'John Smith'} size={35}/>
                        </div>
                        <div className="op__userData">
                            <p>Adam Poznanski</p>
                            <p className="sub">Broker</p>
                        </div>
                        <IconButton placement='bottom'
                                    tooltipContent={'Edit Comp Report (Agent Only)'}
                                    iconClass='fas fa-edit'
                                    variant='action-button'
                                    btnClass='singleFieldEdit CardList__infoBtn'
                                    onClickFunc={ () => {
                                        setShowModal(true)
                                    } } />
                    </div>
                </div>
                <div className="op__details">
                    <div className="op__box">
                        <h4>Comp Approach</h4>
                        <p className="op__bigMoney">{ formatMoney(activePropertyReport.oov) }</p>
                        <p className="op__resultValue">Target Range:</p>
                        <p className="op__smCentered">{formatRange(activePropertyReport._25_75)}</p>
                    </div>
                    <div className="op__box">
                        <h4>Income Approach</h4>
                        <p className="op__bigMoney">{ formatMoney(incVal) }</p>
                        <p className="op__resultValue">Market Rent:</p>
                        <p className="op__smCentered">{ formatMoney(mktRent) }</p>
                    </div>
                    <div className="op__box opBox__double">
                        <h4>Search</h4>
                        <div>
                            <div className="opBox__half">
                                <p className="op__resultValue">Standard Deviation: </p>
                                <p>{formatMoney(activePropertyReport.stdDev)}</p>
                                <p>Sample Size: { activePropertyReport.sampleSize }</p>
                                <p className="op__resultValue">Search Radius: { activePropertyReport.searchRad }</p>
                            </div>
                            <div className="opBox__half">
                                <p className="op__resultValue">Price Range: </p>
                                <p>{ formatRange(activePropertyReport.priceRange) }</p>
                                <p className="op__resultValue">Bedrooms: { property.bedrooms }</p>
                            </div>
                            <div className="opBox__half">
                                <p className="op__resultValue">10-90 Price Range: </p>
                                <p>{ formatRange(activePropertyReport._10_90) }</p>
                                <p className="op__resultValue">School District: { property.schoolDistrict }</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Map">
                <div className="googleMapContainer" style={{height: '52vh', width: 'auto'}}>
                    <GoogleMapReact bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                                    defaultCenter={defaultMapProps.center}
                                    defaultZoom={defaultMapProps.zoom} >
                        {mapMarkerList}
                    </GoogleMapReact>
                </div>
            </div>
            <CardList list={comps} />
            <Modal size='xl' className="Marketplace__DetailModal Marketplace__compReport-edit" show={showModal} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Comp Report (Agent Only)</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/*Card list of comps with queue and 5 active.*/}
                    {/*Each needs to activate Select/Remove, mapview, streetview, gallery, edit modal on different element clicks.*/}
                    {/*Sticky calculator sidebar with save, cancel and home card*/}
                    <CompWorkup type={type}/>                
                </Modal.Body>
            </Modal>
            {/*Modal thing*/}
            
        </div>
    )
}

const mapStateToProps = state => ({
    focusedProp: state.marketplace.focusedProp
})

export default connect(mapStateToProps, null)(CompView)

//ToDO: right now we are pulling compReport from shared state but the focused property is still passed though props and is needed for rent numbers used in this component. 
//on the full marketplace refactor we can simplify one the focusedPropety is available in SS and the rent data can be pulled from there. 
// the main chalange to the current set up is that when the compReport is updated only the interation in ss will be updated with the db. the old verstion of the record will still be 
// active in the componoent state. this can be an issue if the user leaves and then reopens this component on the same record (5/12/2021ap).

//update chaged shared state item to foucusedProp which includes the comp report. This shoul be a non breaking change since it set in detalsModel which is a universaly used componnet (5/13/2021ap)


