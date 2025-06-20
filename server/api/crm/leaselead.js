const express = require("express");
const leaseLead = require("../../db/models/Leasing/LeaseLead");

const router = express.Router();

// @route: Get api/crm/leaselead
// @desc: get all leaseLead data
// @ access: private
router.get("/", async (req, res) => {
  console.log("calling leaselead");
  try {
    const data = await leaseLead.find().limit(10);
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// @route: POST api/crm/leaselead
// @desc: create a new leaseLead
// @access: private
router.post("/", async (req, res) => {
  try {
    const newLead = new leaseLead(req.body);
    console.log("new lead??", newLead);

    const savedLead = await newLead.save();
    res.status(201).json(savedLead);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to create lease lead", error: err });
  }
});

module.exports = router;
