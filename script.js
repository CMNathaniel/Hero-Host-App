"use strict";

// When user clicks button, 1 random meal recipe will be displayed
function getRandomMealRecipe() {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then(response => { 
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.status);
      })
      .then(responseJson => displayMealResults(responseJson))
      .catch(err => {
        $(".error-message").text(`ERROR: Something went wrong, please try another search`);
    });
  }

// When user clicks button, 1 random cocktail recipe will be displayed
function getRandomCocktailRecipe() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
      .then(response => { 
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.status);
      })
      .then(responseJson => displayCocktailResults(responseJson))
      .catch(err => {
        $(".error-message").text(`ERROR: Something went wrong, please try another search`);
    });
  }
  
  // Fetches meal recipe results list based on user search 
function getMealRecipe(mealCategory) {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="+mealCategory)
        .then(response => { 
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.status);
        })
      .then(responseJson => displayMealResults(responseJson))
      .catch(err => {
        $(".error-message").text(`ERROR: Something went wrong, please try another search`);
      });
  }

// Fetches cocktail recipe results list based on user search 
function getCocktailRecipe(cocktailCategory) {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+cocktailCategory)
        .then(response => {
        if (response.ok) {
            return response.json()
        }
        throw new Error(response.status);
        })
    .then(responseJson => displayCocktailResults(responseJson))
    .catch(err => {
      $(".error-message").text(`ERROR: Something went wrong, please try another search`);
    });
}

// Watches for searches from user 
function watchMealForm() {
    $("#meal-form").submit(event => {
        event.preventDefault();
        var mealCategory = $("#meal-search").val();
        getMealRecipe(mealCategory.toLowerCase());
    });
}  

function watchCocktailForm() {
    $("#cocktail-form").submit(event => {
        event.preventDefault();
        var cocktailCategory = $("#cocktail-search").val();
        getCocktailRecipe(cocktailCategory.toLowerCase());
    });
}  

// Display inital meal recipe results 
function displayMealResults(responseJson) {
    $(".meal-results-list").empty();
    $(".meal-expanded-results").empty();
    $(".error-message").empty();
    // display initial or collapsed results 
    responseJson.meals.forEach((meals) => {
    $(".meal-results-list").append(
      `<ul>
        <li><h3><button type="button" class="collapsible">${meals.strMeal}</button></h3></li>
        <li><a href="${meals.strSource}" target="_blank"><img src="${meals.strMealThumb}" alt="${meals.strMeal}"></a></li>
      </ul>`
     );
    // display expanded results that contains additional details 
    $(".meal-expanded-results").append(
      `<ul class="content">
          <li><h3>${meals.strMeal}</h3></li>
          <li><a href="${meals.strSource}" target="_blank"><img src="${meals.strMealThumb}" alt="${meals.strMeal}"></a></li>
          <li><p><a href="${meals.strYoutube}" target="_blank">Watch a how-to video</a></p>
          <li><p>Region: ${meals.strArea}</p></li>
          <li><p>Category: ${meals.strCategory}</p></li>
          <li id="ingredients"><p>Ingredients Preview: </p>
            <ol>
              <li>${meals.strIngredient1} - ${meals.strMeasure1}</li>
              <li>${meals.strIngredient2} - ${meals.strMeasure2}</li>
              <li>${meals.strIngredient3} - ${meals.strMeasure3}</li>
              <li>${meals.strIngredient4} - ${meals.strMeasure4}</li>
              <li>${meals.strIngredient5} - ${meals.strMeasure5}</li>
              <li>${meals.strIngredient6} - ${meals.strMeasure6}</li>
          </ol></li>
          <li><p>Instructions: 
          <br>
          <br>${meals.strInstructions}</p></li>
          </div>
      </ul>`
     );
    });
   $(".meal-results").removeClass("hidden");
  }

// Display inital cocktail recipe results 
function displayCocktailResults(responseJson) {
  $(".cocktail-results-list").empty();
  $(".cocktail-expanded-results").empty();
  $(".error-message").empty();
  responseJson.drinks.forEach((drinks) => {
  $(".cocktail-results-list").append(
    `<ul>
      <li><h3><button type="button" class="collapsible">${drinks.strDrink}</button></h3></li>
      <li><img src="${drinks.strDrinkThumb}" class="results-img" alt="${drinks.strDrink}"></li>
    </ul>`
      );
  // Display expanded cocktail recipe results that contain additional details 
  $(".cocktail-expanded-results").append(
    `<ul class="content">
        <li><h3>${drinks.strDrink}</h3></li>
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
          </ol></li>
    </ul>`
    );
  $(".cocktail-results").removeClass("hidden");
  })
};

function expandResults() {
    
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", expandResults); {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    };
    console.log(`expandresults has run`);
}}

//Handles the buttons to expand and collapse all results 
/*function expandResults() {
  var x = document.getElementsByClassName("expanded-results");
  if (x.className === "hidden") {
    x.className = "block";
  } else {
    x.className = "hidden";
  }
  var y = document.getElementsByClassName("results-list");
  if (y.className === "hidden") {
    y.className = "block";
  } else {
    y.className = "hidden";
  }
}   */



$(function() {
watchMealForm();
watchCocktailForm();
}); 