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
  console.log(`This is clicking on Find my Recipe`);
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
  });
 $('#results').removeClass('hidden');
}

function expandResults(responseJson) {
  console.log(`This is clicking on Expand All Results`);
  var x = document.getElementById("expanded-results");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  $('#results-list').empty();
  responseJson.meals.forEach((meals) => {
  $('#expanded-results').append(
    `<ul>
      <h3><a href="${meals.strSource}" target="_blank">${meals.strMeal}</a></h3>
      <img src="${meals.strMealThumb}" class="results-img">
      <p>Region: ${meals.strArea}</p>
      <p>Category: ${meals.strCategory}</p>
      <p>Instructions: ${meals.strInstructions}</p>
      <p>Ingredients: </p>
      <ul>
        <li>${meals.strIngredient1}</li>
        <li>${meals.strIngredient2}</li>
        <li>${meals.strIngredient3}</li>
        <li>${meals.strIngredient4}</li>
        <li>${meals.strIngredient5}</li>
        <li>${meals.strIngredient6}</li>
        <li>${meals.strIngredient7}</li>
        <li>${meals.strIngredient8}</li>
        <li>${meals.strIngredient9}</li>
        <li>${meals.strIngredient10}</li>
      </ul>
    </ul>`
    )
  });
  $('#expanded-results').removeClass('hidden');
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
  });