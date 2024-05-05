import axios from 'axios';

async function textSearch(text) {
    try {
        const searchResults = await axios.get(`http://localhost:5000/search?type=cardText&text=${text}`);

        if (searchResults.data.error === "false") {
            return searchResults.data.payload;
        }
        else {
            console.log(searchResults.data.message);
            return [];
        }

    }
    catch (error) {
        console.log(error);
        return;
    }
}

export default textSearch;