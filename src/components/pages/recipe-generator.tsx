import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "../../../supabase/auth";
import { useToast } from "@/components/ui/use-toast";

export default function RecipeGeneratorPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [ingredients, setIngredients] = useState("");
  const [dietaryPreference, setDietaryPreference] = useState("");
  const [nutritionalGoal, setNutritionalGoal] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [recipe, setRecipe] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    // Simulate API call with timeout
    setTimeout(() => {
      // Mock recipe data
      setRecipe({
        title: "Lemon Garlic Chicken with Spinach",
        cookingTime: "25 mins",
        calories: "350",
        nutritionalTag: "High protein",
        ingredients: [
          "2 chicken breasts",
          "2 cups fresh spinach",
          "3 cloves garlic, minced",
          "2 tbsp olive oil",
          "1 lemon, juiced",
          "Salt and pepper to taste",
        ],
        instructions: [
          "Season chicken with salt and pepper",
          "Heat olive oil in a pan over medium heat",
          "Cook chicken for 5-7 minutes per side",
          "Add garlic and cook for 30 seconds",
          "Add spinach and lemon juice",
          "Cook until spinach is wilted",
        ],
        substitutions:
          "No spinach? Try kale or swiss chard instead. For a dairy-free option, skip the parmesan garnish.",
      });

      setIsGenerating(false);
      toast({
        title: "Recipe Generated",
        description: "Your personalized recipe is ready!",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header is included in the App layout */}

      <main className="pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Recipe Generator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tell us what ingredients you have, and we'll create a delicious
              recipe just for you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">
                Input Your Ingredients
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="ingredients"
                    className="text-gray-700 font-medium"
                  >
                    Ingredients
                  </Label>
                  <Textarea
                    id="ingredients"
                    placeholder="Enter ingredients separated by commas (e.g., chicken, spinach, garlic, olive oil, lemon)"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    required
                    className="min-h-[120px] rounded-lg border-gray-200 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="dietary-preference"
                      className="text-gray-700 font-medium"
                    >
                      Dietary Preferences
                    </Label>
                    <Select
                      value={dietaryPreference}
                      onValueChange={setDietaryPreference}
                    >
                      <SelectTrigger className="h-12 rounded-lg border-gray-200 focus:ring-green-500 focus:border-green-500">
                        <SelectValue placeholder="Select preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Preference</SelectItem>
                        <SelectItem value="vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="vegan">Vegan</SelectItem>
                        <SelectItem value="gluten-free">Gluten-Free</SelectItem>
                        <SelectItem value="dairy-free">Dairy-Free</SelectItem>
                        <SelectItem value="keto">Keto</SelectItem>
                        <SelectItem value="paleo">Paleo</SelectItem>
                        <SelectItem value="low-carb">Low-Carb</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="nutritional-goal"
                      className="text-gray-700 font-medium"
                    >
                      Nutritional Goals
                    </Label>
                    <Select
                      value={nutritionalGoal}
                      onValueChange={setNutritionalGoal}
                    >
                      <SelectTrigger className="h-12 rounded-lg border-gray-200 focus:ring-green-500 focus:border-green-500">
                        <SelectValue placeholder="Select goal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Specific Goal</SelectItem>
                        <SelectItem value="high-protein">
                          High Protein
                        </SelectItem>
                        <SelectItem value="low-calorie">Low Calorie</SelectItem>
                        <SelectItem value="low-fat">Low Fat</SelectItem>
                        <SelectItem value="high-fiber">High Fiber</SelectItem>
                        <SelectItem value="balanced">
                          Balanced Nutrition
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isGenerating || !ingredients}
                  className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white h-12 rounded-lg font-medium"
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Generating Recipe...
                    </div>
                  ) : (
                    "Generate Recipe"
                  )}
                </Button>
              </form>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
              <h2 className="text-2xl font-semibold mb-6">Your Recipe</h2>

              {recipe ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-green-600">
                      {recipe.title}
                    </h3>
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
                        </svg>
                        {recipe.cookingTime}
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
                        </svg>
                        {recipe.calories} calories
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
                        </svg>
                        {recipe.nutritionalTag}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">
                      Ingredients:
                    </h4>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      {recipe.ingredients.map(
                        (ingredient: string, index: number) => (
                          <li key={index}>{ingredient}</li>
                        ),
                      )}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">
                      Instructions:
                    </h4>
                    <ol className="list-decimal pl-5 text-gray-600 space-y-2">
                      {recipe.instructions.map(
                        (instruction: string, index: number) => (
                          <li key={index}>{instruction}</li>
                        ),
                      )}
                    </ol>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800 hover:border-green-300 flex items-center gap-1"
                    >
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
                      >
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                        <polyline points="17 21 17 13 7 13 7 21" />
                        <polyline points="7 3 7 8 15 8" />
                      </svg>
                      Save Recipe
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300 flex items-center gap-1"
                    >
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
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <line x1="16" x2="16" y1="2" y2="6" />
                        <line x1="8" x2="8" y1="2" y2="6" />
                        <line x1="3" x2="21" y1="10" y2="10" />
                      </svg>
                      Add to Meal Plan
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-800 hover:border-gray-300 flex items-center gap-1"
                    >
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
                      >
                        <polyline points="6 9 6 2 18 2 18 9" />
                        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                        <rect x="6" y="14" width="12" height="8" />
                      </svg>
                      Print
                    </Button>
                  </div>

                  {recipe.substitutions && (
                    <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                      <h5 className="text-sm font-medium text-blue-700 flex items-center gap-1 mb-1">
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
                      <p className="text-sm text-blue-600">
                        {recipe.substitutions}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">
                    No Recipe Generated Yet
                  </h3>
                  <p className="text-gray-500 max-w-md">
                    Enter your ingredients and preferences on the left to
                    generate a personalized recipe.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-center mb-8">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-green-600">1</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Enter Ingredients</h3>
                <p className="text-gray-600">
                  Tell us what ingredients you have available in your kitchen.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Set Preferences</h3>
                <p className="text-gray-600">
                  Choose your dietary preferences and nutritional goals.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Get Your Recipe</h3>
                <p className="text-gray-600">
                  Our AI generates a personalized recipe based on your inputs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
