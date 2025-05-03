import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Printer,
  Save,
  Calendar,
  RefreshCw,
  Search,
  ChevronRight,
} from "lucide-react";
import {
  generateRecipeFromIngredients,
  RecipeResponse,
} from "@/services/openai-service";
import RecipeCard from "./RecipeCard";

interface RecipeGeneratorProps {
  initialIngredients?: string;
  initialDietaryPreference?: string;
  initialNutritionalGoal?: string;
}

export default function RecipeGenerator({
  initialIngredients = "",
  initialDietaryPreference = "none",
  initialNutritionalGoal = "balanced",
}: RecipeGeneratorProps) {
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [dietaryPreference, setDietaryPreference] = useState(
    initialDietaryPreference,
  );
  const [nutritionalGoal, setNutritionalGoal] = useState(
    initialNutritionalGoal,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState<RecipeResponse[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeResponse | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Filter recipes based on search query
  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.dietType.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Generate recipes based on ingredients
  const generateRecipes = async () => {
    if (!ingredients.trim()) return;

    setIsLoading(true);
    setSelectedRecipe(null);

    try {
      const generatedRecipes = await generateRecipeFromIngredients(
        ingredients,
        dietaryPreference === "none" ? undefined : dietaryPreference,
      );

      setRecipes(generatedRecipes);

      // Auto-select the first recipe if available
      if (generatedRecipes.length > 0) {
        setSelectedRecipe(generatedRecipes[0]);
      }
    } catch (error) {
      console.error("Error generating recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Select a different recipe
  const selectRecipe = (recipe: RecipeResponse) => {
    setSelectedRecipe(recipe);
  };

  // Generate alternative recipe
  const generateAlternative = async () => {
    if (!ingredients.trim()) return;

    setIsLoading(true);

    try {
      const generatedRecipes = await generateRecipeFromIngredients(
        ingredients,
        dietaryPreference === "none" ? undefined : dietaryPreference,
      );

      // Add new recipes to the existing list
      setRecipes((prevRecipes) => [...prevRecipes, ...generatedRecipes]);

      // Select the first new recipe
      if (generatedRecipes.length > 0) {
        setSelectedRecipe(generatedRecipes[0]);
      }
    } catch (error) {
      console.error("Error generating alternative recipe:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 bg-white">
      {/* Input Section */}
      <Card className="bg-white shadow-md lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Input Your Ingredients
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ingredients
              </label>
              <Textarea
                placeholder="Enter ingredients separated by commas (e.g., chicken, spinach, garlic)"
                className="min-h-[100px]"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dietary Preferences
                </label>
                <Select
                  value={dietaryPreference}
                  onValueChange={setDietaryPreference}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Restrictions</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="keto">Keto</SelectItem>
                    <SelectItem value="gluten-free">Gluten Free</SelectItem>
                    <SelectItem value="dairy-free">Dairy Free</SelectItem>
                    <SelectItem value="low-carb">Low Carb</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nutritional Goals
                </label>
                <Select
                  value={nutritionalGoal}
                  onValueChange={setNutritionalGoal}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="high-protein">High Protein</SelectItem>
                    <SelectItem value="low-calorie">Low Calorie</SelectItem>
                    <SelectItem value="low-fat">Low Fat</SelectItem>
                    <SelectItem value="high-fiber">High Fiber</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              onClick={generateRecipes}
              disabled={isLoading || !ingredients.trim()}
            >
              {isLoading ? "Generating..." : "Generate Recipes"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recipe List Section */}
      <Card className="bg-white shadow-md lg:col-span-2">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Possible Recipes
            </CardTitle>
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search recipes..."
                className="pl-8 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          {recipes.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              Found {filteredRecipes.length} recipes with your ingredients
            </p>
          )}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : recipes.length > 0 ? (
            <div className="space-y-6">
              {/* Recipe Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredRecipes.map((recipe, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer transition-all duration-200 ${selectedRecipe === recipe ? "ring-2 ring-green-500 ring-offset-2" : "hover:shadow-lg"}`}
                    onClick={() => selectRecipe(recipe)}
                  >
                    <RecipeCard
                      title={recipe.title}
                      cookingTime={recipe.cookingTime}
                      calories={recipe.calories}
                      dietType={recipe.dietType}
                      image={recipe.image}
                      description={recipe.description}
                      rating={recipe.rating}
                      difficulty={recipe.difficulty}
                    />
                  </div>
                ))}
              </div>

              {/* Selected Recipe Details */}
              {selectedRecipe && (
                <div className="mt-8 border-t pt-6">
                  <h3 className="text-xl font-semibold text-green-600 mb-4">
                    {selectedRecipe.title} - Full Recipe
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">
                        Ingredients:
                      </h4>
                      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                        {selectedRecipe.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">
                        Instructions:
                      </h4>
                      <ol className="list-decimal pl-5 text-sm text-gray-600 space-y-1">
                        {selectedRecipe.instructions.map(
                          (instruction, index) => (
                            <li key={index}>{instruction}</li>
                          ),
                        )}
                      </ol>
                    </div>
                  </div>

                  {selectedRecipe.substitutions && (
                    <div className="bg-blue-50 p-3 rounded-md mt-4">
                      <h5 className="text-sm font-medium text-blue-700">
                        Substitution Ideas:
                      </h5>
                      <p className="text-xs text-blue-600">
                        {selectedRecipe.substitutions}
                      </p>
                    </div>
                  )}

                  {selectedRecipe.tips && (
                    <div className="bg-amber-50 p-3 rounded-md mt-4">
                      <h5 className="text-sm font-medium text-amber-700">
                        Chef Tips:
                      </h5>
                      <p className="text-xs text-amber-600">
                        {selectedRecipe.tips}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Save className="h-4 w-4" /> Save Recipe
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Calendar className="h-4 w-4" /> Add to Meal Plan
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={generateAlternative}
                      disabled={isLoading}
                    >
                      <RefreshCw className="h-4 w-4" /> Find More Recipes
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Printer className="h-4 w-4" /> Print Recipe
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <p className="text-center">
                Enter your ingredients and preferences, then click "Generate
                Recipes" to see all possible dishes you can make.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
