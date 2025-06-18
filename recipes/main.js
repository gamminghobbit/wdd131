import recipes from './recipes.mjs';

const recipesSection = document.querySelector('#recipes');
const searchInput = document.querySelector('#search'); // Connect to the input field

function displayRecipes(recipeList) {
  recipesSection.innerHTML = ''; // Clear previous results before adding new ones

  recipeList.forEach((recipe) => {
    const card = document.createElement('div');
    card.classList.add('recipe-card');

    // Build star rating
    const stars = document.createElement('span');
    stars.classList.add('rating');
    stars.setAttribute('role', 'img');
    stars.setAttribute('aria-label', `Rating: ${recipe.rating} out of 5 stars`);

    const fullStars = Math.floor(recipe.rating);
    const emptyStars = 5 - fullStars;

    for (let i = 0; i < fullStars; i++) {
      stars.innerHTML += `<span aria-hidden="true">⭐</span>`;
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.innerHTML += `<span aria-hidden="true">☆</span>`;
    }

    // Recipe content
    card.innerHTML = `
      <h2>${recipe.name}</h2>
      <img src="${recipe.image}" alt="${recipe.name}" />
      <p>${recipe.description}</p>
      <p><strong>Prep Time:</strong> ${recipe.prepTime}</p>
      <p><strong>Cook Time:</strong> ${recipe.cookTime}</p>
      <p><strong>Servings:</strong> ${recipe.recipeYield || 'N/A'}</p>
    `;

    card.appendChild(stars);
    recipesSection.appendChild(card);
  });
}

searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.toLowerCase();

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(keyword) ||
    recipe.description.toLowerCase().includes(keyword) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(keyword))
  );

  displayRecipes(filteredRecipes);
});

displayRecipes(recipes);

// Prevent form from reloading the page
const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
});
