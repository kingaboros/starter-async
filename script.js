'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
  <h3 class="country__name">${data.name}</h3>
  <h4 class="country__region">${data.subregion}</h4>
  <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(
    1
  )}</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
    </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

///////////////////////////////////////

// Old school AJAX calls
/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    // console.log(this.responseText);

    const [data] = JSON.parse(this.responseText);
    console.log(data);
    const html = `<article class="country">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.subregion}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('romania');
getCountryData('portugal');
getCountryData('usa');

 */

///// Creating a sequence of Ajax calls //////

/*
const getCountryAndNeighbour = function (country) {
  // AJAx call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    // console.log(this.responseText);

    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbour country (2)
    const [neighbour] = data.borders;

    if (!neighbour) return;

    // AJAx call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      renderCountry(data2, 'neighbour');
    });
  });
};
getCountryAndNeighbour('portugal');



//////////////////// Promises and fetch API //////////////

// Old way
// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);

// New way - using fetch

// const request = fetch('https://restcountries.eu/rest/v2/name/portugal');
// console.log(request);

// const getCountryData = function (country) {
//   fetch('https://restcountries.eu/rest/v2/name/portugal')
//     .then(function (response) {
//       console.log(response); // we don't have access to the body yet. See readable stream
//       return response.json(); // returns a promise as well, we must call then() on it as well
//     })
//     .then(function (data) {
//       // this will give us access to the data
//       console.log(data);
//       renderCountry(data[0]);
//     });

// };

//////////  promises

// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

//     return response.json();
//   });
// };

const getCountryData = function (country) {
  //Country 1
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => {
      console.log(response);

      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);

      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      // const neighbour = 'ggdghd';
      if (!neighbour) return;

      // country 2
      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 🧨🧨🧨`);
      renderError(`Something went wrong ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// const getCountryData = function (country) {
//   //Country 1
//   getJSON(
//     `https://restcountries.eu/rest/v2/name/${country}`,
//     'Country not found'
//   )
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       // const neighbour = 'ajhtrje';
//       if (!neighbour) throw new Error('No neighbour found!');

//       // country 2
//       return getJSON(
//         `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
//         'Country not found'
//       );
//     })

//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 🧨🧨🧨`);
//       renderError(`Something went wrong ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });

getCountryData('portugal');

//////////// The event loop /////////////////

console.log('Test start');
setTimeout(() => console.log('0 sec timer '), 0);

Promise.resolve('Resolved promise 1').then(res => console.log(res));
console.log('Test end');


*/

//////////////////// Async - await

const whereAmI = async function (country) {
  // fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(res =>
  //   console.log(res)
  // );

  const res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`); //this will return a promise
  const data = await res.json();
  console.log(data);
  renderCountry(data[0]);
};
whereAmI('portugal');
console.log('First');

//////////////////// Handling errors with try ... catch /////////

// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   alert(err.message);
// }
