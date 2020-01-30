'use strict';

function getRecipe(category) {
  console.log(category);
  fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+category)
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
  responseJson.meals.forEach((meals) => {
  $('#results-list').append(
    `<li>
      <h3><a href="${meals.strSource}" target="_blank">${meals.strMeal}</a></h3>
      <img src="${meals.strMealThumb}" class="results-img">
      <p>Region: ${meals.strArea}</p>
      <p>Category: ${meals.strCategory}</p>
    </li>`
   )
  });
 $('#results').removeClass('hidden');
}

$(function() {
console.log('App loaded! Waiting for submit!');
watchForm();
});