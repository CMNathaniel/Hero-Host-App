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
      $('#js-error-message').text(`ERROR: Something went wrong, please try another search`);
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
  $('#results-list').empty();
  $('#expanded-results').empty();
  $('#js-error-message').empty();
  responseJson.meals.forEach((meals) => {
  $('#results-list').append(
    `<ul>
      <li><h3>${meals.strMeal}</h3></li>
      <li><a href="${meals.strSource}" target="_blank"><img src="${meals.strMealThumb}" class="results-img"></a></li>
    </ul>`
   )
  $('#expanded-results').append(
    `<ul>
        <li><h3>${meals.strMeal}</h3></li>
        <li><a href="${meals.strSource}" target="_blank"><img src="${meals.strMealThumb}" class="results-img"></a></li>
        <li><p><a href="${meals.strYoutube}" target="_blank">Watch a how-to video</a></p>
        <li><p>Region: ${meals.strArea}</p></li>
        <li><p>Category: ${meals.strCategory}</p></li>
        <li><p>Ingredients: </p>
      <ul>
        <li>${meals.strIngredient} - ${meals.strMeasure}</li>
      </ul>
    </li>
       <li><p>Instructions: ${meals.strInstructions}</p>
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


//       responseJson.meals.forEach((meals.strIngredient, meals.strMeasure) =>
