
import {dropdown} from './app.js';

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

export const clickMovie = async movieId => {
    const response = await axios.get(url, {
        params: {
            apikey: apiKey,
            i: movieId
        }
    });
    document.querySelector('#summary').innerHTML = movieTemplate(response.data);
}

export const movieTemplate = movieDetail => {
    return `
    <article class='media'>
        <figure class='media-left'>
            <p class='image'>
                <img src='${movieDetail.Poster}' />
            </p>
        </figure>
        <div class='media-content'>
            <div class='content'>
                <h1>${movieDetail.Title}</h1>
                <h4>${movieDetail.Genre}</h4>
                <p>${movieDetail.Plot}</p>
            </div>
        </div>
    </article>
    <article class='notification is-primary'>
        <p class='title'>${movieDetail.Awards}</p>
        <p class=subtitle'>Awards</p>
    </article>    
    <article class='notification is-primary'>
    <p class='title'>${movieDetail.BoxOffice}</p>
    <p class=subtitle'>Box Office</p>
    </article>  
    <article class='notification is-primary'>
    <p class='title'>${movieDetail.Metascore}</p>
    <p class=subtitle'>Metascore</p>
    </article>  
    <article class='notification is-primary'>
    <p class='title'>${movieDetail.imdbRating}</p>
    <p class=subtitle'>IMDB Rating</p>
    </article>  
    <article class='notification is-primary'>
    <p class='title'>${movieDetail.imdbVotes}</p>
    <p class=subtitle'>IMDB Votes</p>
    </article>  
    `;
};