import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "../../../supabase/auth";
import RecipeCard from "@/components/recipe/RecipeCard";
import SearchRecipes from "../searchRecipes/SearchRecipes";

export default function RecipesPage() {
  const { user } = useAuth();

  // Sample recipe data
  const recipeData = [
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
    },
    {
      id: "6",
      title: "Creamy Mushroom Risotto",
      cookingTime: "40 mins",
      calories: 450,
      dietType: "Vegetarian",
      image:
        "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80",
      description:
        "Indulgent and creamy risotto with savory mushrooms and parmesan cheese.",
      rating: 4.8,
      difficulty: "Medium",
    },
    {
      id: "7",
      title: "Thai Green Curry with Vegetables",
      cookingTime: "45 mins",
      calories: 320,
      dietType: "Dairy-free",
      image:
        "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&q=80",
      description:
        "Aromatic Thai curry with colorful vegetables in a coconut milk base.",
      rating: 4.7,
      difficulty: "Medium",
    },
    {
      id: "8",
      title: "Classic Beef Stew with Root Vegetables",
      cookingTime: "50 mins",
      calories: 400,
      dietType: "High-protein",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
      description:
        "Hearty and comforting beef stew with tender vegetables and rich gravy.",
      rating: 4.9,
      difficulty: "Medium",
    },
    {
      id: "9",
      title: "Breakfast Smoothie Bowl with Berries",
      cookingTime: "10 mins",
      calories: 250,
      dietType: "Gluten-free",
      image:
        "https://images.unsplash.com/photo-1494597564530-871f2b93ac55?w=600&q=80",
      description:
        "Nutritious breakfast bowl with blended fruits and crunchy toppings.",
      rating: 4.6,
      difficulty: "Easy",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header is included in the App layout */}

      <SearchRecipes />

      <main className="pt-14 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Recipe Collection
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our curated collection of AI-generated recipes tailored to
              various dietary preferences and nutritional goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipeData.map((recipe) => (
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

          <div className="mt-12 text-center">
            <Link to="/recipe-generator">
              <Button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-lg px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all">
                Generate Your Own Recipe
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
