import React, {useEffect, useState} from "react"
import VerticalTable from "../../../core/VerticalTable/VerticalTable"
import IconButton from "../../../core/IconButton/IconButton"
import missingImage from '../../../../img/missingImage.jpg'

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

    console.log('list')
    console.log(list)

    useEffect(() => {
        const props = list && list

        if (props) {
            setComps(props);
            console.log('theComps')
            console.log(props)
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
        const address = comp && comp.listing_id && comp.listing_id.address;
        const area = comp && comp.listing_id && comp.listing_id.area;
        const bedrooms = comp && comp.listing_id && comp.listing_id.bedrooms;
        const baths = comp && comp.listing_id && comp.listing_id.totalBaths && comp.listing_id.totalBaths;
        const listDate = comp && comp.listing_id && comp.listing_id.listDate ? getFormattedDate(new Date(comp.listing_id.listDate)) : 'nodate';
        const buildingSize = comp && comp.listing_id && comp.listing_id.buildingSize;
        const mainImage = comp && comp.listing_id && comp.listing_id.images &&  comp.listing_id.images.length > 0 ? comp.listing_id.images[0] : missingImage;

        // TODO: needs review
        const currentPrice = comp && comp.adjSalePrice ? comp.adjSalePrice : false;
        const listingPrice = comp && comp.listing_id && comp.listing_id.listPrice ? comp.listing_id.listPrice : false;


        console.log('CardList comp')
        console.log(comp && comp)

        return (
            <li>
                <div className="Comp__details-container" style={{backgroundImage: `url(${mainImage})`, backgroundPosition: 'cover'}}>
                    <div className="Comp__details">
                        <span>Status: {compMlsStatus ? getFormattedStatus(compMlsStatus) : 'Unknown'}</span>
                        <span class="Comp__details-prices">{currentPrice ? moneyFormat(currentPrice) : moneyFormat(listingPrice)} ({(compMlsStatus === "S") && priceSold ? moneyFormat(priceSold) : 'Not Sold' })</span>
                        <span class="Comp__details-address">Address: {address}</span>
                        <span className="Comp__details-address">Area: {area}</span>
                        <div className="Comp__details-bar">
                            {bedrooms ? <span>Bedrooms: {bedrooms}</span> : ''}
                            {baths ? <span>Baths: {baths}</span> : ''}
                            {buildingSize ? <span>buildingSize: {buildingSize}sq.ft</span> : ''}
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