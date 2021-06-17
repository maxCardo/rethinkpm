import React, {useEffect, useRef, useState} from "react"
import {connect} from 'react-redux'
import IconButton from "../../../../core/IconButton/IconButton"
import missingImage from '../../../../../img/missingImage.jpg'
import robotAvatar from '../../../../../img/robotAvatar.png'
import {likeComp, unlikeComp} from '../../../../../actions/marketplace/comps'

const WorkUpTiles = ({list, simpleAction, openModel, like, unlike}) => {
    const hasProps = useRef(0);
    const [comps, setComps] = useState([])
    const [activeComp, setActiveComp] = useState({});
    
    // useEffect(() => {
    //     console.log('useEffect1 fired')
    //     const props = focusedProp.compReport.comps
    //     if (props && hasProps.current === 0) {
    //         setComps(props)
    //         hasProps.current = 1
    //     }

    // }, [focusedProp])

    // const likeComp = (compId) => {
    //     const updated = comps.map(comp => comp._id === compId ? comp.like != true ? { ...comp, like: true, blacklist: false } : { ...comp, like: false } : comp)
    //     setComps(updated)
    // }

    // const unlikeComp = (compId) => {
    //     const updated = comps.map(comp => comp._id === compId ? comp.blacklist != true ? { ...comp, blacklist: true, like: false } : { ...comp, blacklist: false } : comp)
    //     console.log(updated)
    //     setComps(updated)
    // }

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


    // var sliderSettings = {
    //     dots: true,
    //     infinite: false,
    //     slidesToShow: 3,
    //     slidesToScrikk: 1,
    //     variableWidth: true,
    //     cssEase: 'linear',
    // };

    // const handleGalleryClose = (value) => {
    //     setGalleryModalOpen(value);
    // }

    // const handleStreetViewModal = (value) => {
    //     setStreetViewModalOpen(value);
    // }

    // const handleStreetViewMode = (value) => {
    //     setStreetView(value);
    // }

    // const handleEditComp = (value) => {
    //     setCompEditModal(value)
    // }
    // const handleInfoComp = (value) => {
    //     setCompInfoModal(value)
    // }


    {/*TODO: Extract to separate component, last cause weird*/}
    const ListItem = ({comp, idx}) => {

        const onCompMapView = (index) => {
            // setStreetView(false);
            // setActiveComp(comps[index].listing_id)
            // setStreetViewModalOpen(true);
        }

        const onCompGalleryView = (index) => {
            // setActiveComp(comps[index].listing_id)
            // setGalleryModalOpen(true);
        }

        const onCompEditView = (index) => {
            // console.log(comps)
            // console.log(index)
            // setActiveComp(comps[index].listing_id)
            // setCompEditModal(true);
        }

        const onCompInfoView = (index) => {
            // setActiveComp(comps[index].listing_id)
            // setCompInfoModal(true);
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
                                btnClass={`singleFieldEdit CardList__likeBtn ${(comp.like === true) && 'selected'}`}
                                onClickFunc={() => like(comp._id)}/>

                    <IconButton placement='bottom'
                                tooltipContent='Click remove from comp list'
                                iconClass='fas fa-thumbs-down'
                                variant='action-button'
                                btnClass={`singleFieldEdit CardList__dislikeBtn ${(comp.blacklist === true) && 'selected'}`}
                                onClickFunc={() => unlike(comp._id)}/>

                    <IconButton placement='bottom'
                                tooltipContent='Click to view map area'
                                iconClass='fas fa-street-view'
                                variant='action-button'
                                btnClass='singleFieldEdit CardList__mapBtn'
                                onClickFunc={() => openModel('streetView',comp)}/>

                    {/*TODO: Dont show if activeProperty.images.length === 0*/}
                    <IconButton placement='bottom'
                                tooltipContent='Click to View Gallery'
                                iconClass='fas fa-images'
                                variant='action-button'
                                btnClass='singleFieldEdit CardList__galleryBtn'
                                onClickFunc={() => openModel('gallery',comp)}/>
                    <IconButton placement='bottom'
                                tooltipContent='Click to Fix'
                                iconClass='fas fa-tools'
                                variant='action-button'
                                btnClass='singleFieldEdit CardList__editBtn'
                                onClickFunc={() => openModel('edit',comp)}/>
                    <IconButton placement='bottom'
                                tooltipContent='Click for more Info'
                                iconClass='fas fa-info'
                                variant='action-button'
                                btnClass="CardList__compInfoBtn"
                                onClickFunc={() => openModel('info',comp)}/>
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
                {list.map((comp, idx) => (<ListItem comp={comp} key={idx} idx={idx}/>))}
            </ul>
            
        </>
    )
};

const mapStateToProps = state => ({
    focusedProp: state.marketplace.focusedProp
})

export default connect(mapStateToProps, {})(WorkUpTiles);