 'use strict';

//fetches recipe list based on user search 
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

//watches for search from user 
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
  //display initial or collapsed results 
  responseJson.meals.forEach((meals) => {
  $('#results-list').append(
    `<ul>
      <li><h3>${meals.strMeal}</h3></li>
      <li><a href="${meals.strSource}" target="_blank"><img src="${meals.strMealThumb}" class="results-img"></a></li>
    </ul>`
   )
  // display expanded results that contains additional detail 
  $('#expanded-results').append(
    `<ul>
        <li><h3>${meals.strMeal}</h3></li>
        <li><a href="${meals.strSource}" target="_blank"><img src="${meals.strMealThumb}" class="results-img"></a></li>
        <li><p><a href="${meals.strYoutube}" target="_blank">Watch a how-to video</a></p>
        <li><p>Region: ${meals.strArea}</p></li>
        <li><p>Category: ${meals.strCategory}</p></li>
        <li><p>Ingredients: </p>
          <ul>
            <li>${meals.strIngredient1} - ${meals.strMeasure1}</li>
            <li>${meals.strIngredient2} - ${meals.strMeasure2}</li>
            <li>${meals.strIngredient3} - ${meals.strMeasure3}</li>
            <li>${meals.strIngredient4} - ${meals.strMeasure4}</li>
            <li>${meals.strIngredient5} - ${meals.strMeasure5}</li>
            <li>${meals.strIngredient6} - ${meals.strMeasure6}</li>
            <li>${meals.strIngredient7} - ${meals.strMeasure7}</li>
            <li>${meals.strIngredient8} - ${meals.strMeasure8}</li>
            <li>${meals.strIngredient9} - ${meals.strMeasure9}</li>
            <li>${meals.strIngredient10} - ${meals.strMeasure10}</li>
            <li>${meals.strIngredient11} - ${meals.strMeasure11}</li>
            <li>${meals.strIngredient12} - ${meals.strMeasure12}</li>
            <li>${meals.strIngredient13} - ${meals.strMeasure13}</li>
            <li>${meals.strIngredient14} - ${meals.strMeasure14}</li>
            <li>${meals.strIngredient15} - ${meals.strMeasure15}</li>
        </ul></li>
        <li><p>Instructions: ${meals.strInstructions}</p></li>
    </ul>`
   )
  });
 $('#results').removeClass('hidden');
}

//handles the button to expand and collapse all results 
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
