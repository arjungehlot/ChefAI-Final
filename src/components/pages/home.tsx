import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, ChevronRight, Settings, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../supabase/auth";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import RecipeCardsGrid from "../home/RecipeCardsGrid";
import WeeklyMealPlannerPreview from "../home/WeeklyMealPlannerPreview";
// import RecipesPage from "./recipes";
// import CareersPage from "./careers";

type GeneratedRecipe = {
  title: string;
  time: string;
  calories: string;
  nutritionType: string;
  ingredients: string[];
  instructions: string[];
  substitutions: string;
};

export default function LandingPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // State for recipe generator
  const [ingredients, setIngredients] = useState("");
  const [dietaryPreference, setDietaryPreference] = useState("low-carb");
  const [nutritionalGoal, setNutritionalGoal] = useState("high-protein");
  const [generatedRecipe, setGeneratedRecipe] =
    useState<GeneratedRecipe | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Function to handle recipe generation
  const handleGenerateRecipe = () => {
    setIsGenerating(true);

    // Simulate API call with timeout
    setTimeout(() => {
      setGeneratedRecipe({
        title: "Lemon Garlic Chicken with Spinach",
        time: "25 mins",
        calories: "350 calories",
        nutritionType: "High protein",
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
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Enhanced Navigation */}
      <header className="fixed top-0 z-50 w-full bg-gradient-to-r from-green-50 to-white backdrop-blur-md border-b border-green-100 shadow-sm">
        <div className="max-w-[1200px] mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chef-hat"
                >
                  <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
                  <line x1="6" x2="18" y1="17" y2="17" />
                </svg>
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
                ChefAI
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/recipes"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Recipes
            </Link>
            <Link
              to="/meal-plans"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Meal Plans
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              About Us
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard">
                  <Button
                    variant="ghost"
                    className="text-sm font-medium hover:text-green-600 hover:bg-green-50"
                  >
                    My Kitchen
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-2 bg-white rounded-full pl-2 pr-1 py-1 border border-gray-200 hover:border-green-300 cursor-pointer transition-all">
                      <span className="text-sm font-medium text-gray-700">
                        My Account
                      </span>
                      <Avatar className="h-8 w-8 border-2 border-green-100">
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                          alt={user.email || ""}
                        />
                        <AvatarFallback className="bg-green-100 text-green-800">
                          {user.email?.[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="rounded-xl border border-green-100 shadow-lg w-56"
                  >
                    <DropdownMenuLabel className="text-sm text-gray-700 border-b border-green-50 pb-2">
                      <div className="font-medium">{user.email}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Premium Member
                      </div>
                    </DropdownMenuLabel>
                    <div className="p-2">
                      <DropdownMenuItem className="cursor-pointer rounded-lg hover:bg-green-50 hover:text-green-700">
                        <User className="mr-2 h-4 w-4" />
                        My Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer rounded-lg hover:bg-green-50 hover:text-green-700">
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
                          className="mr-2"
                        >
                          <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
                          <line x1="6" x2="18" y1="17" y2="17" />
                        </svg>
                        My Recipes
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer rounded-lg hover:bg-green-50 hover:text-green-700">
                        <Calendar className="mr-2 h-4 w-4" />
                        Meal Calendar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer rounded-lg hover:bg-green-50 hover:text-green-700">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </DropdownMenuItem>
                    </div>
                    <DropdownMenuSeparator className="bg-green-50" />
                    <div className="p-2">
                      <DropdownMenuItem
                        className="cursor-pointer rounded-lg hover:bg-red-50 hover:text-red-600"
                        onSelect={() => signOut()}
                      >
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
                          className="mr-2"
                        >
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Sign Out
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="text-sm font-medium hover:text-green-600 hover:bg-green-50 rounded-lg px-4"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600 text-sm px-5 py-2 shadow-sm hover:shadow transition-all font-medium">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="pt-12 overflow-hidden">
        {/* Enhanced Hero section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-green-50 to-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-left space-y-6">
                <div className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium">
                  AI-Powered Cooking Assistant
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                  Transform Your <span className="text-green-600">Kitchen</span>{" "}
                  Experience
                </h2>
                <h3 className="text-xl md:text-2xl font-medium text-gray-600">
                  Your smart kitchen companion for personalized recipes based on
                  what you have
                </h3>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link to="/signup">
                    <Button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-lg px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all w-full sm:w-auto">
                      Start Cooking Now
                    </Button>
                  </Link>
                  <Link to="/video-demo">
                    <Button
                      variant="outline"
                      className="border-green-200 text-green-700 hover:bg-green-50 rounded-lg px-8 py-6 text-lg font-medium flex items-center justify-center gap-2 w-full sm:w-auto"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polygon points="10 8 16 12 10 16 10 8" />
                      </svg>
                      Watch Demo
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <div className="flex -space-x-2">
                    {["Alice", "Bob", "Charlie", "David"].map((name, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                      >
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
                          alt={name}
                          className="w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-green-700">10,000+</span>{" "}
                    happy customer using ChefAI
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-100 rounded-full filter blur-3xl opacity-50"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-100 rounded-full filter blur-3xl opacity-50"></div>

                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                  <div className="absolute top-3 left-3 flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>

                  <div className="pt-10 pb-6 px-6">
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl mb-4">
                      <div className="font-medium text-gray-800 mb-2">
                        What's in your kitchen?
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-gray-200 text-sm text-gray-600">
                        chicken, spinach, garlic, olive oil, lemon...
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-xs font-medium text-gray-500 mb-1">
                          Dietary Preference
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-2 text-sm flex justify-between items-center">
                          <span>Low-carb</span>
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
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500 mb-1">
                          Nutritional Goal
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-2 text-sm flex justify-between items-center">
                          <span>High protein</span>
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
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-lg py-2 font-medium">
                      Generate Recipe
                    </Button>
                  </div>

                  <div className="bg-gradient-to-r from-green-600 to-green-500 p-4 text-white text-center">
                    <div className="font-medium">
                      Lemon Garlic Chicken with Spinach
                    </div>
                    <div className="text-xs text-green-100 mt-1">
                      Ready in 25 minutes • 350 calories • High protein
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-20 bg-[#f5f5f7] text-center">
          <h2 className="text-4xl font-semibold tracking-tight mb-1">
            Smart Recipe Generation
          </h2>
          <h3 className="text-xl font-medium text-gray-500 mb-8">
            Personalized to your preferences and dietary needs
          </h3>

          <div className="mt-8 max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-left">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-medium mb-2">
                Ingredient-Based Recipes
              </h4>
              <p className="text-gray-500">
                Enter the ingredients you have on hand, and our AI will generate
                recipes that make the most of what's available.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-left">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-medium mb-2">Dietary Preferences</h4>
              <p className="text-gray-500">
                Customize recipes based on dietary needs like vegan, keto,
                gluten-free, and more with our smart filtering system.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-left">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-medium mb-2">Nutritional Goals</h4>
              <p className="text-gray-500">
                Set specific nutritional targets and let our AI create recipes
                that help you meet your health and fitness goals.
              </p>
            </div>
          </div>
        </section>

        {/* Recipe Generator Demo */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 text-left shadow-lg">
            <h2 className="text-3xl font-semibold tracking-tight mb-2">
              Input Your Ingredients
            </h2>
            <h3 className="text-lg font-medium text-gray-500 mb-6">
              Tell us what you have in your kitchen
            </h3>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="space-y-4">
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
                        <SelectItem value="high-protein">
                          High protein
                        </SelectItem>
                        <SelectItem value="low-calorie">Low calorie</SelectItem>
                        <SelectItem value="low-fat">Low fat</SelectItem>
                        <SelectItem value="high-fiber">High fiber</SelectItem>
                        <SelectItem value="balanced">Balanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Button
                    className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-md hover:shadow-lg transition-all"
                    onClick={handleGenerateRecipe}
                    disabled={isGenerating || !ingredients.trim()}
                  >
                    {isGenerating ? "Generating..." : "Generate Recipe"}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 text-left shadow-lg">
            <h2 className="text-3xl font-semibold tracking-tight mb-2">
              Your Recipe
            </h2>
            <h3 className="text-lg font-medium text-gray-500 mb-6">
              Personalized just for you
            </h3>

            <div className="bg-white p-6 rounded-xl shadow-md">
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
                    Enter your ingredients and preferences, then click "Generate
                    Recipe" to see your personalized recipe here.
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

                  <div>
                    <h5 className="font-medium text-gray-700 mb-1">
                      Ingredients:
                    </h5>
                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                      {generatedRecipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-700 mb-1">
                      Instructions:
                    </h5>
                    <ol className="list-decimal pl-5 text-sm text-gray-600 space-y-1">
                      {generatedRecipe.instructions.map(
                        (instruction, index) => (
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
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

     
      {/* <CareersPage /> */}
      <RecipeCardsGrid />
      <WeeklyMealPlannerPreview />
      

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-b from-white to-green-50 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-2 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
                    <line x1="6" x2="18" y1="17" y2="17" />
                  </svg>
                </div>
                <span className="font-bold text-2xl bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
                  CheafAI
                </span>
              </div>
              <p className="text-gray-600 mb-6 max-w-md">
                Transform your kitchen experience with AI-powered recipe
                generation based on ingredients you already have.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-5">Product</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    Examples
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    Demo
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-5">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    Recipe Database
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    Nutrition Guide
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    Cooking Tips
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-5">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 mb-4 md:mb-0">
              © 2025 CheafAI. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                to="/"
                className="text-gray-600 hover:text-green-600 transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                to="/"
                className="text-gray-600 hover:text-green-600 transition-colors text-sm"
              >
                Terms of Service
              </Link>
              <Link
                to="/"
                className="text-gray-600 hover:text-green-600 transition-colors text-sm"
              >
                Cookie Settings
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
