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
    `<ul>
      <h3><a href="${meals.strSource}" target="_blank">${meals.strMeal}</a></h3>
      <img src="${meals.strMealThumb}" class="results-img">
      <p>Region: ${meals.strArea}</p>
      <p>Category: ${meals.strCategory}</p>
    </ul>`
   )
  $('#expanded-results').append(
    `<ul>
      <h3><a href="${meals.strSource}" target="_blank">${meals.strMeal}</a></h3>
      <img src="${meals.strMealThumb}" class="results-img">
      <p>Region: ${meals.strArea}</p>
      <p>Category: ${meals.strCategory}</p>
      <p>Instructions: ${meals.strInstructions}</p>
      <ul>
        <li>Ingredients: ${meals.strIngredient1}</li>
        <li>Ingredients: ${meals.strIngredient2}</li>
        <li>Ingredients: ${meals.strIngredient3}</li>
        <li>Ingredients: ${meals.strIngredient4}</li>
        <li>Ingredients: ${meals.strIngredient5}</li>
        <li>Ingredients: ${meals.strIngredient6}</li>
        <li>Ingredients: ${meals.strIngredient7}</li>
        <li>Ingredients: ${meals.strIngredient8}</li>
        <li>Ingredients: ${meals.strIngredient9}</li>
        <li>Ingredients: ${meals.strIngredient10}</li>
      </ul>
    </ul>`
   )
  });
 $('#results').removeClass('hidden');
}

function expandResults() {
  var x = document.getElementById("#expanded-results");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

$(function() {
console.log('App loaded! Waiting for submit!');
watchForm();
});