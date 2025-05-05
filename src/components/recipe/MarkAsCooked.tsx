import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChefHat, Loader2 } from "lucide-react";
import { addToCookingHistory } from "@/services/profile-service";
import { useToast } from "@/components/ui/use-toast";

interface MarkAsCookedProps {
  recipeId: string;
  title: string;
  cookingTime?: string;
  calories?: number;
  dietType?: string;
  image?: string;
  description?: string;
  rating?: number;
  difficulty?: string;
  onCooked?: () => void;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const MarkAsCooked = ({
  recipeId,
  title,
  cookingTime = "",
  calories = 0,
  dietType = "",
  image = "",
  description = "",
  rating = 0,
  difficulty = "",
  onCooked,
  variant = "default",
  size = "default",
  className = "",
}: MarkAsCookedProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleMarkAsCooked = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);
    try {
      const success = await addToCookingHistory({
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
        toast({
          title: "Recipe marked as cooked",
          description: "This recipe has been added to your cooking history",
        });
        onCooked?.();
      } else {
        toast({
          title: "Error",
          description: "Failed to mark recipe as cooked",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error marking recipe as cooked:", error);
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
      className={`flex items-center gap-2 ${className}`}
      onClick={handleMarkAsCooked}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <ChefHat className="h-4 w-4" />
      )}
      Mark as Cooked
    </Button>
  );
};

export default MarkAsCooked;
