require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const uri = `mongodb://localhost:27017`;
const client = new MongoClient(uri);

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

app.listen(3000, (err) => {
    console.log(err);
})