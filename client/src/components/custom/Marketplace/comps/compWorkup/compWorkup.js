import React, { useEffect, useState, Fragment } from 'react'
import {connect} from 'react-redux'
import { Button } from 'react-bootstrap';
import IconButton from "../../../../core/IconButton/IconButton";
import { formatMoney, formatRange } from "../../../../../util/commonFunctions";
import EditCompReport from "./editCompReport";
import EditCompListingModal from "./models/EditCompListingModal";
import missingImage from '../../../../../img/missingImage.jpg'

//actions

// like
// blacklist
//Property condition A-D
//area condition
//parking
//stairs

const CompWorkup = ({showModal, hideModal, focusedProp}) => {

    const [comps, setComps] = useState([])
    /* MODAL state*/
    const [activeComp, setActiveComp] = useState({});
    const [property, setProperty] = useState({});
    const [activePropertyReport, setActivePropertyReport] = useState({});
    const [propertyEditModal, setPropertyEditModal] = useState(false)
   
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

    }, [focusedProp])

    const handlePropertyEdit = (value) => {
        setPropertyEditModal(value)
    }


    return (
       <Fragment>
            < div className="flex-between" >
                <div className="editComps__container">
                    <EditCompReport list={comps} report={activePropertyReport} />
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
                            <p className="op__bigMoney">{formatMoney(activePropertyReport.oov)}</p>
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
            {property && propertyEditModal && (
                <EditCompListingModal modalOpen={propertyEditModal} openModal={handlePropertyEdit} activeComp={property} />
            )}
       </Fragment>
    )

}

const mapStateToProps = state => ({
    focusedProp: state.marketplace.focusedProp
})

export default connect(mapStateToProps, null)(CompWorkup)

    