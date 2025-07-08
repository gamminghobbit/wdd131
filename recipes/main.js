import recipes from './recipes.mjs';

const recipesSection = document.querySelector('#recipes');
const searchInput = document.querySelector('#search'); // Connect to the input field

function displayRecipes(recipeList) {
  recipesSection.innerHTML = ''; // Clear previous results before adding new ones

  recipeList.forEach((recipe) => {
    const card = document.createElement('div');
    card.classList.add('recipe-card');

    const tagsHTML = tagsTemplate(recipe.tags);
    const starsHTML = ratingTemplate(recipe.rating);

    // Recipe content
    card.innerHTML = `
  <h2>${recipe.name}</h2>
  <img src="${recipe.image}" alt="${recipe.name}" />
  ${tagsHTML}
  <p>${starsHTML}</p>
  <p>${recipe.description}</p>
  <p><strong>Prep Time:</strong> ${recipe.prepTime}</p>
  <p><strong>Cook Time:</strong> ${recipe.cookTime}</p>
  <p><strong>Servings:</strong> ${recipe.recipeYield || 'N/A'}</p>
`;

if (recipeList.length === 0) {
  recipesSection.innerHTML = `<p>No recipes found. Try a different keyword!</p>`;
  return;
}

    recipesSection.appendChild(card);
  });
}

searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.toLowerCase();

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(keyword) ||
    recipe.description.toLowerCase().includes(keyword) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(keyword)) ||
    recipe.recipeIngredient.some(ingredient => ingredient.toLowerCase().includes(keyword))
  );

  filteredRecipes.sort((a, b) => a.name.localeCompare(b.name));

  displayRecipes(filteredRecipes);
});

function init() {
  const randomRecipe = getRandomListEntry(recipes);
  displayRecipes([randomRecipe]); // pass it as an array
}

init();

// Prevent form from reloading the page
const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
});

function getRandomListEntry(list) {
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}
function tagsTemplate(tags) {
  return `
    <ul class="recipe__tags">
      ${tags.map(tag => `<li>${tag}</li>`).join('')}
    </ul>
  `;
}
function ratingTemplate(rating) {
  let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;

  for (let i = 1; i <= 5; i++) {
    html += `<span aria-hidden="true">${i <= rating ? '⭐' : '☆'}</span>`;
  }

  html += `</span>`;
  return html;
}
