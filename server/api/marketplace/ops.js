const express = require('express')
const {sendEmail} = require('../../3ps/email')
const SalesListings = require('../../db/models/sales/SalesListings')

const router = express.Router()


// @route: post /api/marketPlace/ops
// @desc: 
// @ access: Public 
router.post('/recommend', async (req, res) => {
    try {
        const { property: propertyId, buyers: buyersId, customMessage } = req.body
        const property = await SalesListings.findById(propertyId)
        const buyers = await Promise.all(buyersId.map((buyerId) => BuyerPros.findById(buyerId)))
        buyers.forEach((buyer) => {
            let buyerEmail = buyer.email.filter((email) => email.isPrimary)[0]
            if (!buyerEmail) {
                buyerEmail = buyer.email[0]
            }
            const subject = `Property Recommendation`
            const text = customMessage
            const html = `
                <p>${customMessage}</p>
                <a href='http://cardo.idxbroker.com/idx/details/listing/d504/${property.listNumber}?bid=${buyer._id}&mode=recommend'>Property</a>
            `
            sendEmail(buyerEmail.address, subject, customMessage, html)
        })
        res.json({ ok: true })
    } catch (err) {
        res.status(500).send('server error')
    }
})

router.get('/listings', async (req,res) => {
  const listings = await SalesListings.find({}).limit(100)
  res.json(listings)
})

router.get('/kpi/numberOfListings', async (req, res) => {
  const actualNumber = 9000 + Math.floor(Math.random()*2000)
  const pastNumber = 9000 + Math.floor(Math.random()*2000)
  const porcentualChange = (((actualNumber - pastNumber) / pastNumber) * 100).toFixed(2)
  res.json({actualNumber, porcentualChange})
})

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
        filterFields.map((x) => {
            data[x].type.value !== 'noFilter' && filters.push({
                field: data[x].accessor,
                subField: data[x].subAccessor,
                filterType: data[x].type.value,
                operator: data[x].type.operator,
                value: typeof (data[x].value) === 'string' ? data[x].value : data[x].value.map((y) => y.value),
                secondValue: data[x].secondValue ? data[x].secondValue : ''
            })
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

      res.status(200).send({ record, filters, hasMore });

  } catch (error) {
      console.error(error);
      res.status(400).send('server error')
  }
});

function convertFiltersToQuery(filters) {
  //create string query 
  const queryObj = {}
  filters.map((x) => {
      if (x.filterType === 'range') {
          Object.assign(queryObj, {
              [x.field]: { [x.operator[0]]: x.value, [x.operator[1]]: x.secondValue }
          })
      } else if (x.subField) {
          Object.assign(queryObj, { [`${x.field}.${x.subField}`]: { [x.operator]: x.value } })
      } else {
          Object.assign(queryObj, { [x.field]: { [x.operator]: x.value } })
      }
  })
  return queryObj
}




module.exports = router