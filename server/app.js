require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const searchLib = require('./lib/search.js');

const uri = `mongodb://localhost:27017`;
const client = new MongoClient(uri);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("Welcome to the server");
});

app.get("/card", async (req, res) => {
    const params = req.query;

    const database = client.db(process.env.DB_NAME);
    const cards = database.collection('cards');

    // query params sanitization
    if(!('name' in params)) {
        res.send({error: "true", message: "Incorrect query parameters"});
        return;
    }

    const cardDocs = await cards.findOne({name: params.name});

    res.send({error: "false", payload: cardDocs});
    return;
})

app.get("/search", async (req, res) => {
    const params = req.query;

    const database = client.db(process.env.DB_NAME);
    const cards = database.collection('cards');
    const hashes = database.collection('imghash');

    if(!('text' in params) || params.text.length == 0) {
        res.send({error: "true", messsage: "Incomplete search information"});
        return;
    }

    if(params.text.length > 32) {
        res.send({error: true, message: "Search text too long"});
        return;
    }

    if(!('type' in params) || params.type.length == 0) {
        res.send({error: "true", message: "Search type not provided"});
        return;
    }

    switch(params.type) {
        case 'cardText':
            const searchResultCursor = await searchLib.searchText(cards, params.text);
            const searchResults = await searchResultCursor.toArray();
            res.send({error: "false", payload: searchResults});
            break;
        case 'cardImage':
            const resultCards = await searchLib.searchImage(hashes, cards, params.text);
            res.send({error: "false", payload: resultCards});
            break;
        case 'cardTextAdvanced':
            console.log('cardTextAdvanced');
            res.send({error: "false", payload: "No search function yet"});
            break;
        default:
            res.send({error: "true", message: "Incorrect search type provided"});
            return;
    }

})

app.listen(5000, (err) => {
    console.log(err);
})