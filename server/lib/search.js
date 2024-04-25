const { MongoClient } = require('mongodb');

/**
 * Searches database using text to find a list of documents
 * @param {Object} collection Collection to search through, mongodb driver collection object
 * @param {*} text Text used to earch for document in the collection
 * @returns 
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

module.exports = {
    searchText,
};