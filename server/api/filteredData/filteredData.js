const express = require('express')

const PropertyRecords = require('../../db/models/propertyRecords/PropertyRecords')
const OwnerRecords = require('../../db/models/propertyRecords/OwnerRecords')
const PropertyFilter = require('../../db/models/propertyRecords/PropertyFilter')
const PropertyKeys = require('../../db/models/propertyRecords/propertyRecKeys')

const {createFilter, convertFiltersToQuery} = require('./scripts')

const router = express.Router()

//@desc: Intergrated data models to be used with filter wrapper component 
const models = {
    propertyRecord: {
        data: PropertyRecords,
        filters: PropertyFilter,
        keys: PropertyKeys
    }
}

// @route: GET api/watchlist
// @desc: get items in watchlist
// @ access: pulic - todo: make privite in future
router.get('/:model', async (req, res) => {
    try {
        const collection = models[req.params.model].data
        const count = await collection.find().countDocuments()
        const list = await collection.find().limit(100)
        res.status(200).send({count,list})

    } catch (err) {
        console.error(err);
        res.status(500).send('err')
    }
})

// @route: get /api/marketPlace/ops/filters
// @desc: get saved filters when component loads
// @ access: Public 
router.get('/savedFilters/:model', async (req, res) => {
    const collection = models[req.params.model].filters
    const filters = await collection.find({})
    const data = filters.map((filter) => ({
      label: filter.name,
      value: {filters: filter.filters, _id: filter._id, blacklist: filter.blacklist}
    }))
    res.send(data)
})

// @route: GET api/watchlist
// @desc: get filter options for all "array fields in FILTERFIELDS"
// @ access: pulic - todo: make privite in future
router.post('/filterOptions/:model', async (req, res) => {
    try {
        const collection = models[req.params.model].data
        const keys = models[req.params.model].keys
        //console.log('this is the collection: ',collection)
        const data = req.body
        //console.log('this is the data : ', data)
        
        //console.log('getPropKeys: ', keys)

      const comboArr = Object.keys(data).map(async (x) => {
        if (data[x].dataType === 'array') {
          if (data[x].boolean) {
            return {key: x, value : ([{label: 'True', value: true},{label: 'False', value: false}])}  
          }
          const res = await collection.distinct(data[x].accessor, {[data[x].accessor] : {$nin: ['', null]}})
          //console.log('res: ', x ,  res)
          return {key: x, value : res.map(option => ({label: keys && keys[x] && keys[x][option] ? keys[x][option] : option , value: option}))}
        }else return {key: x, value : ([{label: '', value: ''},{label: '', value: ''}])}
      })
      //convert to newsted object format used by component
      const returnObj = (await Promise.all(comboArr)).reduce((obj, item) => (obj[item.key] = item.value, obj) ,{});
      //console.log('returnObh: ', returnObj)
      res.status(200).send(returnObj)

    } catch (err) {
        console.error(err);
        res.status(500).send('err')
    }
})

// @route: GET /api/scanner/loadFilter
// @desc: load a new filter or selected saved filter (pageSize functionality is not currently being utilized by the front end)
// @ access: Public * ToDo: update to make private
router.post('/loadFilter/:model', async (req, res) => {
    try {
        const collection = models[req.params.model].data
        //const PAGESIZE = req.body.pageSize;
        //console.log('PAGESIZE: ',PAGESIZE, req.body.page);
        const data = req.body.filters
        let filters = []
        console.log('this is the data: ', data)
        console.log(data.length)
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
        const queryObj = convertFiltersToQuery(filters)
        let count = await collection.find(queryObj).countDocuments()
        let record = await collection.find(queryObj).limit(100)

        //if we make resuable how can we use populate???

        //ToDo: can incorperate page size on table component at a future data
        // let record;
        // if (req.body.page) {
        //     if(PAGESIZE) {
        //       console.log('if fired on 168');
        //       record = await SalesListings.find(queryObj).populate({ path: 'compReport', populate: { path: 'comps.listing_id' }}).skip(PAGESIZE * (+req.body.page)).limit(PAGESIZE + 1)
        //     } else {
        //       console.log('if fired on 171');
        //       record = await SalesListings.find(queryObj).populate({ path: 'compReport', populate: { path: 'comps.listing_id' } })
        //     }
        // } else {
        //     record = await SalesListings.find(queryObj).populate({ path: 'compReport', populate: { path: 'comps.listing_id' }})
        //     console.log('line 176: ', record.length);
        // }
        
        // let hasMore = false;
        // if (record.length > PAGESIZE) {
        //     hasMore = true;
        //     record.pop()
        // }
  
        //handle blacklist on front end ???
        
        const blacklist = req.body.blacklist
        //console.log('blacklist: ', blacklist)
        if(blacklist) {
          record = record.filter((listing) => !blacklist.includes(listing._id.toString()))
        }

        //res.status(200).send({ record, filters, hasMore });
        res.status(200).send({ count, record, filters});
  
    } catch (error) {
        console.error(error);
        res.status(400).send('server error')
    }
});

// @route: post /api/marketPlace/ops/filters
// @desc: save new filter selected
// @ access: Public 
router.post('/saveFilter/:model', async (req, res) => {
  const collection = models[req.params.model].filters
  const {name, filter} = req.body
  const tkrFilter = new collection({name, filters: filter})
  const data = await tkrFilter.save()
  res.send({label: data.name, _id: data._id})
})

// @route: get /api/scanner/blacklist
// @desc: blacklist record from saved filter
// @ access: Public 
//ToDo : make user spacific
router.put('/blacklist/:model', async (req, res) => {
  const collection = models[req.params.model].filters
  const {filter_id, item_id} = req.body
  const savedFilter = await collection.findById(filter_id)
  savedFilter.blacklist.push(...item_id)
  const rec = await savedFilter.save()
  res.status(200).send(rec)
})

module.exports = router