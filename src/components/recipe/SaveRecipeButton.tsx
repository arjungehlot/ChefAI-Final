import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, Check, Loader2 } from "lucide-react";
import { saveRecipe, removeSavedRecipe } from "@/services/profile-service";
import { useToast } from "@/components/ui/use-toast";

interface SaveRecipeButtonProps {
  recipeId: string;
  title: string;
  cookingTime?: string;
  calories?: number;
  dietType?: string;
  image?: string;
  description?: string;
  rating?: number;
  difficulty?: string;
  isSaved?: boolean;
  onSaveChange?: (saved: boolean) => void;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const SaveRecipeButton = ({
  recipeId,
  title,
  cookingTime = "",
  calories = 0,
  dietType = "",
  image = "",
  description = "",
  rating = 0,
  difficulty = "",
  isSaved = false,
  onSaveChange,
  variant = "outline",
  size = "sm",
  className = "",
}: SaveRecipeButtonProps) => {
  const [saved, setSaved] = useState(isSaved);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSaveRecipe = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);
    try {
      if (saved) {
        // Remove from saved recipes
        const success = await removeSavedRecipe(recipeId);
        if (success) {
          setSaved(false);
          onSaveChange?.(false);
          toast({
            title: "Recipe removed",
            description: "Recipe has been removed from your saved recipes",
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to remove recipe from saved recipes",
            variant: "destructive",
          });
        }
      } else {
        // Add to saved recipes
        const success = await saveRecipe({
          recipe_id: recipeId,
          title,
          cooking_time: cookingTime,
          calories,
          diet_type: dietType,
          image,
          description,
          rating,
          difficulty,
        });
        if (success) {
          setSaved(true);
          onSaveChange?.(true);
          toast({
            title: "Recipe saved",
            description: "Recipe has been added to your saved recipes",
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to save recipe",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Error saving/removing recipe:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={`flex items-center gap-1 ${saved ? "bg-green-50 text-green-700 border-green-300" : ""} ${className}`}
      onClick={handleSaveRecipe}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : saved ? (
        <Check className="h-3 w-3" />
      ) : (
        <Save className="h-3 w-3" />
      )}
      {saved ? "Saved" : "Save"}
    </Button>
  );
};

export default SaveRecipeButton;
