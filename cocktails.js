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
      $('#js-error-message').text(`Something went wrong, please try another search`);
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
  $('#expanded-results').empty();
  $('#js-error-message').empty();
  responseJson.drinks.forEach((drinks) => {
  $('#results-list').append(
    `<ul>
      <h3>${drinks.strDrink}</h3>
      <img src="${drinks.strDrinkThumb}" class="results-img">
      <p>Category: ${drinks.strCategory}</p>
    </ul>`
   )
  $('#expanded-results').append(
    `<ul>
        <h3>${drinks.strDrink}</h3>
        <img src="${drinks.strDrinkThumb}" class="results-img">
        <p>Category: ${drinks.strCategory}</p>
        <p>Instructions: ${drinks.strInstructions}</p>
      <p>Ingredients: </p>
      <ul>
        <li>${drinks.strIngredient1} - ${drinks.strMeasure1}</li>
        <li>${drinks.strIngredient2} - ${drinks.strMeasure2}</li>
        <li>${drinks.strIngredient3} - ${drinks.strMeasure3}</li>
        <li>${drinks.strIngredient4} - ${drinks.strMeasure4}</li>
      </ul>
    </ul>`
   )
  });
 $('#results').removeClass('hidden');
}

function expandResults() {
  var x = document.getElementById("expanded-results");
  if (x.className === "hidden") {
    x.className = "block";
  } else {
    x.className = "hidden";
  }
  var y = document.getElementById("results-list");
  if (y.className === "hidden") {
    y.className = "block";
  } else {
    y.className = "hidden";
  }
}


$(function() {
console.log('App loaded! Waiting for submit!');
watchForm();
});
