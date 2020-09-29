const express = require('express')
const auth = require('../../middleware/auth')
const { sendEmail } = require('../../3ps/email')
const SalesListings = require('../../db/models/sales/SalesListings')
const BuyerPros = require('../../db/models/prospects/BuyerPros')
const Pipeline = require('../../db/models/sales/Pipeline')
const MarketFilter = require('../../db/models/sales/MarketFilter')

const router = express.Router()

router.use(auth)

//filter options: refactor to get these from api
const zipcodeOptions = require('../../config/supportData/zipcodes')
const areaOptions = require('../../config/supportData/areas')
const conditionsOptions = require('../../config/supportData/conditions')
const rentTierOptions = require('../../config/supportData/rentTiers')
const propertyTypeOptions = require('../../config/supportData/propertyTypes')
const countyOptions = require('../../config/supportData/counties').map(option => ({label: option, value: option}))
const zoningOptions = require('../../config/supportData/zoning').map(option => ({label: option, value: option}))
const schoolDistrictOptions = require('../../config/supportData/schoolDistricts').map(option => ({label: option, value: option}))
const { filter } = require('../../config/supportData/areas')

// @route: post /api/marketPlace/ops/recommend
// @desc: 
// @ access: Public 
router.post('/recommend', auth, async (req, res) => {
    try {
        const { property: propertyId, buyers: buyersId, customMessage, agentId } = req.body
        const property = await SalesListings.findById(propertyId)
        const buyers = await Promise.all(buyersId.map((buyerId) => BuyerPros.findById(buyerId)))
        buyers.forEach(async (buyer) => {
          //ToDo add beter workflow for recomendig a propety twice
            let deal = await Pipeline.findOne({buyer: buyer._id, deal: propertyId})
            if (!deal) {
              deal = await new Pipeline({
                buyer: buyer._id,
                agent: req.user,
                deal: propertyId,
                status: 'recommend',
                history: [
                  {
                    event: 'recommend',
                    statusTo: 'recommend',
                  },
                ],
              });  
            } else {
              deal.status = 'recommend'
              deal.history.push({
                event: 'recommend',
                statusTo: 'recommend',
                statusFrom: deal.status,
                note: 'property rerecomended from marketplace'
              })
            }
            await deal.save();
            let buyerEmail = buyer.email.filter((email) => email.isPrimary)[0]
            if (!buyerEmail) {
                buyerEmail = buyer.email[0]
            }
            const subject = `Property Recommendation`
            const text = customMessage
            const html = `
                <p>${customMessage}</p>
                <a href='http://cardo.idxbroker.com/idx/details/listing/d504/${property.listNumber}?bid=${deal._id}&mode=recommend'>Property</a>
            `
            sendEmail(buyerEmail.address, subject, customMessage, html)
        })
        res.json({ ok: true })
    } catch (err) {
        console.error(err);
        res.status(500).send('server error')
    }
})

// @route: post /api/marketPlace/ops/filters
// @desc: 
// @ access: Public 
router.post('/filters', async (req, res) => {
  const {name, filters} = req.body
  const marketFilter = new MarketFilter({name, filters})
  await marketFilter.save()
  res.send({ok: true})
})

// @route: get /api/marketPlace/ops/filters
// @desc: 
// @ access: Public 
router.get('/filters', async (req, res) => {
  const filters = await MarketFilter.find({})
  res.send({filters})
})

router.post('/filters/:filterId/blacklist', async (req, res) => {
  const {filterId} = req.params;
  const {listingId} = req.body;
  const marketFilter = await MarketFilter.findById(filterId)
  marketFilter.blacklist.push(listingId)
  await marketFilter.save()
});




// @route: GET /api/marketplace/ops/filterOptions
// @desc: Get options for filter fields used by filter filtersModal comp (agentPros) 
// @ access: Public * ToDo: update to make private
router.get('/filterOptions', async (req, res) => {
  const options = {}
  try {
      options.zip = zipcodeOptions
      options.area = areaOptions
      options.condition = conditionsOptions
      options.opZone = [
        {
          label: 'true',
          value: true
        },
        {
          label: 'false',
          value: false
        },
      ]
      options.rentTier = rentTierOptions
      options.type = propertyTypeOptions
      options.schoolDistrict = schoolDistrictOptions
      options.county = countyOptions
      options.zoning = zoningOptions
      res.status(200).send(options);
  } catch (error) {
      console.error(error);
      res.status(400).send('server error')
  }
});



