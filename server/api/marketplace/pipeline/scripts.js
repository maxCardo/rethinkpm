const SalesListings = require('../../../db/models/sales/SalesListings')
const Pipeline = require('../../../db/models/sales/Pipeline')
const {getIdxSavedListings} = require('../../../3ps/idx')




//sync pipeline, todo: create new record if liked deal is not in our DB
const syncPipeline = async (buyerId) => {
    console.log('running')
    return new Promise(async (resolve, reject) => {
        const deals = await Pipeline.find({ buyer: buyerId }).populate('buyer').populate('deal')
        const idxDeals = await getIdxSavedListings(deals[0].buyer.idxId)
        const activeDeals = deals.filter(record => record.status === 'liked').map(record => record.deal.listNumber)
        const newIdxDeals = idxDeals.data.filter((record) => !activeDeals.includes(record.property.listingID))

        if (newIdxDeals.length) {
            newIdxDeals.forEach(async (record) => {
              let dealIndex = deals.findIndex((x) => x.deal.listNumber === record.property.listingID);
              console.log('dealIndex: ', dealIndex);
              let deal = [];
              if (!dealIndex.length) {
                const property = await SalesListings.findOne({listNumber: record.property.listingID})
                deal = await new Pipeline({
                  buyer: buyerId,
                  deal: property._id,
                  idxDealId: record.id,
                  status: 'liked',
                  history: [
                    {
                      event: 'liked',
                      statusTo: 'liked',
                      note: 'property liked on website',
                    },
                  ],
                });
                await deal.save();
                deal.deal = property;
                deals.push(deal);
                console.log('adjusted deals',deals.filter((x) => x.status === 'liked').map((x) => x.deal.listNumber));
                console.log('resolving if if');
                resolve(deals);
              } else {
                console.log('else');
                deal = await Pipeline.findById(deals[dealIndex]._id)
                (deal.idxDealId = record.id),
                  deal.history.push({
                    event: 'liked',
                    statusTo: 'liked',
                    statusFrom: deal.status,
                    note: 'property liked from website',
                  });
                deal.status = 'liked';
                await deal.save();
                deals[dealIndex] = deal
                console.log('resolving if else');
                resolve(deals)
              }
            })
        }else{
            console.log('resolving promise main else');
            resolve(deals)
        }        
        
    })
}


module.exports = {syncPipeline}