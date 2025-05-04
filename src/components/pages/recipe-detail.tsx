import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import Layout from "../layout/Layout";
import {
  Clock,
  Calendar,
  Printer,
  Save,
  ChevronLeft,
  Star,
  Check,
} from "lucide-react";
import { useAuth } from "../../../supabase/auth";

export default function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [steps, setSteps] = useState<
    { id: number; text: string; completed: boolean }[]
  >([]);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Simulate API fetch with timeout
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // For now, we'll simulate with sample data
        setTimeout(() => {
          // Sample recipe data based on ID
          const recipeData = {
            id,
            title: "Lemon Garlic Chicken with Spinach",
            cookingTime: "25 mins",
            prepTime: "10 mins",
            totalTime: "35 mins",
            servings: 4,
            calories: 350,
            protein: "30g",
            carbs: "15g",
            fat: "20g",
            dietType: "High-protein",
            image:
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
            description:
              "A simple yet flavorful dish with tender chicken, fresh spinach, and a zesty lemon garlic sauce.",
            rating: 4.8,
            difficulty: "Easy",
            ingredients: [
              "2 chicken breasts",
              "2 cups fresh spinach",
              "3 cloves garlic, minced",
              "2 tbsp olive oil",
              "1 lemon, juiced",
              "Salt and pepper to taste",
              "1/4 cup chicken broth",
              "1 tsp dried oregano",
              "1/4 tsp red pepper flakes (optional)",
            ],
            instructions: [
              "Season chicken breasts with salt, pepper, and dried oregano on both sides.",
              "Heat olive oil in a large skillet over medium-high heat.",
              "Add chicken breasts and cook for 5-7 minutes per side until golden brown and cooked through. Remove and set aside.",
              "In the same skillet, add minced garlic and cook for 30 seconds until fragrant.",
              "Add chicken broth and lemon juice, scraping up any browned bits from the bottom of the pan.",
              "Add red pepper flakes if using, and bring the sauce to a simmer.",
              "Add spinach and cook until just wilted, about 1-2 minutes.",
              "Return chicken to the skillet, spooning the sauce over the top.",
              "Cook for another 1-2 minutes until everything is heated through.",
              "Serve hot, garnished with lemon slices if desired.",
            ],
            substitutions:
              "No spinach? Try kale or swiss chard instead. For a dairy-free option, skip the parmesan garnish.",
            tips: "For extra flavor, add a splash of white wine to the sauce. You can also add cherry tomatoes during the last few minutes of cooking.",
          };
          setRecipe(recipeData);

          // Create steps with completion status
          const recipeSteps = recipeData.instructions.map((step, index) => ({
            id: index + 1,
            text: step,
            completed: false,
          }));

          setSteps(recipeSteps);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const toggleStepCompletion = (stepId: number) => {
    setSteps(
      steps.map((step) =>
        step.id === stepId ? { ...step, completed: !step.completed } : step,
      ),
    );
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-white pt-8 pb-20 px-6">
          <div className="max-w-4xl mx-auto flex flex-col items-center justify-center py-12">
            <LoadingSpinner size="lg" text="Loading recipe..." />
          </div>
        </div>
      </Layout>
    );
  }

  if (!recipe) {
    return (
      <Layout>
        <div className="min-h-screen bg-white pt-8 pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Recipe not found
              </h2>
              <p className="text-gray-600 mb-6">
                The recipe you're looking for doesn't exist or has been removed.
              </p>
              <Link to="/recipes">
                <Button>Back to Recipes</Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Calculate progress
  const completedSteps = steps.filter((step) => step.completed).length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <main className="pt-8 pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link
                to="/recipes"
                className="inline-flex items-center text-green-600 hover:text-green-700"
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Back to Recipes
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="relative h-80">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80";
                  }}
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1.5 fill-yellow-500" />
                  <span className="font-medium">{recipe.rating}</span>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-600 hover:bg-green-700 text-white border-0 text-sm px-3 py-1">
                    {recipe.dietType}
                  </Badge>
                </div>
              </div>

              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {recipe.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Total: {recipe.totalTime}
                  </span>
                  <span className="flex items-center">
                    <span className="h-1.5 w-1.5 bg-gray-300 rounded-full mx-1"></span>
                    Prep: {recipe.prepTime}
                  </span>
                  <span className="flex items-center">
                    <span className="h-1.5 w-1.5 bg-gray-300 rounded-full mx-1"></span>
                    Cook: {recipe.cookingTime}
                  </span>
                  <span className="flex items-center">
                    <span className="h-1.5 w-1.5 bg-gray-300 rounded-full mx-1"></span>
                    {recipe.servings} servings
                  </span>
                  <span className="flex items-center">
                    <span className="h-1.5 w-1.5 bg-gray-300 rounded-full mx-1"></span>
                    {recipe.difficulty}
                  </span>
                </div>

                <p className="text-gray-700 mb-8">{recipe.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-gray-50 p-4 rounded-lg">
                  <div className="text-center p-3">
                    <div className="text-sm text-gray-500">Calories</div>
                    <div className="text-xl font-semibold text-gray-900">
                      {recipe.calories}
                    </div>
                  </div>
                  <div className="text-center p-3">
                    <div className="text-sm text-gray-500">Protein</div>
                    <div className="text-xl font-semibold text-gray-900">
                      {recipe.protein}
                    </div>
                  </div>
                  <div className="text-center p-3">
                    <div className="text-sm text-gray-500">Carbs</div>
                    <div className="text-xl font-semibold text-gray-900">
                      {recipe.carbs}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900">
                    Ingredients
                  </h2>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {recipe.ingredients.map(
                      (ingredient: string, index: number) => (
                        <li key={index}>{ingredient}</li>
                      ),
                    )}
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900">
                    Instructions
                  </h2>

                  {/* Progress bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>
                        {completedSteps} of {steps.length} steps completed
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <ol className="list-none space-y-4 text-gray-700">
                    {steps.map((step) => (
                      <li
                        key={step.id}
                        className={`flex items-start gap-3 p-4 rounded-lg border ${step.completed ? "bg-green-50 border-green-200" : "bg-white border-gray-200"}`}
                        onClick={() => toggleStepCompletion(step.id)}
                      >
                        <div
                          className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 cursor-pointer ${step.completed ? "bg-green-500 text-white" : "border border-gray-300"}`}
                        >
                          {step.completed && <Check className="h-4 w-4" />}
                        </div>
                        <div
                          className={
                            step.completed ? "text-gray-500" : "text-gray-700"
                          }
                        >
                          <span className="font-medium">Step {step.id}</span>
                          <p>{step.text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                {recipe.substitutions && (
                  <div className="mb-8 bg-blue-50 p-4 rounded-md border border-blue-100">
                    <h3 className="text-lg font-medium text-blue-700 mb-2">
                      Substitution Ideas
                    </h3>
                    <p className="text-blue-600">{recipe.substitutions}</p>
                  </div>
                )}

                {recipe.tips && (
                  <div className="mb-8 bg-green-50 p-4 rounded-md border border-green-100">
                    <h3 className="text-lg font-medium text-green-700 mb-2">
                      Chef's Tips
                    </h3>
                    <p className="text-green-600">{recipe.tips}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    className="rounded-full border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800 hover:border-green-300 flex items-center gap-1"
                  >
                    <Save className="h-4 w-4" /> Save Recipe
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300 flex items-center gap-1"
                  >
                    <Calendar className="h-4 w-4" /> Add to Meal Plan
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-800 hover:border-gray-300 flex items-center gap-1"
                  >
                    <Printer className="h-4 w-4" /> Print Recipe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
