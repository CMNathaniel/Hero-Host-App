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
        <li><p>Instructions: ${drinks.strInstructions}</p></li>
        <li class="ingredients"><p>Ingredients: </p></li>
    </ul>`
   )
  //displayIngredients(responseJson);
  $('#results').removeClass('hidden');
  })
};

//Displays ingredients and measurements, ignoring any 'null' results
function displayIngredients(drinks) {
//console.log("displayIngredients function has run");
  
    var allIngredients = [drinks.drink[0].strIngredient1, drinks.drink[0].strIngredient2, drinks.drink[0].strIngredient3, drinks.drink[0].strIngredient4, drinks.drink[0].strIngredient5, 
      drinks.drink[0].strIngredient6, drinks.drink[0].strIngredient7, drinks.drink[0].strIngredient8, drinks.drink[0].strIngredient9, drinks.drink[0].strIngredient10, drinks.drink[0].strIngredient11,
      drinks.drink[0].strIngredient12, drinks.drink[0].strIngredient13, drinks.drink[0].strIngredient14, drinks.drink[0].strIngredient15] 
  
    var allIngredients = [];
    for (let i=1; i<=15; i++) {
      allIngredients.push(drinks.drink[0]['strIngredient'+i]);
    }
  
    var allMeasurements = [drinks.drink[0].strMeasure1, drinks.drink[0].strMeasure2, drinks.drink[0].strMeasure3, drinks.drink[0].strMeasure4, drinks.drink[0].strMeasure5, drinks.drink[0].strMeasure6, drinks.drink[0].strMeasure7, drinks.drink[0].strMeasure8, drinks.drink[0].strMeasure9, drinks.drink[0].strMeasure10, drinks.drink[0].strMeasure11, drinks.drink[0].strMeasure12, drinks.drink[0].strMeasure13, drinks.drink[0].strMeasure14, drinks.drink[0].strMeasure15]
    
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

