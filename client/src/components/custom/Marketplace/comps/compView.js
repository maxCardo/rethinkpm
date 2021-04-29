import React, {useEffect, useState} from 'react'
import {Button, Modal} from 'react-bootstrap';
import CardList from "./CardList";
import {mortgageCalc, incomeValue} from './mortgageCalc'
import ProfileIcon from "../../../core/ProfileIcon";
import {formatMoney} from "../../../../util/commonFunctions";
import IconButton from "../../../core/IconButton/IconButton";
import EditCompReport from "./editCompReport";


const CompView = (data) => {

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
        console.log('income value: ', res);
    }

    useEffect(() => {
        const props = data && data.data

        if (props) {
            const theComps = props && props.compReport && props.compReport.comps ? props.compReport.comps : [];
            const theReport = props && props.compReport && props.compReport.price ? props.compReport.price : {};
            setComps(theComps);
            setProperty(props);
            setActivePropertyReport(theReport)
            console.log('theComps')
            console.log(theComps)
        }

        //calculate NOI issues: no reserves, taxes based on current which can be low
        const areaRents = data.data.rents.area  > 0 ? data.data.rents.area : null 
        const subRent = data.data.rents.HA.rent > 0 ? data.data.rents.HA.rent : null
        const rents = areaRents && areaRents < subRent ? areaRents : subRent 
        const { rentalIncome, vacancyLoss, management, leasing, maintenance, utilities, taxes, insurance } = data.data.model
        const totalExpPreTax = management + leasing + maintenance + utilities + insurance
        const netOpIncome = (rents*12) - vacancyLoss - totalExpPreTax - taxes.low
        console.log('noi: ', netOpIncome);
        mktIncomeValue(netOpIncome)
        setMktRent(rents)

    }, [data])

    useEffect(() => {
        console.log('activePropertyReport')
        console.log(activePropertyReport)
    }, [comps])

    const hideModal = () => {
        setShowModal(false)
        setActiveComp({})
    }

    const formatRange = (value) => {
        const firstNumber = value && value.split(" - ")[0] && value.split(" - ")[0]
        const secondNumber = value && value.split(" - ")[0] && value.split(" - ")[1]
        return formatMoney(firstNumber) + ' - ' + formatMoney(secondNumber)
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
                                <p className="op__resultValue">Sample Size: { activePropertyReport.sampleSize }</p>
                                <p className="op__resultValue">Search Radius: { activePropertyReport.searchRad }</p>
                                <p className="op__resultValue">Price Range: { formatRange(activePropertyReport.priceRange) }</p>
                                <p className="op__resultValue">Standard Deviation: {formatMoney(activePropertyReport.stdDev)}</p>
                            </div>
                            <div className="opBox__half">
                                <p className="op__resultValue">Just This: { activePropertyReport._10_90 }</p>
                                <p className="op__resultValue">Search Radius: { activePropertyReport.searchRad }</p>
                                <p className="op__resultValue">Price Range: { formatRange(activePropertyReport.priceRange) }</p>
                                <p className="op__resultValue">Standard Deviation: {formatMoney(activePropertyReport.stdDev)}</p>
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
            <Modal size='xl' className="Marketplace__DetailModal Marketplace__DetailModal-edit" show={showModal} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Comp Report (Agent Only)</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/*Card list of comps with queue and 5 active.*/}
                    {/*Each needs to activate Select/Remove, mapview, streetview, gallery on different element clicks.*/}
                    {/*Sticky calculator sidebar with save, cancel and home card*/}
                    <div className="flex-between">
                        <div className="editComps__container">
                            <EditCompReport list={comps} report={activePropertyReport} />
                        </div>
                        <div className="calcSidebar">
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
                <Modal.Footer className="modalFooterBtns">
                    <Button className="btn btn-primary" disabled={false} variant="secondary"
                            onClick={() => console.log('submitIt')}
                    >
                        Submit
                    </Button>
                    <Button className="btn btn-danger" variant="secondary"
                            onClick={hideModal}
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CompView


