import React, {useEffect, useRef, useState} from "react"
import IconButton from "../../../core/IconButton/IconButton"
import missingImage from '../../../../img/missingImage.jpg'

const EditCompReport = ({list}) => {
    const hasProps = useRef(0);
    const [comps, setComps] = useState([])
    const [theCompsList, setTheCompsList] = useState([])

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

    const ListItem = ({comp, idx}) => {

        const compMlsStatus = comp && comp.listing_id && comp.listing_id.mlsStatus;
        const priceSold = comp && comp.listing_id && comp.listing_id.soldPrice;
        const streetNumber = comp && comp.listing_id && comp.listing_id.streetNumber;
        const streetName = comp && comp.listing_id && comp.listing_id.streetName;
        const municipality = comp && comp.listing_id && comp.listing_id.municipality ? comp.listing_id.municipality : '' ;
        const area = comp && comp.area;
        const address = `${streetNumber} ${streetName}, ${municipality} (${area})`;
        const bedrooms = comp && comp.listing_id && comp.listing_id.bedrooms;
        const baths = comp && comp.listing_id && comp.listing_id.totalBaths && comp.listing_id.totalBaths;
        const buildingSize = comp && comp.listing_id && comp.listing_id.buildingSize;
        const mainImage = comp && comp.listing_id && comp.listing_id.images &&  comp.listing_id.images.length > 0 ? comp.listing_id.images[0] : missingImage;

        const currentPrice = comp && comp.listing_id && comp.listing_id.currentPrice ? comp.listing_id.currentPrice : false;
        const listingPrice = comp && comp.listing_id && comp.listing_id.listPrice ? comp.listing_id.listPrice : false;
        const price = currentPrice ? currentPrice : listingPrice

        return (
            <li key={idx} className="EditComp__card">
                {/* This is full width */}
                <div className="Comp__details-imgContainer" style={{backgroundImage: 'url(' +mainImage + ')', backgroundSize: 'cover', backgroundPosition: 'center center', minHeight: '220px'}}>
                    {/*This is full height <img src={mainImage} alt="The property image"/>*/}
                </div>
                <IconButton placement='bottom'
                            tooltipContent='Click to remove from List'
                            iconClass='fas fa-check'
                            variant='action-button'
                            btnClass='singleFieldEdit CardList__infoBtn'
                            onClickFunc={ () => onCompRemove(idx) } />
                <div>
                    <div className="Comp__details">
                        <span>Status: {compMlsStatus ? getFormattedStatus(compMlsStatus) : 'Unknown'}</span>
                        <span className="Comp__details-prices">{moneyFormat(price)} <span>({(compMlsStatus === "S") && priceSold ? 'Sold: '+ moneyFormat(priceSold) : 'N/A' })</span></span>
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

    return (<ul className="Comps">
        {theCompsList}
    </ul>)
}

export default EditCompReport;