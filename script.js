const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn= document.querySelector('.recipe-closeBtn');

//Function to get recipes from API
const fetchRecipes = async (recipe) => {
    recipeContainer.innerHTML="Fetching Recipes....";
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.meals);
   recipeContainer.innerHTML="";
    data.meals.forEach(meal => {
      const recipeDiv = document.createElement('div');
      recipeDiv.classList.add('recipe-card');
      recipeDiv.innerHTML = `
        <img src= "${meal.strMealThumb}">  
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea} </span>Dish</p>
        <p>Belongs to <span>${meal.strCategory} </span> Category </p>
      `
      const button = document.createElement('button');
      button.textContent = "View Recipe";
      recipeDiv.appendChild(button);
      //Adding event listner to recipe button
      button.addEventListener("click",() => {
        openRecipePopup(meal);
      })
      recipeContainer.appendChild(recipeDiv);
    });
}  
//Function to fetch ingredients 
const fetchIngredients = meal => {
  let ingredientList ="";
  for (i=1; i<=20; i++){
    const ingredient = meal[`strIngredient${i}`];
    if(ingredient){
      const measure = meal[`strMeasure${i}`];
      ingredientList += `<li>${measure} ${ingredient}</li>`;
    }else{
      break;
    }
  }
  return ingredientList;
}
//Function for recipe popup 
const openRecipePopup = meal => {
  recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div  class="recipeInstructions">
    <h3>Instructions:</h3>
    <p>${meal.strInstructions}</p>
    </div>
  `
  recipeDetailsContent.parentElement.style.display = "block";
};

recipeCloseBtn.addEventListener('click', e => { 
  recipeDetailsContent.parentElement.style.display = "none";
});

searchBtn.addEventListener('click', e => { 
    e.preventDefault();
    const recipe = searchBox.value.trim();

    //update the details with recipes
   fetchRecipes(recipe);
   console.log('button clicked');
});