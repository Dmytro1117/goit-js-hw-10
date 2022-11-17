// const URL = "https://pokeapi.co/api/v2/"
//  function fetchCountries(id) {
//     return fetch(`${URL}pokemon/${id}`)
//         .then(response => { console.log(response); return response.json()})
// }
// export default {fetchCountries}


const URL = "https://restcountries.com/v3.1/name/"

 export function fetchCountries(name) {
return fetch(`${URL}${name}?fields=${'name,capital,population,flags,languages'}`)
        .then(response => {
            if (!response.ok) {
      throw new Error(response.status);
    }
            return response.json();
        })

}


//  fetchCountries("Ukraine")
