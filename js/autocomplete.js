import { debounce } from "./utils.js";
import { fetchData, clickMovie} from "./api.js";
import { movieTemplate} from './app.js';




const createAutoComplete = ({root, renderOption, onOptionSelect, inputValue, callData}) => {
    root.innerHTML = `
        <label><b>Search</b></label>
        <input class="input" />
        <div class='dropdown'>
            <div class='dropdown-menu'>
                <div class='dropdown-content results'>
                </div>
            </div>
        </div>
    `;

    //query the doc for the input of the first search term
    const input = root.querySelector('.input');

    //create var for dropdown to show or hide
    const dropdown = root.querySelector('.dropdown');

    //and the results of each element
    const resultsWrapper = root.querySelector('.results');

    //create array to store id of each result
    const resultObj = {};

    //create function to call on timeout
    const onFirstInput = async evt => {
        const items = await fetchData(evt.target.value);
        
        //first handle what you do if an item is returned
        if (items.length === 0) {
            dropdown.classList.remove('is-active');
        }
        //clear existing items
        resultsWrapper.innerHTML = '';
        //display the dropdown
        dropdown.classList.add('is-active');
        //get items from search term
        for (let item of items) {
           
            //create an anchor element for the dropdown item
            const option = document.createElement('a');
           
            //add a bulma class to each created element
            option.classList.add('dropdown-item');
            option.innerHTML = renderOption(item); 
            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                input.value = inputValue(item);
                onOptionSelect(item);

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
};

export {createAutoComplete};