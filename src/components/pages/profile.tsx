import React, { useState } from "react";
import Layout from "../layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "../../../supabase/auth";
import { Link } from "react-router-dom";
import { Settings, BookOpen, Calendar, Heart, Clock } from "lucide-react";
import RecipeCard from "../recipe/RecipeCard";

const UserProfile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("saved");

  // Mock data for saved recipes
  const savedRecipes = [
    {
      id: "1",
      title: "Lemon Garlic Chicken with Spinach",
      cookingTime: "25 mins",
      calories: 350,
      dietType: "High-protein",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80",
      description:
        "A simple yet flavorful dish with tender chicken, fresh spinach, and a zesty lemon garlic sauce.",
      rating: 4.8,
      difficulty: "Easy",
    },
    {
      id: "2",
      title: "Vegan Buddha Bowl with Tahini Dressing",
      cookingTime: "20 mins",
      calories: 280,
      dietType: "Vegan",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
      description:
        "Nutrient-packed bowl with roasted vegetables, quinoa, and creamy tahini dressing.",
      rating: 4.6,
      difficulty: "Easy",
    },
    {
      id: "3",
      title: "Keto Salmon with Avocado Salsa",
      cookingTime: "30 mins",
      calories: 420,
      dietType: "Keto",
      image:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80",
      description:
        "Perfectly cooked salmon topped with a refreshing avocado salsa. Keto-friendly and delicious.",
      rating: 4.9,
      difficulty: "Medium",
    },
  ];

  // Mock data for cooking history
  const cookingHistory = [
    {
      id: "4",
      title: "Mediterranean Quinoa Salad",
      cookingTime: "15 mins",
      calories: 300,
      dietType: "Mediterranean",
      image:
        "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=600&q=80",
      description:
        "Fresh and vibrant salad with Mediterranean flavors, perfect for a light lunch or side dish.",
      rating: 4.5,
      difficulty: "Easy",
      cookedOn: "2023-05-01",
    },
    {
      id: "5",
      title: "Spicy Black Bean Tacos",
      cookingTime: "35 mins",
      calories: 380,
      dietType: "Vegetarian",
      image:
        "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80",
      description:
        "Quick and easy vegetarian tacos with spicy black beans and all your favorite toppings.",
      rating: 4.7,
      difficulty: "Easy",
      cookedOn: "2023-04-28",
    },
  ];

  // Mock data for user stats
  const userStats = {
    recipesCooked: 0,
    favoriteRecipes: 0,
    mealPlans: 0,
    streak: 0,
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        {/* Profile header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${
                  user?.email || "Chef"
                }`}
              />
              <AvatarFallback>{user?.email?.[0].toUpperCase()}</AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold">
                {user?.email?.split("@")[0] || "Chef"}
              </h1>
              <p className="text-gray-500">{user?.email}</p>

              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
                <div className="text-center px-4 py-2 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    {userStats.recipesCooked}
                  </p>
                  <p className="text-xs text-gray-500">Recipes Cooked</p>
                </div>
                <div className="text-center px-4 py-2 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">
                    {userStats.favoriteRecipes}
                  </p>
                  <p className="text-xs text-gray-500">Favorites</p>
                </div>
                <div className="text-center px-4 py-2 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">
                    {userStats.mealPlans}
                  </p>
                  <p className="text-xs text-gray-500">Meal Plans</p>
                </div>
                <div className="text-center px-4 py-2 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">
                    {userStats.streak}
                  </p>
                  <p className="text-xs text-gray-500">Day Streak</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Link to="/settings">
                <Button variant="outline" className="flex items-center gap-2">
                  <Settings size={16} />
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs for different sections */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="mb-4 flex flex-wrap justify-start gap-2 sm:justify-center md:gap-4">
            <TabsTrigger
              value="saved"
              className="flex items-center gap-2 px-3 py-2 text-sm sm:text-base rounded-md hover:bg-gray-100 transition"
            >
              <Heart size={16} />
              Saved Recipes
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="flex items-center gap-2 px-3 py-2 text-sm sm:text-base rounded-md hover:bg-gray-100 transition"
            >
              <Clock size={16} />
              Cooking History
            </TabsTrigger>
            <TabsTrigger
              value="mealplans"
              className="flex items-center gap-2 px-3 py-2 text-sm sm:text-base rounded-md hover:bg-gray-100 transition"
            >
              <Calendar size={16} />
              Meal Plans
            </TabsTrigger>
            <TabsTrigger
              value="cookbook"
              className="flex items-center gap-2 px-3 py-2 text-sm sm:text-base rounded-md hover:bg-gray-100 transition"
            >
              <BookOpen size={16} />
              My Cookbook
            </TabsTrigger>
          </TabsList>

          <TabsContent value="saved" className="space-y-6">
            <h2 className="text-2xl font-semibold pt-8 ">Saved Recipes</h2>
            {savedRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    id={recipe.id}
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
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  No saved recipes yet
                </h3>
                <p className="text-gray-500 mb-4">
                  Start saving recipes you love to cook them later
                </p>
                <Link to="/recipes">
                  <Button>Browse Recipes</Button>
                </Link>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <h2 className="text-2xl font-semibold pt-8">Cooking History</h2>
            {cookingHistory.length > 0 ? (
              <div className="space-y-4">
                {cookingHistory.map((recipe) => (
                  <Card key={recipe.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-48 h-48 md:h-auto">
                          <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4 flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold">
                                {recipe.title}
                              </h3>
                              <p className="text-sm text-gray-500">
                                Cooked on{" "}
                                {new Date(recipe.cookedOn).toLocaleDateString()}
                              </p>
                            </div>
                            <Link to={`/recipe/${recipe.id}`}>
                              <Button variant="outline" size="sm">
                                View Recipe
                              </Button>
                            </Link>
                          </div>
                          <div className="flex gap-3 mt-3">
                            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                              {recipe.cookingTime}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                              {recipe.calories} cal
                            </span>
                            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                              {recipe.dietType}
                            </span>
                          </div>
                          <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                            {recipe.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <Clock size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  No cooking history yet
                </h3>
                <p className="text-gray-500 mb-4">
                  Your cooking adventures will appear here
                </p>
                <Link to="/recipes">
                  <Button>Start Cooking</Button>
                </Link>
              </div>
            )}
          </TabsContent>

          <TabsContent value="mealplans" className="space-y-6">
            <h2 className="text-2xl font-semibold pt-8">Meal Plans</h2>
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No meal plans yet
              </h3>
              <p className="text-gray-500 mb-4">
                Create your first meal plan to organize your cooking schedule
              </p>
              <Link to="/meal-plans">
                <Button>Create Meal Plan</Button>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="cookbook" className="space-y-6">
            <h2 className="text-2xl font-semibold pt-8">My Cookbook</h2>
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                Your cookbook is empty
              </h3>
              <p className="text-gray-500 mb-4">
                Create your own recipes and add them to your personal cookbook
              </p>
              <Button>Create Recipe</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default UserProfile;
