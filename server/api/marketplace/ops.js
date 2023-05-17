const express = require('express')
const auth = require('../../middleware/auth')
const { sendEmail } = require('../../3ps/email')
const SalesListings = require('../../db/models/sales/SalesListings')
const BuyerPros = require('../../db/models/prospects/BuyerPros')
const Pipeline = require('../../db/models/sales/Pipeline')
const MarketFilter = require('../../db/models/sales/MarketFilter')
const AreaRents = require('../../db/models/sales/AreaRents')
const CompReport = require('../../db/models/sales/compReport')
const { parse } = require('json2csv');
const fs = require('fs')
const path = require('path')

const router = express.Router()

//router.use(auth)

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
// @desc: ---- depricated ---- migrated to /recomed in pipline
// @ access: Public
router.post('/recommend', auth, async (req, res) => {
    try {
        const { properties, buyers: buyersId, customMessage, agentId } = req.body
        const propertiesFetched = await Promise.all(properties.map((propertyId => SalesListings.findById(propertyId))))
        const buyers = await Promise.all(buyersId.map((buyerId) => BuyerPros.findById(buyerId)))
        buyers.forEach(async (buyer) => {
          //ToDo add beter workflow for recomendig a propety twice
          const propertyLinks = []
          for(let property of propertiesFetched) {
            const propertyId = property._id
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
            propertyLinks.push(`<a href='http://cardo.idxbroker.com/idx/details/listing/d504/${property.listNumber}?bid=${deal._id}&mode=recommend'>${property.streetNumber} ${property.streetName}</a>`)
          }
            let buyerEmail = buyer.email.filter((email) => email.isPrimary)[0]
            if (!buyerEmail) {
                buyerEmail = buyer.email[0]
            }
            const subject = `Property Recommendation`
            const text = customMessage
            const html =
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
// @desc: Filter the listings (pageSize functionality is not currently being utilized ny the front end)
// @ access: Public * ToDo: update to make private
router.post('/listings/filter', async (req, res) => {
  try {
      const PAGESIZE = req.body.pageSize;
      console.log('PAGESIZE: ',PAGESIZE, req.body.page);
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
            console.log('if fired on 168');
            record = await SalesListings.find(queryObj).populate({ path: 'compReport', populate: { path: 'comps.listing_id' }}).skip(PAGESIZE * (+req.body.page)).limit(PAGESIZE + 1)
          } else {
            console.log('if fired on 171');
            record = await SalesListings.find(queryObj).populate({ path: 'compReport', populate: { path: 'comps.listing_id' } })
          }
      } else {
          record = await SalesListings.find(queryObj).populate({ path: 'compReport', populate: { path: 'comps.listing_id' }})
          console.log('line 176: ', record.length);
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
      console.log('line 97: ', record.length);
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

router.post('/listings/:listingId/addData', async (req,res) => {
  const {listingId} = req.params
  const {condition, numUnits} = req.body
  const listing = await SalesListings.findById(listingId)
  listing.condition = condition
  listing.numUnits = numUnits
  await listing.save()
  res.json(listing)
})

router.post('/listings/:listingId/addUnitSch', async (req,res) => {
  const {listingId} = req.params
  const {unit} = req.body
  const listing = await SalesListings.findById(listingId);
  for(let i = 0; i < unit.numUnits; i++) {
    listing.unitSch.push(unit)
  }
  await listing.save()
  res.json(listing)
})

router.post('/listings/:listingId/modifyUnitSch', async (req,res) => {
  const {listingId} = req.params
  const {unit, unitType} = req.body
  const listing = await SalesListings.findById(listingId);
  let changeInTheNumUnits = false
  for(let i = 0; i < listing.unitSch.length; i++) {
    const unitSch = listing.unitSch[i]
    if(unitSch.unitType === unitType) {
      if(unitSch.numUnits !== unit.numUnits) {
        changeInTheNumUnits = true
      }
      break;
    }
  }
  let newUnitSch = listing.unitSch
  if(changeInTheNumUnits) {
    newUnitSch = newUnitSch.filter((unitSch) => unitSch.unitType != unitType)
    for(let i = 0; i < unit.numUnits; i++) {
      newUnitSch.push(unit)
    }
  } else {
    newUnitSch = newUnitSch.map((unitSch) => {
      if(unitSch.unitType == unitType) {
        const newUnit = {
          rent: unitSch.rent,
          ...unit 
        }
        return newUnit
      } else {
        return unitSch
      }
    })
  }
  listing.unitSch = newUnitSch
  await listing.save()
  res.json(listing)
})

router.post('/listings/:listingId/deleteUnitSch', async (req,res) => {
  const {listingId} = req.params
  const {unitType} = req.body
  const listing = await SalesListings.findById(listingId);
  const newUnitSch = listing.unitSch.filter((unitSch) => unitSch.unitType != unitType)
  listing.unitSch = newUnitSch
  await listing.save()
  res.json(listing)
})

router.post('/listings/:listingId/setRent', async (req,res) => {
  const {listingId} = req.params
  const {rent, unitSchId} = req.body
  const listing = await SalesListings.findById(listingId);
  const newUnitSch = listing.unitSch.map((unitSch) => {
    if(unitSch._id == unitSchId) {
      unitSch.rent = rent
    }
    return unitSch
  })
  listing.unitSch = newUnitSch
  await listing.save()
  res.json(listing)
})

router.post('/exportCsv', async (req, res) => {
  const {list} = req.body;
  const csv = parse(list)
  res.send(csv)
})

// @route: GET /api/marketplace/ops/area_rent
// @desc: get list of area rents available
// @ access: Public * ToDo: update to make private
router.get('/area_rent', async (req, res) => {
 try {
   const rents = await AreaRents.find({'data.success': true})
   res.status(200).send(rents);   
 } catch (err) {
   console.error(err);
   res.send(500).send('server error')
 } 
})



module.exports = router