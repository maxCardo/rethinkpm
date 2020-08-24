const express = require('express')
const { postSlack } = require('../../3ps/slack')
const { addIdxUser } = require('../../3ps/idx')


const router = express.Router()


//---------------------------------------------------------------- Website Endpoints -------------------------------------------------------------------------------------//


// @route: post /api/marketPlace/website/newuser;
// @desc: create new user from website
// @ access: Public 
router.post('/newuser', async (req, res) => {
    try {
        console.log('new account:', req.body);
        //const idx_id = await addIdxUser({firstName:'API', lastName:'Testing', email:'adamp@fifthGrant.com'})
        res.status(200).send('success new idx user')
    } catch (err) {
        res.status(400).send(err)
    }
})

// @route: post /api/marketPlace/website/deal/view;
// @desc: record view on suggested deal
// @ access: Public 
router.post('/deal/view', async (req, res) => {
    try {
        console.log('view it:', req.body);
        res.status(200).send('success view')
    } catch (err) {
        res.status(400).send('server error')
    }
})

// @route: post /api/marketPlace/website/deal/like;
// @desc: record like or unlike on suggested deal
// @ access: Public 
router.post('/deal/like', async (req, res) => {
    try {
        console.log('liked/unliked it:', req.body);
        res.status(200).send('success like')
    } catch (err) {
        res.status(400).send('server error')
    }
})


module.exports = router