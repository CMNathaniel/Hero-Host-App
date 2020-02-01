'use strict';

function getRecipe(category) {
  console.log(category);
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+category)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error(response.status)
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    var category = $('input[type="text"]').val();
    console.log(category);
    getRecipe(category.toLowerCase());
  });
}  

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  responseJson.drinks.forEach((drinks) => {
  $('#results-list').append(
    `<ul>
      <h3>${drinks.strDrink}</h3>
      <img src="${drinks.strDrinkThumb}" class="results-img">
      <p>Category: ${drinks.strCategory}</p>
    </ul>`
   )
  });
 $('#results').removeClass('hidden');
}

$(function() {
console.log('App loaded! Waiting for submit!');
watchForm();
});