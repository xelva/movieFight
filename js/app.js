import { debounce } from "./utils.js";
import { fetchData, clickMovie, movieTemplate} from "./api.js";


//select autocomplete input in html file
const root = document.querySelector('.autocomplete');
root.innerHTML = `
    <label><b>Search for a Movie</b></label>
    <input class="input" />
    <div class='dropdown'>
        <div class='dropdown-menu'>
            <div class='dropdown-content results'>
            </div>
        </div>
    </div>
`;

//query the doc for the input of the first movie
const input = document.querySelector('.input');

//create var for dropdown to show or hide
export const dropdown = document.querySelector('.dropdown');

//and the results of each element
const resultsWrapper = document.querySelector('.results');

const dropItem = document.querySelector('.dropdown-item');

//create array to store id of each result
const resultObj = {};

//create function to call on timeout
const onFirstInput = async evt => {
    const movies = await fetchData(evt.target.value);
    
    //first handle what you do if no movies are returned
    if (movies.length === 0) {
        dropdown.classList.remove('is-active');
    }
    console.log(movies);
    //clear existing items
    resultsWrapper.innerHTML = '';
    //display the dropdown
    dropdown.classList.add('is-active');
    //get movies from search term
    for (let movie of movies) {
        //add id of each movie to resultArray
        resultObj[movie.Title] = movie.imdbID;
        //create an anchor element for the dropdown item
        const option = document.createElement('a');
        //check that there's an image
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        //add a bulma class to each created element
        option.classList.add('dropdown-item');
        option.innerHTML = `
            <img src="${imgSrc}"/>
            ${movie.Title}
        `; 
        option.addEventListener('click', () => {
            dropdown.classList.remove('is-active');
            input.value = movie.Title;
            const movieDetails = clickMovie(movie.imdbID);
            console.log(movieDetails);
        })
        resultsWrapper.appendChild(option);
    }
};

//create listener for the input
input.addEventListener('input', debounce(onFirstInput, 500));
document.addEventListener('click', evt => {
    if (!root.contains(evt.target)) {
        dropdown.classList.remove('is-active');
    }
});

//console.log(resultObj);
//clickMovie('tt0478304')