// @route: GET /api/marketplace/ops/listings/filter
// @desc: Filter the listings
// @ access: Public * ToDo: update to make private
router.post('/listings/filter', async (req, res) => {
  try {
      const PAGESIZE = req.body.pageSize;
      const data = req.body.filters
      let filters = []
      if(data.length) {
        filters = data
      } else {
        const filterFields = Object.keys(req.body.filters);
        //create filter object
        filterFields.forEach((x) => {
            if(data[x].type.value !== 'noFilter') {
              filters.push(createFilter(data,x))
            }
        })
      }

      
      //create string query 
      const queryObj = convertFiltersToQuery(filters)
      //query DB
      let record;
      if (req.body.page) {
          if(PAGESIZE) {
            record = await SalesListings.find(queryObj).skip(PAGESIZE * (+req.body.page)).limit(PAGESIZE + 1)
          } else {
            record = await SalesListings.find(queryObj)
          }
      } else {
          record = await SalesListings.find(queryObj).limit(PAGESIZE + 1)
      }
      
      let hasMore = false;
      if (record.length > PAGESIZE) {
          hasMore = true;
          record.pop()
      }

      const blacklist = req.body.blacklist
      if(blacklist) {
        record = record.filter((listing) => !blacklist.includes(listing._id.toString()))
      }
      //fill city with area if no city
      record = await record.map((listing) => {
        if (!listing.city) {
          listing.city = listing.area
        }
        return listing 
      })
      res.status(200).send({ record, filters, hasMore });

  } catch (error) {
      console.error(error);
      res.status(400).send('server error')
  }
});

function createFilter(data, filterName) {
  if(filterName === 'listAge') {
    const dateOne = new Date();
    dateOne.setDate(dateOne.getDate() - +data[filterName].value)
    let dateTwo = undefined
    if(data[filterName].secondValue) {
      dateTwo = new Date();
      dateTwo.setDate(dateTwo.getDate() - data[filterName].secondValue)
    }
    const transposeFilterType = {
      'range': 'range',
      '==': '==',
      '!=': '!=',
      '>': '<',
      '>=': '<=',
      '<': '>',
      '<=': '>='
    }
    const operatorPerFilterType = {
      'range': ['$lte', '$gte'],
      '==': '$eq',
      '!=': '$ne',
      '>': '$gt',
      '>=': '$gte',
      '<': '$lt',
      '<=': '$lte'
    }
    const filterType = transposeFilterType[data[filterName].type.value]
    const operator = operatorPerFilterType[filterType]
    return {
      field: 'listDate',
      filterType: filterType,
      operator: operator,
      value: dateOne,
      secondValue: data[filterName].secondValue ? dateTwo : ''
    }
  } else {
    return {
      field: data[filterName].accessor,
      subField: data[filterName].subAccessor,
      filterType: data[filterName].type.value,
      operator: data[filterName].type.operator,
      value: typeof (data[filterName].value) === 'string' ? data[filterName].value : data[filterName].value.map((y) => y.value),
      secondValue: data[filterName].secondValue ? data[filterName].secondValue : ''
    }
  }
}

function convertFiltersToQuery(filters) {
  //create string query 
  const queryObj = {}
  filters.map((x) => {
      if (x.filterType === 'range') {
          Object.assign(queryObj, {
              [x.field]: { [x.operator[0]]: x.value, [x.operator[1]]: x.secondValue }
          })
      } else {
          Object.assign(queryObj, { [x.field]: { [x.operator]: x.value } })
      }
  })
  // Add status filter to only show the active records
  Object.assign(queryObj, {
    'mlsStatus': { '$eq': 'A' }
  })
  return queryObj
}


router.post('/listings/:listingId/addCondition', async (req,res) => {
  const {listingId} = req.params
  const {condition} = req.body
  await SalesListings.findByIdAndUpdate(listingId, {$set: {condition}})
})

module.exports = router