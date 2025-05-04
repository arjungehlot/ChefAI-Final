import React, { useState } from 'react';

interface Ingredient {
  original: string;
}

interface Recipe {
  id: number;
  title: string;
  image: string;
  extendedIngredients: Ingredient[];
  instructions: string;
}

const SearchRecipes: React.FC = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = 'e81ac837eefa4fc6a5dccd6116a62431';

  const searchRecipes = async () => {
    if (!ingredients.trim()) return;

    setLoading(true);
    setError('');
    setRecipes([]);

    try {
      const searchRes = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${apiKey}`
      );
      const searchData = await searchRes.json();

      const detailedRecipes: Recipe[] = [];

      for (const recipe of searchData) {
        const infoRes = await fetch(
          `https://api.spoonacular.com/recipes/${recipe.id}/information?includeNutrition=false&apiKey=${apiKey}`
        );
        const info = await infoRes.json();
        detailedRecipes.push(info);
      }

      if (detailedRecipes.length === 0) {
        setError('No recipes found for the given ingredients.');
      } else {
        setRecipes(detailedRecipes);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load recipes. Please try again later.');
    }

    setLoading(false);
  };

  return (
    <div className="mx-28 bg-gray-50 p-6 md:p-10 font-sans">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">Search Recipes by Ingredients</h1>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="e.g., chicken, tomato"
          className="w-full sm:w-96 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={searchRecipes}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow transition duration-300"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center text-gray-600">Loading recipes...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 text-indigo-600">{recipe.title}</h3>
            <div className="ingredients mb-3">
              <strong>Ingredients:</strong>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {recipe.extendedIngredients.map((i, idx) => (
                  <li key={idx}>{i.original}</li>
                ))}
              </ul>
            </div>
            <div className="instructions text-sm text-gray-800">
              <strong>Instructions:</strong>
              <p>{recipe.instructions ? recipe.instructions : 'No instructions provided.'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchRecipes;
