import React, { useState } from "react";
import IngredientInputEnhanced from "./IngredientInputEnhanced";
import RecipeCard from "./RecipeCard";
import { Loader2 } from "lucide-react";
import {
  generateRecipeFromIngredients,
  RecipeResponse,
} from "@/services/openai-service";

const RecipeGeneratorEnhanced = () => {
  const [loading, setLoading] = useState(false);
  const [generatedRecipes, setGeneratedRecipes] = useState<RecipeResponse[]>(
    [],
  );
  const [error, setError] = useState<string | null>(null);

  const generateRecipe = async (
    ingredients: string,
    dietaryPreference: string,
  ) => {
    setLoading(true);
    setError(null);

    try {
      // Call the OpenAI service to generate recipes
      const response = await generateRecipeFromIngredients(
        ingredients,
        dietaryPreference !== "No restrictions" ? dietaryPreference : undefined,
      );
      setGeneratedRecipes(response);
    } catch (err) {
      console.error("Error generating recipe:", err);
      setError("Failed to generate recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <IngredientInputEnhanced
            onGenerateRecipe={generateRecipe}
            isLoading={loading}
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Generated Recipes
          </h2>

          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-xl border border-gray-100">
              <Loader2 className="h-8 w-8 text-green-500 animate-spin mb-4" />
              <p className="text-gray-600">Generating delicious recipes...</p>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-red-600">{error}</p>
            </div>
          ) : generatedRecipes.length > 0 ? (
            <div className="space-y-6">
              {generatedRecipes.map((recipe, index) => (
                <RecipeCard
                  key={`generated-${index}`}
                  id={`generated-${index}`}
                  title={recipe.title}
                  cookingTime={recipe.cookingTime}
                  calories={recipe.calories}
                  dietType={recipe.dietType}
                  image={recipe.image}
                  description={recipe.description}
                  rating={recipe.rating}
                  difficulty={recipe.difficulty}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-gray-500 mb-2">No recipes generated yet</p>
              <p className="text-sm text-gray-400">
                Enter ingredients and click "Generate Recipe"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeGeneratorEnhanced;
