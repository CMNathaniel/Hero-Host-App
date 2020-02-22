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
  };

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
  };
  
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
  };

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
};

// Watches for searches from user 
function watchMealForm() {
    $("#meal-form").submit(event => {
        event.preventDefault();
        var mealCategory = $("#meal-search").val();
        getMealRecipe(mealCategory.toLowerCase());
    });
};  

function watchCocktailForm() {
    $("#cocktail-form").submit(event => {
        event.preventDefault();
        var cocktailCategory = $("#cocktail-search").val();
        getCocktailRecipe(cocktailCategory.toLowerCase());
    });
};  

// Display inital meal recipe results 
function displayMealResults(responseJson) {
    $(".meal-results-list").empty();
    $(".meal-expanded-results").empty();
    $(".error-message").empty();
    // display initial or collapsed results 
    responseJson.meals.forEach((meals) => {
    $(".meal-results-list").append(
      `<ul>
        <li><h3><button type="button" class="collapsible-trigger">${meals.strMeal}</button></h3></li>
        <li><a href="${meals.strSource}" target="_blank"><img src="${meals.strMealThumb}" alt="${meals.strMeal}"></a></li>
      </ul>`
     );
    // display expanded results that contains additional details 
    $(".meal-expanded-results").append(
      `<ul>
          <li><h3>${meals.strMeal}</h3></li>
          <li><a href="${meals.strSource}" target="_blank"><img src="${meals.strMealThumb}" alt="${meals.strMeal}"></a></li>
          <li><p><a href="${meals.strYoutube}" target="_blank">Watch a how-to video</a></p>
          <li><p>Region: ${meals.strArea}</p></li>
          <li><p>Category: ${meals.strCategory}</p></li>
          <li class="meal-ingredients"><p>Ingredients Preview: </p>
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
  };

// Display inital cocktail recipe results 
function displayCocktailResults(responseJson) {
  $(".cocktail-results-list").empty();
  $(".cocktail-expanded-results").empty();
  $(".error-message").empty();
  responseJson.drinks.forEach((drinks) => {
  $(".cocktail-results-list").append(
    `<li class="result-item">
    <header class="result-item-header">
      <h3 role="button" class="collapsible-trigger">${drinks.strDrink}</h3>
      <div>
        <img src="${drinks.strDrinkThumb}" class="results-img" alt="${drinks.strDrink}"/>
      </div>
    </header>
    
    <div class="result-item-info" style="display: none">
        <p>Type of Glass: ${drinks.strGlass}</p>
        <p>Category: ${drinks.strCategory}</p>
        <p>Instructions: ${drinks.strInstructions}</p>
        <div class="result-item-ingredients" class="cocktail-ingredients">
             <p>Ingredients Preview:</p>
         <ol>
             <li>${drinks.strIngredient1} - ${drinks.strMeasure1}</li>
             <li>${drinks.strIngredient2} - ${drinks.strMeasure2}</li>
             <li>${drinks.strIngredient3} - ${drinks.strMeasure3}</li>
             <li>${drinks.strIngredient4} - ${drinks.strMeasure4}</li>
        </ol>
    </div>
    </div>
    </li>`
    );
  $(".cocktail-results").removeClass("hidden");
  })
};

//Toggles between intitial results and the expanded results for each recipe 
function watchCollapsible() {
    $(document).on("click", ".collapsible-trigger", function () {
    $(this) {
        .closest(".result-item");
        .find(".result-item-info");
        .slideToggle("slow");
    };
    $(".cocktail-results-list").toggleClass("hidden");
    $(".cocktail-results-list").toggle(display);
    }); 
};

$(function() {
    watchMealForm();
    watchCocktailForm();
    watchCollapsible();
}); 




