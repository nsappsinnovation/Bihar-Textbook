import axios from 'axios';

const API_ENDPOINT = 'https://en.wikipedia.org/w/api.php';

export const searchArticles = async (query) => {
    if (!query) return [];

    try {
        const response = await axios.get(API_ENDPOINT, {
            params: {
                action: 'query',
                list: 'search',
                srsearch: query,
                format: 'json',
                origin: '*',
                srlimit: 12, // Fetch a few more to have a nice grid
            },
        });

        return response.data.query.search;
    } catch (error) {
        console.error('Error fetching data from Wikipedia:', error);
        throw error;
    }
};

export const getArticleExtract = async (pageId) => {
    try {
        const response = await axios.get(API_ENDPOINT, {
            params: {
                action: 'query',
                prop: 'extracts',
                exintro: true,
                explaintext: true,
                pageids: pageId,
                format: 'json',
                origin: '*',
                pithumbsize: 500, // Request thumbnail if possible, though extracts don't always give it
                prop: 'extracts|pageimages', // Get images too
            }
        });
        const page = response.data.query.pages[pageId];
        return {
            extract: page.extract,
            thumbnail: page.thumbnail?.source
        };
    } catch (error) {
        console.error('Error fetching extract:', error);
        return { extract: '', thumbnail: null };
    }
}
