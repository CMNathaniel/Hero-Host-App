'use strict';

// When user clicks surprise me button, 1 random meal will be displayed
function getRandomRecipe() {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
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
      <li><img src="${drinks.strDrinkThumb}" class="results-img" alt="${drinks.strDrink}"></li>
    </ul>`
   )
  // Display expanded results that contain additional details 
  $('#expanded-results').append(
    `<ul>
        <li><h3>${drinks.strDrink}</h3></li>
        <li><img src="${drinks.strDrinkThumb}" class="results-img" alt="${drinks.strDrink}"></li>
        <li><p>Type of Glass: ${drinks.strGlass}</p></li>
        <li><p>Category: ${drinks.strCategory}</p></li>
        <li><p>Instructions: 
        <br>
        <br>${drinks.strInstructions}</p></li>
        <li class="ingredients"><p>Ingredients: </p></li>
    </ul>`
   )
 $(displayIngredients);
 $('#results').removeClass('hidden');
  })
};

//Displays ingredients and measurements, ignoring any 'null' results
function displayIngredients(drinks) {
  
  var allIngredients = [drinks.strIngredient1, drinks.strIngredient2, drinks.strIngredient3, drinks.strIngredient4, drinks.strIngredient5, 
    drinks.strIngredient6, drinks.strIngredient7, drinks.strIngredient8, drinks.strIngredient9, drinks.strIngredient10, drinks.strIngredient11,
    drinks.strIngredient12, drinks.strIngredient13, drinks.strIngredient14, drinks.strIngredient15]

  var allMeasurements = [drinks.strMeasure1, drinks.strMeasure2, drinks.strMeasure3, drinks.strMeasure4, drinks.strMeasure5, drinks.strMeasure6,
     drinks.strMeasure7, drinks.strMeasure8, drinks.strMeasure9, drinks.strMeasure10, drinks.strMeasure11, drinks.strMeasure12, drinks.strMeasure13, 
     drinks.strMeasure14, drinks.strMeasure15]
  
   var filteredIngredients = allIngredients.filter(ingredients => ingredients != null);
   var filteredMeasurements = allMeasurements.filter(ingredients => ingredients != null);


  filteredIngredients.forEach(x => {
    $('.ingredients').append(
       `<ul>
          <li>${x} - ${filteredMeasurements[x]}
      </ul>`
        )
    }) 
  }

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

