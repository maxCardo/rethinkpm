import React, {Fragment, useEffect, useRef, useState} from "react"
import IconButton from "../../../core/IconButton/IconButton"
import missingImage from '../../../../img/missingImage.jpg'
import {Button, Modal} from "react-bootstrap";
import Loading from "../../../core/LoadingScreen/Loading";
import {StreetView} from "react-google-map-street-view";

const EditCompReport = ({list}) => {
    const hasProps = useRef(0);
    const [comps, setComps] = useState([])
    const [theCompsList, setTheCompsList] = useState([])
    const [activeComp, setActiveComp] = useState({});

    useEffect(() => {

        const props = list && list
        if (props && hasProps.current === 0) {
            setComps(props)
            hasProps.current = 1
        }

    }, [list])

    useEffect(() => {

        if (hasProps.current === 1) {
            const compList = (comps) && comps.map((comp, idx) => {
                return (<ListItem key={idx} idx={idx} comp={comp}/>)
            })
            setTheCompsList(compList)
        }

    }, [comps])

    const moneyFormat = (sum) => {
        return (new Intl.NumberFormat('en-US',
            {style: 'currency', currency: 'USD'}
        ).format(sum))
    }

    const getFormattedDate = (date) => {
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');

        return month + '/' + day + '/' + year;
    }


    const getFormattedStatus = (status) => {
        if (status === 'S')
            return 'Sold'
        if (status === 'U')
            return 'Under Contract'
        if (status === 'C')
            return 'Contingent'
    }



    const ListItem = ({comp, idx}) => {
        const onCompRemove = (index) => {
            comps.splice(index, 1)
            setComps(comps)
            if (hasProps.current === 1) {
                const compList = (comps) && comps.map((comp, idx) => {
                    return (<ListItem key={idx} idx={idx} comp={comp}/>);
                })
                setTheCompsList(compList)
            }
        }

        const onCompMapView = (index) => {
            setStreetView(false);
            setActiveComp(comps[index].listing_id)
            setStreetViewModalOpen(true);
        }

        const onCompStreetView = (index) => {
            setStreetView(true);
            setActiveComp(comps[index].listing_id)
            setStreetViewModalOpen(true);
        }

        const onCompGalleryView = (index) => {
            console.log('onCompGalleryView index - ' + index);
        }
        const onCompEditView = (index) => {
            console.log('onCompEditView index - ' + index);
        }

        const compMlsStatus = comp && comp.listing_id && comp.listing_id.mlsStatus;
        const priceSold = comp && comp.listing_id && comp.listing_id.soldPrice;
        const streetNumber = comp && comp.listing_id && comp.listing_id.streetNumber;
        const streetName = comp && comp.listing_id && comp.listing_id.streetName;
        const municipality = comp && comp.listing_id && comp.listing_id.municipality ? comp.listing_id.municipality : '';
        const area = comp && comp.area;
        const address = `${streetNumber} ${streetName}, ${municipality} (${area})`;
        const bedrooms = comp && comp.listing_id && comp.listing_id.bedrooms;
        const baths = comp && comp.listing_id && comp.listing_id.totalBaths && comp.listing_id.totalBaths;
        const buildingSize = comp && comp.listing_id && comp.listing_id.buildingSize;
        const mainImage = comp && comp.listing_id && comp.listing_id.images && comp.listing_id.images.length > 0 ? comp.listing_id.images[0] : missingImage;

        const currentPrice = comp && comp.listing_id && comp.listing_id.currentPrice ? comp.listing_id.currentPrice : false;
        const listingPrice = comp && comp.listing_id && comp.listing_id.listPrice ? comp.listing_id.listPrice : false;
        const price = currentPrice ? currentPrice : listingPrice

        return (
            <li key={idx} className="EditComp__card">
                <div className="Comp__details-imgContainer" style={{
                    backgroundImage: 'url(' + mainImage + ')',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    minHeight: '220px'
                }}>
                </div>
                <IconButton placement='bottom'
                            tooltipContent='Click to remove from List'
                            iconClass='fas fa-trash'
                            variant='action-button'
                            btnClass='singleFieldEdit CardList__infoBtn'
                            onClickFunc={() => onCompRemove(idx)}/>
                <IconButton placement='bottom'
                            tooltipContent='Click to view map area'
                            iconClass='fas fa-map-marker-alt'
                            variant='action-button'
                            btnClass='singleFieldEdit CardList__mapBtn'
                            onClickFunc={() => onCompMapView(idx)}/>
                <IconButton placement='bottom'
                            tooltipContent='Click to street view'
                            iconClass='fas fa-street-view'
                            variant='action-button'
                            btnClass='singleFieldEdit CardList__streetViewBtn'
                            onClickFunc={() => onCompStreetView(idx)}/>
                <IconButton placement='bottom'
                            tooltipContent='Click to View Gallery'
                            iconClass='fas fa-images'
                            variant='action-button'
                            btnClass='singleFieldEdit CardList__galleryBtn'
                            onClickFunc={() => onCompGalleryView(idx)}/>
                <IconButton placement='bottom'
                            tooltipContent='Click to Fix'
                            iconClass='fas fa-tools'
                            variant='action-button'
                            btnClass='singleFieldEdit CardList__editBtn'
                            onClickFunc={() => onCompEditView(idx)}/>
                <div>
                    <div className="Comp__details">
                        <span>Status: {compMlsStatus ? getFormattedStatus(compMlsStatus) : 'Unknown'}</span>
                        <span className="Comp__details-prices">{moneyFormat(price)}
                            <span>({(compMlsStatus === "S") && priceSold ? 'Sold: ' + moneyFormat(priceSold) : 'N/A'})</span></span>
                        <span className="Comp__details-address">{address}</span>
                        <div className="Comp__details-bar">
                            {bedrooms ? <span>Bedrooms: {bedrooms}</span> : ''}
                            {baths ? <span>Baths: {baths}</span> : ''}
                            {buildingSize ? <span>{buildingSize} sq.ft</span> : ''}
                        </div>
                    </div>
                </div>
                <div className="Comp__details-footer">
                    <p>Curtecy from our partners, the United Federation of Planets</p>
                </div>
            </li>
        )
    }
    const [streetView, setStreetView] = useState(true);
    const [streetViewModalOpen, setStreetViewModalOpen] = useState(false);
    const apiKey = 'AIzaSyCvc3X9Obw3lUWtLhAlYwnzjnREqEA-o3o'
    const address = `${activeComp.streetNumber} ${activeComp.streetName}, Pittsburg, Pennsylvania`;

    return (
        <>
            <ul className="Comps">
                {theCompsList}
            </ul>

            {activeComp && streetViewModalOpen && <Modal size='xl'
                    className='StreetView__modal'
                    show={streetViewModalOpen}
                    onHide={() => {
                        console.log(activeComp)
                        setStreetViewModalOpen(false)
                    }}>
                <Modal.Header closeButton>
                    <Modal.Title>{streetView ? 'Street' : 'Map'} View </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StreetView address={address  + ' ' + activeComp.zipcode} APIkey={apiKey}
                                streetView={streetView}
                                zoomLevel={10}/>
                </Modal.Body>
                <Modal.Footer>
                    <IconButton onClickFunc={() => setStreetView(!streetView)}
                                fontSize={22}
                                btnClass='modal__action-button'
                                variant='action-button'
                                iconClass='fas fa-map-marker'
                                tooltipContent={`Change to ${streetView ? 'Map mode' : 'Street mode'}`}/>

                    <Button className='real-btn' variant='2' onClick={() => {
                        setStreetViewModalOpen(false)
                    }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>}
        </>
    )
};

export default EditCompReport;