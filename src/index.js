import './css/styles.css';
import { fetchCountries } from "./fetchCountries"
import lodashDebounce from "lodash.debounce"
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const listEl = document.querySelector('.country-list');
const divEl = document.querySelector('.country-info');
const inputEl = document.querySelector('#search-box');

listEl.style.listStyle = 'none';


inputEl.addEventListener("input", lodashDebounce(handleInput, DEBOUNCE_DELAY))

function handleInput(e) {
    let choseCountry = e.target.value.trim()
    divEl.innerHTML = '';
    listEl.innerHTML = '';
    return fetchCountries(choseCountry)
        .then(data => { choseRender(data) })
        .catch(fetchError)
        // .finally(()=>{})
}

function choseRender(arr) {
    if (arr.length === 1) {
    return renderCountriesDiv(arr);
  }
    if (arr.length > 1 && arr.length <= 10) {
   return renderCountriesList(arr);
  }
     return Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

function renderCountriesList(data) {
    const markup = data
    .map(counrt => {
      return `<li class="country-item">
            <img src="${counrt.flags.svg}" alt="${counrt.name.official}" width="60" height="30" /> 
            <span>${counrt.name.official}</span>
            </li>`}).join('');
  listEl.innerHTML = markup;
 }

function renderCountriesDiv(data) { 
   const { name, capital, population, flags, languages } = data[0]
    const markup = `<h1>
       <img src="${flags.svg}" alt="${name.official}" width="100" height="50" /> 
        ${name.official}
      </h1>
      <ul class="country-info_list">
        <li class="country-info_item">
          <h2>Capital:</h2>
          <p>${capital}</p>
        </li>
        <li class="country-info_item">
          <h2>Population:</h2>
          <p>${population}</p>
        </li>
        <li class="country-info_item">
          <h2>Languages:</h2>
          <p>${Object.values(languages).join(', ')}</p>
        </li>
      </ul>`;
    divEl.innerHTML = markup;
}

function fetchError() {
    // alert("Халепа")
    Notiflix.Notify.failure("Oops, there is no country with that name");
}









// import API from "./fetchCountries"

// const DEBOUNCE_DELAY = 300;
// const listEl = document.querySelector('.country-list');
// const inputEl = document.querySelector('#search-box');

// function handleInput(e) {
//     e.preventDefault()
// const chois = e.target.value
//     API.fetchCountries(chois)
//     .then(renderCountries)
//     .catch(fetchError)
//     .finally(()=>{})
// }


// function fetchError (error) {
//     alert("Халепа")
// }



    
// function renderCountries({name, weight, height, sprites}) { 
//        const markup = `
//     <img src=${sprites.front_default}>
//         <p>Имя: ${name}</p>
//         <p>Вес: ${weight}</p>
//         <p>Тип: ${height}</p>`;
//          console.log(markup)
//     listEl.innerHTML = markup;
// }

// inputEl.addEventListener("input", handleInput)

