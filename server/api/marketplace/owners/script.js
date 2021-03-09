const SalesListings = require('../../../db/models/sales/SalesListings')
const {getOwnerProps} = require('../../../3ps/county')

//@desc get data on owners other propertie holdings and transactions from county records
const getOwnerData = async (list_id) => {
    const listing = await SalesListings.findById(list_id)
    const { address1, address2, city_state, zip } = listing.ownerAddress
    const searchString = `${address1} ${address2} ${city_state} ${zip}`
    const res = await getOwnerProps(searchString)
    //if no re update county rec  and searchString?
    const numProps = res.length
    const returnArr = res.map((prop) => {
        const obj = {
            subject: prop.PARID === listing.lotBlock ? true : false,
            lot_block: prop.PARID,
            type: prop.USEDESC,
            number: prop.PROPERTYHOUSENUM,
            street: prop.PROPERTYADDRESS,
            city: prop.PROPERTYCITY,
            purchaseDate: prop.SALEDATE,
            PurchasePrice: prop.SALEPRICE,
        }
        return obj
    });
    const propDetails = await updateRecs(returnArr)

    const ownerRec = {
        numProps,
        propDetails
    }
    console.log('ownersRec: ', await ownerRec);

    return await ownerRec
    
}

//@desc support function for getOwnerData
const updateRecs = async (records) => {
    const updated = records.map(async (prop) => {
        const listingHistory = await SalesListings.find({ lotBlock: prop.lot_block })
        if (listingHistory.length) {
            const active = listingHistory.filter(x => x.mlsStatus === 'A')
            const mlsHistory = listingHistory.map((record) => {
                return {
                    listNumber: record.listNumber,
                    status: record.mlsStatus,
                    listDate: record.ListDate,
                    soldDate: record.saleDate,
                    soldPrice: record.soldPrice

                }
            })
            return {
                ...prop,
                mlsData: true,
                active: active.length ? true : false,
                activeListing: active.length ? active[0] : null,
                history: mlsHistory,
                //listings: listingHistory

            }
        } else {
            return { ...prop, mlsData: false }
        }
    })

    return Promise.all(updated)

}


module.exports = {getOwnerData}

