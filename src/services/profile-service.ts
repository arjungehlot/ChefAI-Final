import { supabase } from "../../supabase/supabase";

export interface UserProfile {
  id: string;
  recipes_cooked: number;
  favorite_recipes: number;
  meal_plans: number;
  day_streak: number;
  created_at: string;
  updated_at: string;
}

export interface SavedRecipe {
  id: string;
  user_id: string;
  recipe_id: string;
  title: string;
  cooking_time: string;
  calories: number;
  diet_type: string;
  image: string;
  description: string;
  rating: number;
  difficulty: string;
  created_at: string;
}

export interface CookingHistoryItem {
  id: string;
  user_id: string;
  recipe_id: string;
  title: string;
  cooking_time: string;
  calories: number;
  diet_type: string;
  image: string;
  description: string;
  rating: number;
  difficulty: string;
  cooked_on: string;
}

export const getUserProfile = async (): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .single();

    if (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    return null;
  }
};

export const getSavedRecipes = async (): Promise<SavedRecipe[]> => {
  try {
    const { data, error } = await supabase
      .from("saved_recipes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching saved recipes:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error in getSavedRecipes:", error);
    return [];
  }
};

export const getCookingHistory = async (): Promise<CookingHistoryItem[]> => {
  try {
    const { data, error } = await supabase
      .from("cooking_history")
      .select("*")
      .order("cooked_on", { ascending: false });

    if (error) {
      console.error("Error fetching cooking history:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error in getCookingHistory:", error);
    return [];
  }
};

export const saveRecipe = async (
  recipe: Omit<SavedRecipe, "id" | "user_id" | "created_at">,
): Promise<boolean> => {
  try {
    const { error } = await supabase.from("saved_recipes").insert([
      {
        ...recipe,
      },
    ]);

    if (error) {
      console.error("Error saving recipe:", error);
      return false;
    }

    // Update the favorite_recipes count in user_profile
    await updateUserProfileStats("favorite_recipes");

    return true;
  } catch (error) {
    console.error("Error in saveRecipe:", error);
    return false;
  }
};

export const removeSavedRecipe = async (recipeId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("saved_recipes")
      .delete()
      .eq("recipe_id", recipeId);

    if (error) {
      console.error("Error removing saved recipe:", error);
      return false;
    }

    // Update the favorite_recipes count in user_profile
    await updateUserProfileStats("favorite_recipes", -1);

    return true;
  } catch (error) {
    console.error("Error in removeSavedRecipe:", error);
    return false;
  }
};

export const addToCookingHistory = async (
  recipe: Omit<CookingHistoryItem, "id" | "user_id" | "cooked_on">,
): Promise<boolean> => {
  try {
    const { error } = await supabase.from("cooking_history").insert([
      {
        ...recipe,
      },
    ]);

    if (error) {
      console.error("Error adding to cooking history:", error);
      return false;
    }

    // Update the recipes_cooked count in user_profile
    await updateUserProfileStats("recipes_cooked");

    return true;
  } catch (error) {
    console.error("Error in addToCookingHistory:", error);
    return false;
  }
};

export const updateUserProfileStats = async (
  field: "recipes_cooked" | "favorite_recipes" | "meal_plans" | "day_streak",
  increment: number = 1,
): Promise<boolean> => {
  try {
    // First get the current profile
    const profile = await getUserProfile();

    if (!profile) {
      console.error("No user profile found");
      return false;
    }

    // Calculate the new value
    const newValue = Math.max(0, (profile[field] || 0) + increment);

    // Update the field
    const { error } = await supabase
      .from("user_profiles")
      .update({ [field]: newValue, updated_at: new Date().toISOString() })
      .eq("id", profile.id);

    if (error) {
      console.error(`Error updating ${field}:`, error);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Error in updateUserProfileStats for ${field}:`, error);
    return false;
  }
};
