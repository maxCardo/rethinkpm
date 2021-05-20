import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Button, Modal} from 'react-bootstrap';
import CardList from "./CardList";
import {mortgageCalc, incomeValue} from '../mortgageCalc'
import ProfileIcon from "../../../../core/ProfileIcon";
import {formatMoney, formatRange} from "../../../../../util/commonFunctions";
import IconButton from "../../../../core/IconButton/IconButton";
import EditCompReport from "../compWorkup/editCompReport";
import missingImage from '../../../../../img/missingImage.jpg'
import '../style.css'
import EditCompListingModal from "../compWorkup/models/EditCompListingModal";


const CompView = ({focusedProp}) => {

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
        const compReport = props.compReport
        console.log('compReport');
        console.log(compReport);

        if (props) {
            
            const theComps = compReport.comps ? compReport.comps : [];
            const theReport = compReport.price;
            setComps(theComps);
            setProperty(props);
            setActivePropertyReport(theReport)

            console.log('comps');
            console.log(theComps);

        }

        //calculate NOI issues: no reserves, taxes based on current which can be low
        const areaRents = props.rents.area  > 0 ? props.rents.area : null 
        const subRent = props.rents.HA.rent > 0 ? props.rents.HA.rent : null
        const rents = areaRents && areaRents < subRent ? areaRents : subRent 
        const { rentalIncome, vacancyLoss, management, leasing, maintenance, utilities, taxes, insurance } = props.model
        const totalExpPreTax = management + leasing + maintenance + utilities + insurance
        const netOpIncome = (rents*12) - vacancyLoss - totalExpPreTax - taxes.low
        mktIncomeValue(netOpIncome)
        setMktRent(rents)

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


    return (
        <div className="container-fluid flex-row">
            <div className="OwnedProperty">
                <div className="op__preparedBy">
                    <p>Prepared by:</p>
                    <div className="op__userBox">
                        <div className="op__userAvatar">
                            <ProfileIcon name={'Adam Poznanski'} size={35}/>
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
                <h2>This is map</h2>
            </div>
            <CardList list={comps} />

            {/*Modal thing*/}
            <Modal size='xl' className="Marketplace__DetailModal Marketplace__compReport-edit" show={showModal} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Comp Report (Agent Only)</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/*Card list of comps with queue and 5 active.*/}
                    {/*Each needs to activate Select/Remove, mapview, streetview, gallery, edit modal on different element clicks.*/}
                    {/*Sticky calculator sidebar with save, cancel and home card*/}
                    <div className="flex-between">
                        <div className="editComps__container">
                            <EditCompReport list={comps} report={activePropertyReport} />
                        </div>
                        <div className="calcSidebar">
                            <div  className="EditComp__card">
                                <div className="Comp__details-imgContainer" style={{backgroundImage: 'url(' +missingImage + ')', backgroundSize: 'cover', backgroundPosition: 'center center', minHeight: '220px'}}>
                                </div>
                                <IconButton placement='bottom'
                                            tooltipContent='Click to Edit Main Property'
                                            iconClass='fas fa-edit'
                                            variant='action-button'
                                            btnClass='singleFieldEdit CardList__infoBtn'
                                            onClickFunc={ () => handlePropertyEdit(true) } />
                                <div>
                                    <div className="Comp__details">
                                        <span>Status: {property.status}</span>
                                        <span className="Comp__details-prices">whaaat</span>
                                        <span className="Comp__details-address">meh</span>
                                        <div className="Comp__details-bar">
                                            {property.bedrooms ? <span>Bedrooms: {property.bedrooms}</span> : ''}
                                            {property.baths ? <span>Baths: {property.baths}</span> : ''}
                                            {property.buildingSize ? <span>{property.buildingSize} sq.ft</span> : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="Calculator">
                                <div className="activeReport">
                                    <p className="op__bigMoney">{ formatMoney(activePropertyReport.oov) }</p>
                                    <p className="op__resultValue">Target Range:</p>
                                    <p className="op__smCentered">{formatRange(activePropertyReport._25_75)}</p>
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
                </Modal.Body>
            </Modal>
            {property && propertyEditModal && (
                <EditCompListingModal modalOpen={propertyEditModal} openModal={handlePropertyEdit} activeComp={property}/>
            )}
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


