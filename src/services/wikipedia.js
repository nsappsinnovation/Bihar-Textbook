import axios from 'axios';

const getApiEndpoint = (lang = 'en') => {
  const language = (lang || 'en').startsWith('hi') ? 'hi' : 'en';
  return `https://${language}.wikipedia.org/w/api.php`;
};

export const searchArticles = async (query, lang = 'en') => {
    if (!query) return [];

    try {
        const response = await axios.get(getApiEndpoint(lang), {
            params: {
                action: 'query',
                list: 'search',
                srsearch: query,
                format: 'json',
                origin: '*',
                srlimit: 6, // Fetch a few more to have a nice grid
            },
        });

        return response.data?.query?.search || [];
    } catch (error) {
        console.error('Error fetching data from Wikipedia:', error);
        throw error;
    }
};

export const getArticleExtract = async (pageId, lang = 'en') => {
    try {
        const response = await axios.get(getApiEndpoint(lang), {
            params: {
                action: 'query',
                prop: 'extracts|pageimages',
                exintro: true,
                explaintext: true,
                pageids: pageId,
                format: 'json',
                origin: '*',
                pithumbsize: 500,
            }
        });
        const page = response.data?.query?.pages[pageId];
        return {
            extract: page?.extract || '',
            thumbnail: page?.thumbnail?.source || null
        };
    } catch (error) {
        console.error('Error fetching extract:', error);
        return { extract: '', thumbnail: null };
    }
};

export const getSuggestions = async (query, lang = 'en') => {
    if (!query) return [];

    try {
        const response = await axios.get(getApiEndpoint(lang), {
            params: {
                action: 'opensearch',
                search: query,
                limit: 5,
                format: 'json',
                origin: '*',
            },
        });

        if (response.data && Array.isArray(response.data[1])) {
            return response.data[1];
        }

        return [];
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        return [];
    }
};