const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path');
const fs = require('fs');
const {nanoid} = require('nanoid')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.post("/api/notes", (req, res) => {
    let newNote = req.body;

    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"))

    req.body.id = nanoid()

    notes.push(newNote)

    fs.writeFileSync("./db/db.json", JSON.stringify(notes, null, 2))

    res.json(notes)
});

app.delete("/api/notes/:id", (req, res) => {
    let deletedNote = req.params.id

    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"))

    let newNotes = notes.filter(note => note.id !== deletedNote)

    fs.writeFileSync("./db/db.json", JSON.stringify(newNotes, null, 2))

    return res.json(newNotes)
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});