import React, {Fragment, useEffect, useRef, useState} from "react"
import IconButton from "../../../core/IconButton/IconButton"
import missingImage from '../../../../img/missingImage.jpg'
import robotAvatar from '../../../../img/robotAvatar.png'
import GalleryModal from "./GalleryModal";
import StreetMapViewModal from "./StreetMapViewModal";
import EditCompListingModal from "./EditCompListingModal";

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

    const getFormattedStatus = (status) => {
        if (status === 'S')
            return 'Sold'
        if (status === 'U')
            return 'Under Contract'
        if (status === 'C')
            return 'Contingent'
    }

    {/*TODO: this needs to stay in container, or probably be removed completely */}
    const onCompRemove = (index) => {
        console.log('Removed comp with index ' + index );

        // comps.splice(index, 1)
        // setComps(comps)
        // if (hasProps.current === 1) {
        //     const compList = (comps) && comps.map((comp, idx) => {
        //         return (<ListItem key={idx} idx={idx} comp={comp}/>);
        //     })
        //     setTheCompsList(compList)
        // }
    }

    const [streetView, setStreetView] = useState(true)
    const [streetViewModalOpen, setStreetViewModalOpen] = useState(false)
    const [galleryModalOpen, setGalleryModalOpen] = useState(false)
    const [compEditModal, setCompEditModal] = useState(false)

    var sliderSettings = {
        dots: true,
        infinite: false,
        slidesToShow: 3,
        slidesToScrikk: 1,
        variableWidth: true,
        cssEase: 'linear',
    };

    const handleGalleryClose = (value) => {
        setGalleryModalOpen(value);
    }

    const handleStreetViewModal = (value) => {
        setStreetViewModalOpen(value);
    }

    const handleStreetViewMode = (value) => {
        setStreetView(value);
    }

    const handleEditComp = (value) => {
        setCompEditModal(value)
    }


    {/*TODO: Extract to separate component, last cause weird*/}
    const ListItem = ({comp, idx}) => {

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
            setActiveComp(comps[index].listing_id)
            setGalleryModalOpen(true);
        }

        const onCompEditView = (index) => {
            setActiveComp(comps[index].listing_id)
            setCompEditModal(true);
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

                    <IconButton placement='bottom'
                                tooltipContent='Click save to comp list'
                                iconClass='fas fa-thumbs-up'
                                variant='action-button'
                                btnClass={`singleFieldEdit CardList__likeBtn ${(idx < 10) && 'selected'}`}
                                onClickFunc={() => console.log('clicked like')}/>

                    <IconButton placement='bottom'
                                tooltipContent='Click remove from comp list'
                                iconClass='fas fa-thumbs-down'
                                variant='action-button'
                                btnClass='singleFieldEdit CardList__dislikeBtn'
                                onClickFunc={() => console.log('clicked not like')}/>

                    <IconButton placement='bottom'
                                tooltipContent='Click to view map area'
                                iconClass='fas fa-street-view'
                                variant='action-button'
                                btnClass='singleFieldEdit CardList__mapBtn'
                                onClickFunc={() => onCompMapView(idx)}/>

                    {/*TODO: Dont show if activeProperty.images.length === 0*/}
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
                    <IconButton placement='bottom'
                                tooltipContent='Click for more Info'
                                iconClass='fas fa-info'
                                variant='action-button'
                                btnClass="CardList__compInfoBtn"
                                onClickFunc={() => console.log('clicked more info')}/>
                </div>
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
                        <div className="op__userBox userBox__comp">
                            <div className="op__userAvatar">
                                <img src={robotAvatar} alt=""/>
                            </div>
                            <div className="op__userData">
                                <span>last edit</span>
                                <p>Max Cardo</p>
                                <p className="sub">Robot</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Comp__details-footer">
                    <p>Curtecy from our partners, the United Federation of Planets</p>
                </div>
            </li>
        )
    }

    return (
        <>
            <ul className="Comps">
                {theCompsList}
            </ul>
            {activeComp && streetViewModalOpen && (
                <StreetMapViewModal modalOpen={streetViewModalOpen} openModal={handleStreetViewModal} changeStreetView={handleStreetViewMode} activeComp={activeComp} streetView={streetView} />
            )}
            {activeComp && galleryModalOpen && (
                <GalleryModal modalOpen={galleryModalOpen} openModal={handleGalleryClose} activeComp={activeComp} sliderSettings={sliderSettings} />
            )}
            {activeComp && compEditModal && (
                <EditCompListingModal modalOpen={compEditModal} openModal={handleEditComp} activeComp={activeComp} />
            )}
        </>
    )
};

export default EditCompReport;