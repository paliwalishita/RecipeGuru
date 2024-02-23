const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');

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
        <p>${meal.strArea}</p>
        <p>${meal.strCategory}</p>
      `
      recipeContainer.appendChild(recipeDiv);
    });
    
}
searchBtn.addEventListener('click', e => { 
    e.preventDefault();
    const recipe = searchBox.value.trim();

    //update the details with recipes
   fetchRecipes(recipe);
   console.log('button clicked');
});