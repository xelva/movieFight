
import { createAutoComplete} from './autocomplete.js';
import { fetchData, clickMovie } from './api.js';

const autoCompleteConfig = {
    renderOption(movie){
        //check that there's an image
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `
        <img src="${imgSrc}"/>
        ${movie.Title} ${movie.Year}
    `
   },
   inputValue(movie){
       return movie.Title;
   },
   callData(searchTerm){
       return fetchData(searchTerm);
   }
};

createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('#left-autocomplete'),
    onOptionSelect(movie){
        document.querySelector('.tutorial').classList.add('is-hidden');
        clickMovie(movie, document.querySelector('#left-summary'), 'left');
    }
});

createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('#right-autocomplete'),
    onOptionSelect(movie){
        document.querySelector('.tutorial').classList.add('is-hidden');
        clickMovie(movie, document.querySelector('#right-summary'), 'right');
    }
});


/////////////


export const movieTemplate = movieDetail => {
    const dollars = movieDetail.BoxOffice;
    const parseDollars = parseInt(dollars.replace(/\$/g, '').replace(/,/g, ''));
    const metascore = movieDetail.Metascore;
    const parseMetascore = parseInt(metascore);
    const imdbRating = movieDetail.imdbRating;
    const parseImdbRating = parseFloat(imdbRating);
    const imdbVotes = movieDetail.imdbVotes;
    const parseImdbVotes = parseInt(imdbVotes);
    const awards = movieDetail.Awards;
    const awardsArray = awards.split(' ');
    
    const awardsFin = awardsFunc(awardsArray);


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
    <article data-value=${awardsFin} class='notification is-primary'>
        <p class='title'>${movieDetail.Awards}</p>
        <p class=subtitle'>Awards</p>
    </article>    
    <article data-value=${parseDollars} class='notification is-primary'>
    <p class='title'>${movieDetail.BoxOffice}</p>
    <p class=subtitle'>Box Office</p>
    </article>  
    <article data-value=${parseMetascore} class='notification is-primary'>
    <p class='title'>${movieDetail.Metascore}</p>
    <p class=subtitle'>Metascore</p>
    </article>  
    <article data-value=${parseImdbRating} class='notification is-primary'>
    <p class='title'>${movieDetail.imdbRating}</p>
    <p class=subtitle'>IMDB Rating</p>
    </article>  
    <article data-value=${parseImdbVotes} class='notification is-primary'>
    <p class='title'>${movieDetail.imdbVotes}</p>
    <p class=subtitle'>IMDB</p>
    </article>  
    `;
};

const awardsFunc = awardsArray => {
    let count = 0;
    for (let i = 0; i < awardsArray.length; i++) {
        console.log(awardsArray[i]);
            let parse = parseInt(awardsArray[i])
            if (isNaN(parse)) {
                count + 0;
            } else {
                count += parseInt(awardsArray[i]);
            }
    }
    return count;
}; 