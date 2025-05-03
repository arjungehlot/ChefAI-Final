import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Wand2 } from "lucide-react";

const QuickRecipeGenerator = () => {
  const [ingredients, setIngredients] = useState("");
  const [mealType, setMealType] = useState("any");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateRecipe = () => {
    if (!ingredients.trim()) return;

    setIsGenerating(true);

    // Simulate API call with timeout
    setTimeout(() => {
      setIsGenerating(false);
      // In a real app, you would navigate to the recipe result or show it in a modal
    }, 1500);
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium text-gray-900">
          Quick Recipe Generator
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center">
          <Wand2 className="h-4 w-4 text-green-500" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Textarea
            placeholder="Enter ingredients you have (e.g., chicken, spinach, garlic...)"
            className="resize-none h-20 bg-gray-50 rounded-lg border-gray-200 text-sm"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <Select value={mealType} onValueChange={setMealType}>
            <SelectTrigger className="flex-1 h-9 bg-gray-50 border-gray-200 text-sm">
              <SelectValue placeholder="Meal type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any meal</SelectItem>
              <SelectItem value="breakfast">Breakfast</SelectItem>
              <SelectItem value="lunch">Lunch</SelectItem>
              <SelectItem value="dinner">Dinner</SelectItem>
              <SelectItem value="snack">Snack</SelectItem>
              <SelectItem value="dessert">Dessert</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleGenerateRecipe}
            disabled={isGenerating || !ingredients.trim()}
            className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white flex-1"
          >
            {isGenerating ? "Generating..." : "Generate Recipe"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickRecipeGenerator;
