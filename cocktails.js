'use strict';

// Fetches recipe results list based on user search 
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
      $('#js-error-message').text(`ERROR: Something went wrong, please try another search`);
    });
}

// Watches for search from user 
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    var category = $('input[type="text"]').val();
    getRecipe(category.toLowerCase());
  });
}  

// Display inital results 
function displayResults(responseJson) {
  $('#results-list').empty();
  $('#expanded-results').empty();
  $('#js-error-message').empty();
  responseJson.drinks.forEach((drinks) => {
  $('#results-list').append(
    `<ul>
      <li><h3>${drinks.strDrink}</h3></li>
      <li><img src="${drinks.strDrinkThumb}" class="results-img"></li>
    </ul>`
   )
  // Display expanded results that contain additional details 
  $('#expanded-results').append(
    `<ul>
        <li><h3>${drinks.strDrink}</h3></li>
        <li><img src="${drinks.strDrinkThumb}" class="results-img"></li>
        <li><p>Instructions: ${drinks.strInstructions}</p></li>
        <li class="ingredients"><p>Ingredients: </p></li>
    </ul>`
   )
 $(displayIngredients);
 console.log('the function displayIngredients has run');
 $('#results').removeClass('hidden');
  })
};

// Within the expanded results displays ingredients with their measurement 
function displayIngredients(responseJson) {
//continue with adding ingredients for all ingredients that are not 'null'
  if (responseJson.drinks !== null) {
    responseJson.drinks.forEach((drinks) => {
// API returns a maximum of 15 ingredients, numbers are hardcorded in API itself 
    $('.ingredients').append(
      `<ul>
        <li>${drinks.strIngredient1} - ${drinks.strMeasure1}</li>
        <li>${drinks.strIngredient2} - ${drinks.strMeasure2}</li>
        <li>${drinks.strIngredient3} - ${drinks.strMeasure3}</li>
        <li>${drinks.strIngredient4} - ${drinks.strMeasure4}</li>
        <li>${drinks.strIngredient5} - ${drinks.strMeasure5}</li>
        <li>${drinks.strIngredient6} - ${drinks.strMeasure6}</li>
        <li>${drinks.strIngredient7} - ${drinks.strMeasure7}</li>
        <li>${drinks.strIngredient8} - ${drinks.strMeasure8}</li>
        <li>${drinks.strIngredient9} - ${drinks.strMeasure9}</li>
        <li>${drinks.strIngredient10} - ${drinks.strMeasure10}</li>
        <li>${drinks.strIngredient11} - ${drinks.strMeasure11}</li>
        <li>${drinks.strIngredient12} - ${drinks.strMeasure12}</li>
        <li>${drinks.strIngredient13} - ${drinks.strMeasure13}</li>
        <li>${drinks.strIngredient14} - ${drinks.strMeasure14}</li>
        <li>${drinks.strIngredient15} - ${drinks.strMeasure15}</li>
      </ul>`
       )
    })
      // Else, for ingredients that are 'null, skip them 
    }
  };

// Handles the button to expand and collapse all results 
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

