import React, {useEffect, useState} from "react";
import VerticalTable from "./VerticalTable/VerticalTable";

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

    const ListItem = ({comp}) => {
        const compMlsStatus = comp && comp.listing_id && comp.listing_id.mlsStatus;
        const priceSold = comp && comp.listing_id && comp.listing_id.soldPrice;
        const address = comp && comp.listing_id && comp.listing_id.address;
        const bedrooms = comp && comp.listing_id && comp.listing_id.bedrooms;
        const baths = comp && comp.listing_id && comp.listing_id.bathsFull + comp && comp.listing_id && comp.listing_id.bathsPartial;
        const listDate = comp && comp.listing_id && comp.listing_id.listDate ? getFormattedDate(new Date(comp.listing_id.listDate)) : 'nodate';
        const buildingSize = comp && comp.listing_id && comp.listing_id.buildingSize;
        const lotSize = comp && comp.listing_id && comp.listing_id.lotSize;

        const mainImage = comp && comp.listing_id && comp.listing_id.images &&  comp.listing_id.images.length > 0 ? comp.listing_id.images[0] : 'https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/4da9/9ad41255877c3678f411c740137735ed/d504';

        console.log('CardList comp')
        console.log(comp && comp)


        return (
            <li>
                <div className="Comp__details-container" style={{backgroundImage: `url(${mainImage})`, backgroundPosition: 'cover'}}>
                    <div className="Comp__details">
                        <span>Status: {compMlsStatus ? compMlsStatus : 'Unknown'}</span>
                        <span>Sale Price: {moneyFormat(comp.adjSalePrice)} | Sold: ({(compMlsStatus === "S") && priceSold ? moneyFormat(priceSold) : 'Not Sold' })</span>
                        <span>Address: {address}</span>
                        <span>Bedrooms: {bedrooms}</span>
                        <span>Baths: {baths}</span>
                        <span>Building Area: {buildingSize && buildingSize + 'sq.ft'}</span>
                        <span>Lot Area: {lotSize && lotSize + 'sq.ft'}</span>
                    </div>
                    <div className="CompListing__details">
                        <VerticalTable headers={headers} data={comp} />
                        <span>Date Listed: {listDate && listDate}</span>
                        <span>Date Contingent: </span>
                        <span>Date Sold: </span>
                        <span>Days On Market: </span>
                        <span>Adjustments: </span>
                        <span>Adjusted Price (adjusted value) </span>
                    </div>
                </div>
                <div className="Comp__details-footer">
                    <p>Curtecy from our partners, the United Federation of Planets</p>
                </div>

            </li>
        )
    }

    const compList = (comps) && comps.map((comp, idx) => {
        return (<ListItem key={idx} comp={comp}/>);
    })

    return (<ul className="Comps">
        {compList}
    </ul>)
}

export default CardList;