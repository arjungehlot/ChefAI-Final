import { supabase } from "../supabaseClient"; // Update the path if necessary

export interface Recipe {
  id?: string;
  title: string;
  cookingTime: string;
  calories: number;
  dietType: string;
  image?: string;
  description: string;
  rating?: number;
  difficulty?: string;
  ingredients: string[];
  instructions: string[];
  substitutions?: string;
  tips?: string;
}

// This function would call the OpenAI API to generate recipes
export async function generateRecipeWithOpenAI(
  ingredients: string,
  dietaryPreference?: string,
  nutritionalGoal?: string,
): Promise<Recipe[]> {
  try {
    // In a production app, you would call your backend API which would use the OpenAI API
    // For security reasons, we should never expose API keys in the frontend

    // This is a simulated API call
    const prompt = `Generate a recipe using these ingredients: ${ingredients}. 
    ${dietaryPreference ? `Dietary preference: ${dietaryPreference}.` : ""}
    ${nutritionalGoal ? `Nutritional goal: ${nutritionalGoal}.` : ""}
    Format the response as a JSON object with the following properties: 
    title, cookingTime, calories, dietType, description, difficulty, ingredients (array), instructions (array), substitutions, tips.`;

    // In a real implementation, you would make an API call to your backend
    // which would then call the OpenAI API with your secret key

    // For now, we'll return mock data
    const mockRecipes = generateMockRecipes(
      ingredients,
      dietaryPreference,
      nutritionalGoal,
    );
    return mockRecipes;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error("Failed to generate recipe");
  }
}

// This function analyzes an image to detect ingredients
export async function analyzeImageForIngredients(
  imageFile: File,
): Promise<string[]> {
  try {
    // In a real implementation, you would upload the image to your backend
    // which would then use an image recognition API or OpenAI's vision capabilities

    // For now, we'll return mock data
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API delay

    // Mock detected ingredients
    return [
      "tomatoes",
      "onions",
      "bell peppers",
      "chicken breast",
      "olive oil",
      "garlic",
    ];
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw new Error("Failed to analyze image");
  }
}

// This function generates mock recipes for demonstration purposes
function generateMockRecipes(
  ingredients: string,
  dietaryPreference?: string,
  nutritionalGoal?: string,
): Recipe[] {
  const ingredientsList = ingredients.split(",").map((item) => item.trim());

  // Sample images for recipes
  const recipeImages = [
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80",
    "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=600&q=80",
  ];

  return [
    {
      id: "generated-1",
      title: `${ingredientsList[0].charAt(0).toUpperCase() + ingredientsList[0].slice(1)} ${ingredientsList.length > 1 ? `and ${ingredientsList[1]}` : ""} Stir Fry`,
      cookingTime: "25 mins",
      calories: 350,
      dietType: dietaryPreference
        ? dietaryPreference.charAt(0).toUpperCase() + dietaryPreference.slice(1)
        : "Balanced",
      image: recipeImages[0],
      description: `A delicious stir fry using ${ingredients} with Asian-inspired flavors.`,
      rating: 4.7,
      difficulty: "Easy",
      ingredients: [
        ...ingredientsList,
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
        `Add ${ingredientsList[0]} and cook until tender.`,
        "Add garlic and ginger, stir for 30 seconds until fragrant.",
        "Add remaining ingredients and stir fry for 3-5 minutes.",
        "Mix soy sauce, sesame oil, and honey in a small bowl.",
        "Pour sauce over the stir fry and toss to coat.",
        "Serve hot over rice.",
      ],
      substitutions: `No ${ingredientsList[0]}? Try using bell peppers or zucchini instead. For a vegan option, replace honey with maple syrup.`,
      tips: "For extra flavor, add a dash of chili flakes or a splash of rice vinegar to the sauce.",
    },
    {
      id: "generated-2",
      title: `Roasted ${ingredientsList[0].charAt(0).toUpperCase() + ingredientsList[0].slice(1)} ${ingredientsList.length > 2 ? `with ${ingredientsList[2]}` : ""} Bowl`,
      cookingTime: "35 mins",
      calories: 420,
      dietType: nutritionalGoal
        ? nutritionalGoal.charAt(0).toUpperCase() + nutritionalGoal.slice(1)
        : "High-protein",
      image: recipeImages[1],
      description: `A nutritious bowl featuring roasted ${ingredients} with a zesty dressing.`,
      rating: 4.8,
      difficulty: "Medium",
      ingredients: [
        ...ingredientsList,
        "2 tbsp olive oil",
        "1 lemon, juiced",
        "Salt and pepper to taste",
        "1 tsp dried herbs (thyme, rosemary, or oregano)",
        "1/2 cup quinoa, cooked",
        "1 avocado, sliced",
      ],
      instructions: [
        "Preheat oven to 400°F (200°C).",
        `Toss ${ingredientsList.join(", ")} with olive oil, salt, pepper, and dried herbs.`,
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
