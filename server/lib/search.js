const { MongoClient } = require('mongodb');
var hamming = require('hamming-distance');

/**
 * Searches database using text to find a list of documents
 * @param {Object} collection Collection to search through, mongodb driver collection object
 * @param {*} text Text used to earch for document in the collection
 * @returns array of json documents
 */
async function searchText(collection, text) {
    try {

        const indexExists = await collection.indexExists("name_text");

        if (!indexExists) {
            await collection.createIndex({name: "text"});
        }

        const query = { $text: { $search: text } };

        /*
        * Tells the database to only return these values,
        * 0 means don't return it, 1 means return it
        */
        const projection = {
            _id: 0,
            id: 1,
            name: 1,
            level: 1,
            hp: 1,
            images: 1,
        };

        const cursor = await collection.find(query).project(projection);

        return cursor;
    }
    catch(error) {
        console.log(error);
        return [];
    }
}

/**
 * Searches for card documents in the database using an image hash
 * @param {Object} hashCollection mongodb collection of image hashes
 * @param {Object} cardCollection mongodb collection of card info
 * @param {*} inputHash input hash to compare to other images
 * @returns An array of card documents
 */
async function searchImage(hashCollection, cardCollection, inputHash) {
    try {

        const cursor = await hashCollection.find({});
        const docArray = await cursor.toArray();
        const distances = docArray.map(doc => hamming(inputHash, doc.small));
        let searchResultHashes = [];
        let searchResults = [];

        for(let i = 0; i < distances.length; i++) {
            docArray[i].distance = distances[i];
        }

        docArray.sort(function(a, b) {
            return a.distance - b.distance;
        });

        for(let i = 0; i < docArray.length; i++) {
            if(docArray[i].distance > 4) {
                searchResultHashes = docArray.slice(0, i);
                break;
            }
        }

        for(let i = 0; i < searchResultHashes.length; i++) {
            const resultCard = await cardCollection.findOne({id: searchResultHashes[i].id});

            searchResults.push({
                id: resultCard.id,
                name: resultCard.name,
                hp: resultCard.hp,
                images: resultCard.images
            });
        }

        return searchResults;
    }
    catch(error) {
        console.log(error);
        return [];
    }
}

module.exports = {
    searchText,
    searchImage,
};