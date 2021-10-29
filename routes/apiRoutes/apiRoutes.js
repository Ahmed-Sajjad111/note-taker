const fs = require('fs')
const path = require('path')
const router = require('express').Router()
const {nanoid} = require('nanoid')

router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../../db/db.json"));
});

router.post("/notes", (req, res) => {
    let newNote = req.body;

    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"))

    req.body.id = nanoid()

    notes.push(newNote)

    fs.writeFileSync("./db/db.json", JSON.stringify(notes, null, 2))

    res.json(notes)
});

router.delete("/notes/:id", (req, res) => {
    let deletedNote = req.params.id

    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"))

    let newNotes = notes.filter(note => note.id !== deletedNote)

    fs.writeFileSync("./db/db.json", JSON.stringify(newNotes, null, 2))

    return res.json(newNotes)
})

module.exports = router