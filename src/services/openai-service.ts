import { supabase } from "../supabase/supabase";

export interface RecipeResponse {
  title: string;
  cookingTime: string;
  calories: number;
  dietType: string;
  image: string;
  description: string;
  rating: number;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
  substitutions?: string;
  tips?: string;
}

export async function generateRecipeFromIngredients(
  ingredients: string,
  dietaryPreference?: string,
  nutritionalGoal?: string,
): Promise<RecipeResponse[]> {
  try {
    // In a production app, we would call a backend API endpoint that securely uses the OpenAI API key
    // This is a simulated API call for demonstration purposes

    // Create a prompt for the recipe generation
    const prompt = `Generate a recipe using these ingredients: ${ingredients}. ${dietaryPreference && dietaryPreference !== "none" ? `Make it ${dietaryPreference}.` : ""} ${nutritionalGoal && nutritionalGoal !== "balanced" ? `Optimize for ${nutritionalGoal}.` : ""}
    Format the response as a JSON object with the following properties: 
    title, cookingTime, calories, dietType, description, difficulty, ingredients (array), instructions (array), substitutions, tips.`;

    // For demo purposes, we'll return mock data based on the actual ingredients provided
    // In a real implementation, you would make an API call to your backend
    const mockRecipes = generateMockRecipes(
      ingredients,
      dietaryPreference,
      nutritionalGoal,
    );
    return mockRecipes;
  } catch (error) {
    console.error("Error generating recipe:", error);
    throw new Error("Failed to generate recipe");
  }
}

// This function generates mock recipes for demonstration purposes
function generateMockRecipes(
  ingredients: string,
  dietaryPreference?: string,
  nutritionalGoal?: string,
): RecipeResponse[] {
  const ingredientsList = ingredients.split(",").map((item) => item.trim());

  // Sample images for recipes
  const recipeImages = [
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80",
    "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=600&q=80",
  ];

  const dietPrefix =
    dietaryPreference && dietaryPreference !== "none"
      ? `${dietaryPreference} `
      : "";
  const nutritionPrefix =
    nutritionalGoal && nutritionalGoal !== "balanced"
      ? `${nutritionalGoal} `
      : "";

  // Filter recipes based on the actual ingredients provided
  // Only include ingredients that were actually provided by the user
  const filteredIngredients = ingredientsList.filter(
    (ingredient) => ingredient.trim() !== "",
  );

  if (filteredIngredients.length === 0) {
    return [];
  }

  return [
    {
      title: `${dietPrefix}${nutritionPrefix}${filteredIngredients[0].charAt(0).toUpperCase() + filteredIngredients[0].slice(1)} ${filteredIngredients.length > 1 ? `and ${filteredIngredients[1]}` : ""} Stir Fry`,
      cookingTime: "25 mins",
      calories: nutritionalGoal === "low-calorie" ? 250 : 350,
      dietType:
        dietaryPreference && dietaryPreference !== "none"
          ? dietaryPreference
          : nutritionalGoal && nutritionalGoal !== "balanced"
            ? nutritionalGoal
            : "Balanced",

      image: recipeImages[0],
      description: `A delicious stir fry using ${filteredIngredients.join(", ")} with Asian-inspired flavors.`,

      rating: 4.7,
      difficulty: "Easy",
      ingredients: [
        ...filteredIngredients,
        "2 tbsp soy sauce",
        "1 tbsp sesame oil",
        "1 tsp ginger, minced",
        "2 cloves garlic, minced",
        "1 tbsp honey",
        "Cooked rice for serving",
      ],
      instructions: [
        "Prepare all ingredients by washing and chopping as needed.",
        "Heat oil in a large wok or skillet over medium-high heat.",
        `Add ${filteredIngredients[0] || "vegetables"} and cook until tender.`,

        "Add garlic and ginger, stir for 30 seconds until fragrant.",
        "Add remaining ingredients and stir fry for 3-5 minutes.",
        "Mix soy sauce, sesame oil, and honey in a small bowl.",
        "Pour sauce over the stir fry and toss to coat.",
        "Serve hot over rice.",
      ],
      substitutions: `No ${filteredIngredients[0] || "main ingredient"}? Try using bell peppers or zucchini instead. For a vegan option, replace honey with maple syrup.`,

      tips: "For extra flavor, add a dash of chili flakes or a splash of rice vinegar to the sauce.",
    },
    {
      title: `${dietPrefix}${nutritionPrefix}Roasted ${filteredIngredients[0]?.charAt(0).toUpperCase() + (filteredIngredients[0]?.slice(1) || "Vegetable")} ${filteredIngredients.length > 2 ? `with ${filteredIngredients[2]}` : ""} Bowl`,
      cookingTime: "35 mins",
      calories: nutritionalGoal === "low-calorie" ? 320 : 420,
      dietType:
        dietaryPreference && dietaryPreference !== "none"
          ? dietaryPreference
          : nutritionalGoal && nutritionalGoal !== "balanced"
            ? nutritionalGoal
            : "High-protein",

      image: recipeImages[1],
      description: `A nutritious bowl featuring roasted ${filteredIngredients.join(", ")} with a zesty dressing.`,

      rating: 4.8,
      difficulty: "Medium",
      ingredients: [
        ...filteredIngredients,
        "2 tbsp olive oil",
        "1 lemon, juiced",
        "Salt and pepper to taste",
        "1 tsp dried herbs (thyme, rosemary, or oregano)",
        "1/2 cup quinoa, cooked",
        "1 avocado, sliced",
      ],
      instructions: [
        "Preheat oven to 400°F (200°C).",
        `Toss ${filteredIngredients.join(", ")} with olive oil, salt, pepper, and dried herbs.`,

        "Spread on a baking sheet and roast for 20-25 minutes until tender.",
        "Meanwhile, cook quinoa according to package instructions.",
        "Prepare dressing by mixing lemon juice, olive oil, salt, and pepper.",
        "Assemble bowls with quinoa as the base, topped with roasted vegetables.",
        "Add sliced avocado and drizzle with dressing.",
        "Serve warm or at room temperature.",
      ],
      substitutions: `Quinoa can be replaced with rice, couscous, or any grain of your choice. No avocado? Try using hummus or a soft-boiled egg instead.`,
      tips: "Meal prep tip: Roast extra vegetables and cook extra quinoa to use in meals throughout the week.",
    },
  ];
}
