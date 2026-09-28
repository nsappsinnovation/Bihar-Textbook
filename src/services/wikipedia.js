import axios from 'axios';

const getApiEndpoint = (lang = 'en') => {
  const language = (lang || 'en').startsWith('hi') ? 'hi' : 'en';
  return `https://${language}.wikipedia.org/w/api.php`;
};

// Search results with their intro text and thumbnail in ONE request (search list + a search
// generator for extracts/images). Each result keeps the language it was searched in.
export const searchArticles = async (query, lang = 'en') => {
    if (!query) return [];
    const language = (lang || 'en').startsWith('hi') ? 'hi' : 'en';

    try {
        const response = await axios.get(getApiEndpoint(language), {
            params: {
                action: 'query',
                format: 'json',
                origin: '*',
                list: 'search',
                srsearch: query,
                srlimit: 6,
                generator: 'search',
                gsrsearch: query,
                gsrlimit: 6,
                prop: 'extracts|pageimages',
                exintro: true,
                explaintext: true,
                exlimit: 'max',
                piprop: 'thumbnail',
                pithumbsize: 500,
            },
        });

        const pages = response.data?.query?.pages || {};
        return (response.data?.query?.search || []).map((result) => ({
            ...result,
            lang: language,
            extract: pages[result.pageid]?.extract || '',
            thumbnail: pages[result.pageid]?.thumbnail?.source || null,
        }));
    } catch (error) {
        console.error('Error fetching data from Wikipedia:', error);
        throw error;
    }
};

// signal: AbortController signal so a newer keystroke cancels the older request
export const getSuggestions = async (query, lang = 'en', signal) => {
    if (!query) return [];

    try {
        const response = await axios.get(getApiEndpoint(lang), {
            signal,
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
        if (!axios.isCancel(error)) console.error('Error fetching suggestions:', error);
        return [];
    }
};