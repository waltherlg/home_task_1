"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = require('body-parser');
const app = (0, express_1.default)();
const port = 3000;
app.use(bodyParser.json());
let videos = [];
const resolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];
// GET Returns All videos
app.get('/videos', (req, res) => {
    res.send(videos);
});
// POST add video
app.post('/videos', (req, res) => {
    let errorsMessages = [];
    let title = req.body.title;
    if (!title || typeof title !== 'string' || title.length > 40) {
        errorsMessages.push({ "message": "Incorrect title",
            "field": "title" });
    }
    let author = req.body.author;
    if (!author || typeof author !== 'string' || author.length > 20) {
        errorsMessages.push({ "message": "Incorrect author",
            "field": "author" });
    }
    let availableResolutions = req.body.availableResolutions;
    if (!availableResolutions || !Array.isArray(availableResolutions)) {
        errorsMessages.push({ "message": "Incorrect Resolutions",
            "field": "availableResolutions" });
    }
    function checkAvailability(arr, val) {
        return arr.some(function (arrVal) {
            return val === arrVal;
        });
    }
    for (let i = 0; i < availableResolutions.length; i++) {
        if (!(checkAvailability(resolutions, availableResolutions[i]))) {
            errorsMessages.push({ "message": "Incorrect Resolutions Format",
                "field": "availableResolutions" });
        }
    }
    if (errorsMessages.length > 0) {
        res.status(400).send({ errorsMessages });
    }
    let currentDate = new Date();
    const day = currentDate.getDate();
    const dateInMs = currentDate.setDate(day);
    const date = new Date(dateInMs);
    let currentDatePlusOne = new Date(currentDate.setDate(currentDate.getDate() + 1));
    let newVideo = {
        id: +(new Date()),
        title: title,
        author: author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: date.toISOString(),
        publicationDate: currentDatePlusOne.toISOString(),
        availableResolutions: availableResolutions
    };
    videos.push(newVideo);
    res.status(201).send(newVideo);
});
// GET returns video by id
app.get('/videos/:id', (req, res) => {
    let video = videos.find(v => v.id === +req.params.id);
    if (video) {
        res.send(video);
    }
    else {
        res.send(404);
    }
});
// DELETE delete video by id
app.delete('/videos/:id', (req, res) => {
    for (let i = 0; i < videos.length; i++) {
        if (videos[i].id === +req.params.id) {
            videos.splice(i, 1);
            res.send(204);
            return;
        }
    }
    res.send(404);
});
// DELETE delete all data
app.delete('/testing/all-data', (req, res) => {
    videos.splice(0);
    res.send(204);
});
// PUT update video by id
app.put('/videos/:id', (req, res) => {
    let errorsMessages = [];
    let video = videos.find(v => v.id === +req.params.id);
    if (video) {
    }
    else {
        res.send(404);
    }
    let title = req.body.title;
    if (!title || typeof title !== 'string' || title.length > 40) {
        errorsMessages.push({ "message": "Incorrect title",
            "field": "title" });
    }
    let author = req.body.author;
    if (!author || typeof author !== 'string' || author.length > 20) {
        errorsMessages.push({ "message": "Incorrect author",
            "field": "author" });
    }
    let canBeDownloaded = req.body.canBeDownloaded;
    if (typeof req.body.canBeDownloaded !== "boolean") {
        errorsMessages.push({ "message": "Incorrect canBeDownloaded",
            "field": "canBeDownloaded" });
    }
    let minAgeRestriction = req.body.minAgeRestriction;
    if (!minAgeRestriction || typeof req.body.minAgeRestriction !== "number" || minAgeRestriction < 1 || minAgeRestriction > 18) {
        errorsMessages.push({ "message": "Wrong Age",
            "field": "minAgeRestriction" });
    }
    let publicationDate = req.body.publicationDate;
    if (!publicationDate || typeof req.body.publicationDate !== "string") {
        errorsMessages.push({ "message": "wrong Date",
            "field": "publicationDate" });
    }
    let availableResolutions = req.body.availableResolutions;
    if (!availableResolutions || !Array.isArray(availableResolutions)) {
        errorsMessages.push({ "message": "Incorrect Resolutions",
            "field": "availableResolutions" });
    }
    function checkAvailability(arr, val) {
        return arr.some(function (arrVal) {
            return val === arrVal;
        });
    }
    for (let i = 0; i < availableResolutions.length; i++) {
        if (!(checkAvailability(resolutions, availableResolutions[i]))) {
            errorsMessages.push({ "message": "Incorrect Resolutions S",
                "field": "availableResolutions" });
            return;
        }
    }
    if (errorsMessages.length > 0) {
        // let errorsField = ("errorsMessages: " + [errorsMessages]);
        res.status(400).send({ errorsMessages });
    }
    video.title = title;
    video.author = author;
    video.canBeDownloaded = canBeDownloaded;
    video.minAgeRestriction = minAgeRestriction;
    video.publicationDate = publicationDate;
    video.availableResolutions = availableResolutions;
    res.status(204).send(video);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
