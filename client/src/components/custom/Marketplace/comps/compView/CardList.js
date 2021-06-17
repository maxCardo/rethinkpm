import React, {useEffect, useState} from "react"
import VerticalTable from "../../../../core/VerticalTable/VerticalTable"
import IconButton from "../../../../core/IconButton/IconButton"
import missingImage from '../../../../../img/missingImage.jpg'

const CardList = ({list}) => {

    const [comps, setComps] = useState([])

    const headers = [
        {
            label: 'Date Listed',
            accessor: 'listing_id.listDate',
            mapper: (date) => date ? getFormattedDate(new Date(date)) : 'No Date',
        },
        {
            label: 'Date Contingent',
            accessor: 'listing_id.lastSold.date',
            mapper: (date) => date ? getFormattedDate(new Date(date)) : 'No Date',
        },
        {
            label: 'Date Sold',
            accessor: 'listing_id.lastSold.date',
            mapper: (date) => date ? getFormattedDate(new Date(date)) : 'No Date',
        },
        {
            label: 'Days On Market',
            accessor: 'listing_id.listDate',
            mapper: (date) => {
                var today = new Date();
                return today;
            }
        },
        {
            label: 'comp adjustments',
            accessor: 'adjustments',
            mapper: (adj) => moneyFormat(adj.bathromms + adj.sqft),
        },
        {
            label: 'Adjusted Price',
            accessor: 'adjSalePrice',
            mapper: (price) => moneyFormat(price),
        }
    ];

    useEffect(() => {
        const props = list && list

        if (props) {
            setComps(props);
        }

    }, [list])

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
        const [activeComp, setActiveComp] = useState(-1)

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
            <li id={`target${comp.listing_id ? comp.listing_id._id : 'notraget' + idx}`}>
                {/* This is full width */}
                <div className="Comp__details-imgContainer" style={{backgroundImage: 'url(' +mainImage + ')', backgroundSize: 'cover', backgroundPosition: 'center center', minHeight: '220px'}}>
                    {/*This is full height <img src={mainImage} alt="The property image"/>*/}
                </div>
                <div className="Comp__details-container">
                    <div className="Comp__details">
                        <span>Status: {compMlsStatus ? getFormattedStatus(compMlsStatus) : 'Unknown'}</span>
                        {/* toDo: make sold price smaller add header */}
                        <span className="Comp__details-prices">{moneyFormat(price)} <span>({(compMlsStatus === "S") && priceSold ? 'Sold: '+ moneyFormat(priceSold) : 'N/A' })</span></span>
                        {/* remove headers from address and area */}
                        <span className="Comp__details-address">{address}</span>
                        {/* remove tiles for bd bth make on line like website */}
                        <div className="Comp__details-bar">
                            {bedrooms ? <span>Bedrooms: {bedrooms}</span> : ''}
                            {baths ? <span>Baths: {baths}</span> : ''}
                            {buildingSize ? <span>{buildingSize} sq.ft</span> : ''}
                        </div>
                    </div>
                </div>
                <div className={'CompListing__details ' + ((activeComp > -1) && (activeComp === idx) ? 'open' : '')}>
                    <VerticalTable headers={headers} data={comp}/>
                </div>
                <IconButton placement='bottom'
                            tooltipContent={activeComp!==idx ? 'View more details' : 'Hide Details'}
                            iconClass='fas fa-info'
                            variant='action-button'
                            btnClass='singleFieldEdit CardList__infoBtn'
                            onClickFunc={ () => activeComp!==idx ? setActiveComp(idx) : setActiveComp(-1) } />
                <div className="Comp__details-footer">
                    <p>Curtecy from our partners, the United Federation of Planets</p>
                </div>
            </li>
        )
    }

    const compList = (comps) && comps.map((comp, idx) => {
        return (<ListItem key={idx} idx={idx} comp={comp}/>);
    })

    return (<ul className="Comps">
        {compList}
    </ul>)
}

export default CardList;