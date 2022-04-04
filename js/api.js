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

let leftMovie = false;
let rightMovie = false;

//get more details from api when item is clicked
export const clickMovie = async (movie, summaryElement, side) => {
    const response = await axios.get(url, {
        params: {
            apikey: apiKey,
            i: movie.imdbID
        }
    });
    summaryElement.innerHTML = movieTemplate(response.data);
    
    if (side === 'left') {
        leftMovie = true;
    }
    else{
        rightMovie = true;
    }

    if (leftMovie && rightMovie) {
        runComparison();
    }

};

const runComparison = () => {
    const leftSideStats = document.querySelectorAll('#left-summary .notification');
    const rightSideStats = document.querySelectorAll('#right-summary .notification');
    
    leftSideStats.forEach((leftStat, index) => {
        const rightStat = rightSideStats[index];
        
        const leftSideValue = parseInt(leftStat.dataset.value);
        const rightSideValue = parseInt(rightStat.dataset.value);

        if (rightSideValue > leftSideValue) {
            leftStat.classList.remove('is-primary');
            leftStat.classList.add('is-warning');
        } else {
            rightStat.classList.remove('is-primary');
            rightStat.classList.add('is-warning');
        };
    });
    
};