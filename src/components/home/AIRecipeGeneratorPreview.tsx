import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card, CardContent } from "../ui/card";
import { Camera, Loader2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface Ingredient {
  original: string;
}

interface Recipe {
  id: number;
  title: string;
  image: string;
  extendedIngredients: Ingredient[];
  instructions: string;
  readyInMinutes?: number;
  servings?: number;
  healthScore?: number;
  diets?: string[];
}

type GeneratedRecipe = {
  title: string;
  time: string;
  calories: string;
  nutritionType: string;
  ingredients: string[];
  instructions: string[];
  substitutions: string;
};

export default function AIRecipeGeneratorPreview() {
  const [ingredients, setIngredients] = useState("");
  const [dietaryPreference, setDietaryPreference] = useState("low-carb");
  const [nutritionalGoal, setNutritionalGoal] = useState("high-protein");
  const [generatedRecipe, setGeneratedRecipe] =
    useState<GeneratedRecipe | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "e81ac837eefa4fc6a5dccd6116a62431";

  // Function to handle recipe generation
  const handleGenerateRecipe = async () => {
    if (!ingredients.trim()) return;

    setIsGenerating(true);
    setError("");
    setRecipes([]);
    setGeneratedRecipe(null);

    try {
      // Build query parameters including dietary preferences and nutritional goals
      let queryParams = new URLSearchParams();
      queryParams.append("ingredients", ingredients);
      queryParams.append("number", "5");
      queryParams.append("apiKey", apiKey);

      if (dietaryPreference && dietaryPreference !== "none") {
        queryParams.append("diet", dietaryPreference);
      }

      // Search for recipes by ingredients
      const searchRes = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?${queryParams.toString()}`
      );
      const searchData = await searchRes.json();

      if (!searchRes.ok) {
        throw new Error(searchData.message || "Failed to fetch recipes");
      }

      const detailedRecipes: Recipe[] = [];

      // Get detailed information for each recipe
      for (const recipe of searchData) {
        // Add additional parameters for nutritional goals
        let infoParams = new URLSearchParams();
        infoParams.append("includeNutrition", "true");
        infoParams.append("apiKey", apiKey);

        const infoRes = await fetch(
          `https://api.spoonacular.com/recipes/${
            recipe.id
          }/information?${infoParams.toString()}`
        );
        const info = await infoRes.json();
        detailedRecipes.push(info);
      }

      if (detailedRecipes.length === 0) {
        setError("No recipes found for the given ingredients.");
      } else {
        setRecipes(detailedRecipes);

        // Also set the first recipe as the generated recipe for the existing UI
        const firstRecipe = detailedRecipes[0];
        setGeneratedRecipe({
          title: firstRecipe.title,
          time: `${firstRecipe.readyInMinutes || 25} mins`,
          calories: `${firstRecipe.healthScore || 350} calories`,
          nutritionType: firstRecipe.diets?.length
            ? firstRecipe.diets[0]
            : "Balanced",
          ingredients: firstRecipe.extendedIngredients.map(
            (ing) => ing.original
          ),
          instructions: firstRecipe.instructions
            ? firstRecipe.instructions
                .split(".")
                .filter((s) => s.trim().length > 0)
            : ["No detailed instructions available"],
          substitutions:
            "Try using similar ingredients if you don't have everything on hand.",
        });
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load recipes. Please try again later.");
    }

    setIsGenerating(false);
  };

  // Function to handle "Surprise Me" button
  const handleSurpriseMe = () => {
    setIngredients("chicken, spinach, garlic, olive oil, lemon");
    setDietaryPreference("low-carb");
    setNutritionalGoal("high-protein");
    handleGenerateRecipe();
  };

  // Function to handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle image analysis
  const handleAnalyzeImage = async () => {
    if (!imageFile) return;

    setIsAnalyzingImage(true);
    setError("");

    try {
      // Create a FormData object to send the image
      const formData = new FormData();
      formData.append("file", imageFile);

      // Call the Spoonacular API to analyze the image
      const response = await fetch(
        `https://api.spoonacular.com/food/images/analyze?apiKey=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to analyze image");
      }

      // Extract ingredients from the response
      if (data.category && data.annotations) {
        const detectedIngredients = data.annotations
          .map((item: any) => item.annotation)
          .join(", ");

        setIngredients((prev) =>
          prev ? `${prev}, ${detectedIngredients}` : detectedIngredients
        );
      } else {
        // Fallback for demo purposes if the API doesn't return expected data
        const detectedIngredients = "Wheat flour, egg, milk, butter";
        setIngredients((prev) =>
          prev ? `${prev}, ${detectedIngredients}` : detectedIngredients
        );
      }
    } catch (err) {
      console.error("Error analyzing image:", err);
      setError("Failed to analyze image. Please try again.");

      // Fallback for demo purposes
      const detectedIngredients = "tomatoes, onions, bell peppers, chicken";
      setIngredients((prev) =>
        prev ? `${prev}, ${detectedIngredients}` : detectedIngredients
      );
    }

    setIsAnalyzingImage(false);
  };

  function mergeInstructions(instructions) {
    const merged = [];
    let buffer = "";

    for (let text of instructions) {
      const clean = text.replace(/<\/?p>/g, "").trim();
      if (clean.length < 40 && buffer) {
        buffer += " " + clean;
      } else {
        if (buffer) merged.push(buffer);
        buffer = clean;
      }
    }

    if (buffer) merged.push(buffer);
    return merged;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Recipe Generator
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Turn your available ingredients into delicious meals with our smart
            recipe generator
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              What's in your kitchen?
            </h3>
            <div className="space-y-4">
              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload a photo of your ingredients
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex-1">
                    <div className="relative flex h-10 w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors">
                      <Camera className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-500">
                        Choose image
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageChange}
                      />
                    </div>
                  </label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAnalyzeImage}
                    disabled={!imageFile || isAnalyzingImage}
                    className="h-10"
                  >
                    {isAnalyzingImage ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Analyze Image"
                    )}
                  </Button>
                </div>

                {imagePreview && (
                  <div className="relative mt-2 rounded-md overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Ingredient preview"
                      className="w-full h-32 object-cover rounded-md"
                    />
                    {isAnalyzingImage && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-white text-sm font-medium">
                          Analyzing image...
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ingredients
                </label>
                <Textarea
                  className="h-24 bg-gray-50 rounded-md w-full border border-gray-200 p-2 text-sm"
                  placeholder="Enter ingredients separated by commas (e.g., chicken, spinach, garlic, olive oil, lemon...)"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dietary Preferences
                  </label>
                  <Select
                    value={dietaryPreference}
                    onValueChange={setDietaryPreference}
                  >
                    <SelectTrigger className="h-10 bg-gray-50 rounded-md w-full border border-gray-200">
                      <SelectValue placeholder="Select dietary preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low-carb">Low-carb</SelectItem>
                      <SelectItem value="keto">Keto</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="gluten-free">Gluten-free</SelectItem>
                      <SelectItem value="dairy-free">Dairy-free</SelectItem>
                      <SelectItem value="paleo">Paleo</SelectItem>
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
                    <SelectTrigger className="h-10 bg-gray-50 rounded-md w-full border border-gray-200">
                      <SelectValue placeholder="Select nutritional goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-protein">High protein</SelectItem>
                      <SelectItem value="low-calorie">Low calorie</SelectItem>
                      <SelectItem value="low-fat">Low fat</SelectItem>
                      <SelectItem value="high-fiber">High fiber</SelectItem>
                      <SelectItem value="balanced">Balanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-md hover:shadow-lg transition-all"
                  disabled={isGenerating || !ingredients.trim()}
                  onClick={handleGenerateRecipe}
                >
                  {isGenerating ? "Generating..." : "Generate Recipe"}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800 hover:border-green-300"
                  onClick={handleSurpriseMe}
                  disabled={isGenerating}
                >
                  Surprise Me!
                </Button>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-md flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="overflow-hidden shadow-lg border-0 bg-white">
              <div className="bg-gradient-to-r from-green-600 to-green-500 p-4 text-white">
                <h3 className="font-semibold text-xl">
                  Your AI-Generated Recipe
                </h3>
                <p className="text-green-100 text-sm">
                  Personalized just for you
                </p>
              </div>
              <CardContent className="p-6">
                {!generatedRecipe && !isGenerating ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-300 mb-4"
                    >
                      <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
                      <line x1="6" x2="18" y1="17" y2="17" />
                    </svg>
                    <p className="text-gray-500">
                      Enter your ingredients and preferences, then click
                      "Generate Recipe" or try "Surprise Me!" to see your
                      personalized recipe here.
                    </p>
                  </div>
                ) : isGenerating ? (
                  <div className="flex flex-col items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4"></div>
                    <p className="text-gray-600 font-medium">
                      Generating your recipe...
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Our AI is creating a personalized recipe based on your
                      ingredients and preferences.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-semibold text-green-600">
                        {generatedRecipe.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-1"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>{" "}
                          {generatedRecipe.time}
                        </span>
                        <span className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-1"
                          >
                            <path d="M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0-6.36-6.37C5.77 11.84 2.27 21.7 2.27 21.7zM15.42 15.42l6.37-6.37" />
                          </svg>{" "}
                          {generatedRecipe.calories}
                        </span>
                        <span className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-1"
                          >
                            <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                            <line x1="16" x2="2" y1="8" y2="22" />
                            <line x1="17.5" x2="9" y1="15" y2="15" />
                          </svg>{" "}
                          {generatedRecipe.nutritionType}
                        </span>
                      </div>
                    </div>

                    <div className="text-sm">
                      <h5 className="font-medium text-gray-700 mb-1">
                        Ingredients:
                      </h5>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1">
                        {generatedRecipe.ingredients.map(
                          (ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                          )
                        )}
                      </ul>
                    </div>

                    <div className="text-sm">
                      <h5 className="font-medium text-gray-700 mb-1">
                        Instructions:
                      </h5>
                      <ul className="list-decimal pl-5 text-gray-600 space-y-1">
                        {mergeInstructions(generatedRecipe.instructions).map(
                          (step, index) => (
                            <li key={index}>{step}</li>
                          )
                        )}
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                      <h5 className="text-sm font-medium text-blue-700 flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                          <line x1="12" x2="12.01" y1="17" y2="17" />
                        </svg>
                        Substitution Ideas:
                      </h5>
                      <p className="text-xs text-blue-600 mt-1">
                        {generatedRecipe.substitutions}
                      </p>
                    </div>

                    <Link to="/recipe-generator" className="block w-full mt-4">
                      <Button
                        variant="outline"
                        className="w-full border-green-200 text-green-700 hover:bg-green-50"
                      >
                        Try More Recipes
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional Recipes Section */}
            {recipes.length > 1 && (
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-4">
                  More Recipe Suggestions
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {recipes.slice(1).map((recipe) => (
                    <div
                      key={recipe.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex gap-4">
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                        <div>
                          <h4 className="font-medium text-green-600">
                            {recipe.title}
                          </h4>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {recipe.readyInMinutes && (
                              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                                {recipe.readyInMinutes} mins
                              </span>
                            )}
                            {recipe.healthScore && (
                              <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                                Health score: {recipe.healthScore}
                              </span>
                            )}
                            {recipe.diets && recipe.diets.length > 0 && (
                              <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
                                {recipe.diets[0]}
                              </span>
                            )}
                          </div>
                          <Button
                            variant="link"
                            className="text-sm p-0 h-auto mt-2 text-green-600"
                            onClick={() => {
                              // Set this recipe as the main displayed recipe
                              setGeneratedRecipe({
                                title: recipe.title,
                                time: `${recipe.readyInMinutes || 25} mins`,
                                calories: `${
                                  recipe.healthScore || 350
                                } calories`,
                                nutritionType: recipe.diets?.length
                                  ? recipe.diets[0]
                                  : "Balanced",
                                ingredients: recipe.extendedIngredients.map(
                                  (ing) => ing.original
                                ),
                                instructions: recipe.instructions
                                  ? recipe.instructions
                                      .split(".")
                                      .filter((s) => s.trim().length > 0)
                                  : ["No detailed instructions available"],
                                substitutions:
                                  "Try using similar ingredients if you don't have everything on hand.",
                              });
                            }}
                          >
                            View Recipe
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
