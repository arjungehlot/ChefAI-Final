import { useState } from "react";
import RecipeCard from "../recipe/RecipeCard";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const RECIPE_CATEGORIES = [
  {
    id: "trending",
    name: "Trending Recipes",
    recipes: [
      {
        title: "Panir with Matar , Spinach",
        cookingTime: "25 mins",
        calories: 350,
        dietType: "High protein",
        image:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80",
        description:
          "A delicious and healthy chicken dish with fresh spinach and zesty lemon flavors.",
        rating: 4.8,
        difficulty: "Easy",
      },
      {
        title: "Mediterranean Quinoa Bowl",
        cookingTime: "20 mins",
        calories: 320,
        dietType: "Vegetarian",
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
        description:
          "Protein-packed quinoa with roasted vegetables, feta cheese, and a tangy lemon dressing.",
        rating: 4.6,
        difficulty: "Easy",
      },
      {
        title: "Spicy Thai Coconut Soup",
        cookingTime: "35 mins",
        calories: 280,
        dietType: "Dairy-free",
        image:
          "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
        description:
          "A fragrant and spicy Thai soup with coconut milk, lemongrass, and fresh vegetables.",
        rating: 4.7,
        difficulty: "Medium",
      },
      {
        title: "Avocado & Egg Breakfast Toast",
        cookingTime: "10 mins",
        calories: 290,
        dietType: "High fiber",
        image:
          "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80",
        description:
          "Creamy avocado spread on whole grain toast topped with perfectly poached eggs.",
        rating: 4.5,
        difficulty: "Easy",
      },
      {
        title: "Teriyaki Salmon Bowl",
        cookingTime: "30 mins",
        calories: 420,
        dietType: "Omega-3 rich",
        image:
          "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80",
        description:
          "Glazed teriyaki salmon served over brown rice with steamed vegetables.",
        rating: 4.9,
        difficulty: "Medium",
      },
      {
        title: "Mushroom Risotto",
        cookingTime: "45 mins",
        calories: 380,
        dietType: "Vegetarian",
        image:
          "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80",
        description:
          "Creamy arborio rice slowly cooked with mushrooms, white wine, and parmesan.",
        rating: 4.7,
        difficulty: "Medium",
      },
    ],
  },
  {
    id: "recommended",
    name: "Recommended for You",
    recipes: [
      {
        title: "Keto Cauliflower Mac & Cheese",
        cookingTime: "25 mins",
        calories: 310,
        dietType: "Keto",
        image:
          "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=600&q=80",
        description:
          "Low-carb comfort food with cauliflower florets in a rich, cheesy sauce.",
        rating: 4.6,
        difficulty: "Easy",
      },
      {
        title: "Vegan Buddha Bowl",
        cookingTime: "20 mins",
        calories: 340,
        dietType: "Vegan",
        image:
          "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80",
        description:
          "Colorful bowl packed with quinoa, roasted sweet potatoes, chickpeas, and tahini dressing.",
        rating: 4.8,
        difficulty: "Easy",
      },
      {
        title: "Grilled Steak with Chimichurri",
        cookingTime: "35 mins",
        calories: 450,
        dietType: "High protein",
        image:
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
        description:
          "Perfectly grilled steak topped with fresh, herby chimichurri sauce.",
        rating: 4.9,
        difficulty: "Medium",
      },
      {
        title: "Lentil & Vegetable Soup",
        cookingTime: "40 mins",
        calories: 260,
        dietType: "High fiber",
        image:
          "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80",
        description:
          "Hearty and nutritious soup packed with lentils and seasonal vegetables.",
        rating: 4.5,
        difficulty: "Easy",
      },
      {
        title: "Pesto Zucchini Noodles",
        cookingTime: "15 mins",
        calories: 220,
        dietType: "Low-carb",
        image:
          "https://images.unsplash.com/photo-1556761223-4c4282c73f77?w=600&q=80",
        description:
          "Light and fresh zucchini noodles tossed with homemade basil pesto.",
        rating: 4.7,
        difficulty: "Easy",
      },
      {
        title: "Berry Protein Smoothie Bowl",
        cookingTime: "10 mins",
        calories: 290,
        dietType: "High protein",
        image:
          "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&q=80",
        description:
          "Thick and creamy smoothie bowl topped with fresh berries, granola, and chia seeds.",
        rating: 4.6,
        difficulty: "Easy",
      },
    ],
  },
  {
    id: "quick",
    name: "15-Minute Meals",
    recipes: [
      {
        title: "Quick Tuna Salad Wrap",
        cookingTime: "10 mins",
        calories: 320,
        dietType: "High protein",
        image:
          "https://images.unsplash.com/photo-1533040064879-542a1628a0cd?w=600&q=80",
        description:
          "Protein-packed tuna salad with crunchy vegetables in a whole grain wrap.",
        rating: 4.4,
        difficulty: "Easy",
      },
      {
        title: "Microwave Egg & Veggie Mug",
        cookingTime: "5 mins",
        calories: 180,
        dietType: "Low calorie",
        image:
          "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&q=80",
        description:
          "Quick and easy breakfast made in a mug with eggs, spinach, and cheese.",
        rating: 4.3,
        difficulty: "Easy",
      },
      {
        title: "Avocado & Egg Breakfast Toast",
        cookingTime: "10 mins",
        calories: 290,
        dietType: "High fiber",
        image:
          "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80",
        description:
          "Creamy avocado spread on whole grain toast topped with perfectly poached eggs.",
        rating: 4.5,
        difficulty: "Easy",
      },
      {
        title: "Caprese Sandwich",
        cookingTime: "8 mins",
        calories: 310,
        dietType: "Vegetarian",
        image:
          "https://images.unsplash.com/photo-1550507992-eb63ffee0847?w=600&q=80",
        description:
          "Classic Italian sandwich with fresh mozzarella, tomatoes, basil, and balsamic glaze.",
        rating: 4.6,
        difficulty: "Easy",
      },
      {
        title: "Greek Yogurt Parfait",
        cookingTime: "5 mins",
        calories: 240,
        dietType: "High protein",
        image:
          "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80",
        description:
          "Layers of Greek yogurt, fresh berries, honey, and crunchy granola.",
        rating: 4.7,
        difficulty: "Easy",
      },
      {
        title: "Pesto Zucchini Noodles",
        cookingTime: "15 mins",
        calories: 220,
        dietType: "Low-carb",
        image:
          "https://images.unsplash.com/photo-1556761223-4c4282c73f77?w=600&q=80",
        description:
          "Light and fresh zucchini noodles tossed with homemade basil pesto.",
        rating: 4.7,
        difficulty: "Easy",
      },
    ],
  },
];

export default function RecipeCardsGrid() {
  const [activeTab, setActiveTab] = useState("trending");

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Discover Delicious Recipes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our collection of chef-crafted and AI-generated recipes
            tailored to your preferences
          </p>
        </div>

        <Tabs defaultValue="trending" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-green-50">
              {RECIPE_CATEGORIES.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white px-6 py-2"
                  onClick={() => setActiveTab(category.id)}
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {RECIPE_CATEGORIES.map((category) => (
            <TabsContent
              key={category.id}
              value={category.id}
              className="w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.recipes.map((recipe, index) => (
                  <div
                    key={index}
                    className="transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                  >
                    <RecipeCard {...recipe} />
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12 text-center">
          <Button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-lg px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all">
            Explore All Recipes
          </Button>
        </div>
      </div>
    </section>
  );
}
