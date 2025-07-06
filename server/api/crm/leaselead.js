const express = require("express");
const leaseLead = require("../../db/models/Leasing/LeaseLead");
const auth = require("../../middleware/auth");

const router = express.Router();
router.use(auth);

// @route: Get api/crm/leaselead
// @desc: get all leaseLead data with isEnabled: true, supports search and field filtering
// @ access: private
router.get("/", async (req, res) => {
  console.log("calling leaselead with params:", req.query);
  try {
    const filters = { isEnabled: true };
    const sortBy = { nextAction: -1 }; // -1 = descending, 1 = ascending

    // Handle field-based filtering
    if (req.query.field && req.query.value) {
      filters[req.query.field] = req.query.value;
    }

    // Handle search-based filtering
    if (req.query.search) {
      const { search } = req.query;
      const orQuery = "$or";
      filters[orQuery] = [
        { fullName: { $regex: search, $options: "i" } },
        { "email.address": { $regex: search, $options: "i" } },
        { "phoneNumbers.number": { $regex: search, $options: "i" } },
        { listingAddress: { $regex: search, $options: "i" } },
      ];
    }

    let data = await leaseLead.find(filters).sort(sortBy);

    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// @route: GET api/crm/leaselead/:id
// @desc: get a single leaseLead by id
// @access: private
router.get("/:id", auth, async (req, res) => {
  try {
    const lead = await leaseLead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lease lead not found" });
    }

    if (!lead.isEnabled) {
      return res.status(404).json({ message: "Lease lead is disabled" });
    }

    res.status(200).json(lead);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch lease lead", error: err });
  }
});

// @route: POST api/crm/leaselead
// @desc: create a new leaseLead
// @access: private
router.post("/", auth, async (req, res) => {
  try {
    if (Array.isArray(req.body.notes) && req.body.notes.length > 0) {
      req.body.notes = req.body.notes.map((note) => ({
        ...note,
        user: req.user._id,
      }));
    }
    const newLead = new leaseLead(req.body);
    const savedLead = await newLead.save();
    res.status(201).json(savedLead);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to create lease lead", error: err });
  }
});

// @route: PATCH api/crm/leaselead/:id
// @desc: soft delete a leaseLead by id (set isEnabled to false)
// @access: private
router.patch("/:id", auth, async (req, res) => {
  try {
    const updated = await leaseLead.findByIdAndUpdate(
      req.params.id,
      { isEnabled: false, updateDate: new Date() },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Lease lead not found" });
    }
    res.status(200).json({ message: "Lease lead disabled", id: req.params.id });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to disable lease lead", error: err });
  }
});

// @route: PUT api/crm/leaselead/:id
// @desc: update an existing leaseLead by id
// @access: private
router.put("/:id", auth, async (req, res) => {
  try {
    if (Array.isArray(req.body.notes) && req.body.notes.length > 0) {
      req.body.notes = req.body.notes.map((note) => ({
        ...note,
        user: req.user._id,
      }));
    }

    req.body.updateDate = new Date();
    const updatedLead = await leaseLead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedLead) {
      return res.status(404).json({ message: "Lease lead not found" });
    }
    res.status(200).json(updatedLead);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to update lease lead", error: err });
  }
});

// @route: PATCH api/crm/leaselead/:id/notes
// @desc: add a new note to the notes array of a leaseLead
// @access: private
router.patch("/:id/notes", auth, async (req, res) => {
  try {
    const { content, type } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Note content is required" });
    }
    const note = {
      content,
      type: type || "note",
      user: req.user?._id,
      date: new Date(),
    };
    const updated = await leaseLead.findByIdAndUpdate(
      req.params.id,
      { $push: { notes: note }, updateDate: new Date() },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Lease lead not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add note", error: err });
  }
});

module.exports = router;
