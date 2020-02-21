'use strict';

// When user clicks surprise me button, 1 random recipe will be displayed
function getRandomRecipe() {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(response => { 
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`ERROR: Something went wrong, please try another search`);
  });
}

// Fetches recipe results list based on user search 
function getRecipe(category) {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+category)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error(response.status);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`ERROR: Something went wrong, please try another search`);
    });
}

// Watches for search from user 
function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    var category = $("input[type='text']").val();
    getRecipe(category.toLowerCase());
  });
}  

// Display inital results 
function displayResults(responseJson) {
  $("#results-list").empty();
  $("#expanded-results").empty();
  $("#js-error-message").empty();
  responseJson.drinks.forEach((drinks) => {
  $("#results-list").append(
    `<ul>
      <li><h3>${drinks.strDrink}</h3></li>
      <li><img src="${drinks.strDrinkThumb}" class="results-img" alt="${drinks.strDrink}"></li>
    </ul>`
      );
  // Display expanded results that contain additional details 
  $("#expanded-results").append(
    `   <li><h3>${drinks.strDrink}</h3></li>
        <li><img src="${drinks.strDrinkThumb}" class="results-img" alt="${drinks.strDrink}"></li>
        <li><p>Type of Glass: ${drinks.strGlass}</p></li>
        <li><p>Category: ${drinks.strCategory}</p></li>
        <li><p>Instructions: ${drinks.strInstructions}</p></li>
        <li id="ingredients"><p>Ingredients Preview: </p>
          <ol>
            <li>${drinks.strIngredient1} - ${drinks.strMeasure1}</li>
            <li>${drinks.strIngredient2} - ${drinks.strMeasure2}</li>
            <li>${drinks.strIngredient3} - ${drinks.strMeasure3}</li>
            <li>${drinks.strIngredient4} - ${drinks.strMeasure4}</li>
          </ol></li>`
    );
  $("#results").removeClass("hidden");
  })
};

//Handles the button to expand and collapse all results 
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
watchForm();
});