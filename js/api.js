import { movieTemplate } from "./app.js";

//api key
export const apiKey = 'd444e7af'

//create url base
export const url = 'http://www.omdbapi.com/'

//create fetch function
export const fetchData = async searchTerm => {
    const response = await axios.get(url, {
        params: {
            apikey: apiKey,
            s: searchTerm
        }
    });

    if (response.data.Error) {
           
        return [];
    }
    else{
        return response.data.Search;
    }
    
};

//get more details from api when item is clicked
export const clickMovie = async (movie, summaryElement) => {
    const response = await axios.get(url, {
        params: {
            apikey: apiKey,
            i: movie.imdbID
        }
    });
    summaryElement.innerHTML = movieTemplate(response.data);
}