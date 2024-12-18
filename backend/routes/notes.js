const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Fetch all the Notes using: GET "/api/notes/fetchallnotes". Login required.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
      const notes = await Notes.find({ user: req.user.id });
      res.json(notes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("INTERNAL SERVER ERROR");
    }
  });

// ROUTE 2: Add a Note using: POST "/api/notes/addnotes". Login required.
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter your title here.").isLength({ min: 3 }),
    body("description", "Enter your description over here.").isLength({
      min: 5,
    }),
    // Add validation for other fields like 'tag' if required
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req); // If there are errors, return a bad request and the errors
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id, // Attach the note to the authenticated user
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("INTERNAL SERVER ERROR");
    }
  }
);


// ROUTE 3: Update an existing note using: PUT "/api/notes/updatenote". Login required.
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    const newNote = {};
    if (title) { newNote.title = title; }
    if (description) { newNote.description = description; }
    if (tag) { newNote.tag = tag; }

    // Find the note to be updated and check ownership
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // Update the note
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("INTERNAL SERVER ERROR");
  }
});


// ROUTE 4: Deleting an existing note using: DELETE "/api/notes/deletenote". Login required.
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
    // Find the note to be deleted and check ownership
    const note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if the user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // Delete the note
    await Notes.findByIdAndDelete(req.params.id);

    res.json({ "Success": "Note has been deleted.", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("INTERNAL SERVER ERROR");
  }
});

module.exports = router;
