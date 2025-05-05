import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Printer, Clock, Star, ChevronRight } from "lucide-react";
import SaveRecipeButton from "./SaveRecipeButton";
import { Link } from "react-router-dom";

interface RecipeCardProps {
  id?: string | number;
  title?: string;
  cookingTime?: string;
  calories?: number;
  dietType?: string;
  image?: string;
  description?: string;
  rating?: number;
  difficulty?: string;
}

export default function RecipeCard({
  id = "1",
  title = "Lemon Garlic Chicken with Spinach",
  cookingTime = "25 mins",
  calories = 350,
  dietType = "High protein",
  image = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80",
  description = "A delicious and healthy chicken dish with fresh spinach and zesty lemon flavors.",
  rating = 4.8,
  difficulty = "Easy",
}: RecipeCardProps) {
  // Ensure image URL has proper parameters for quality and size
  const optimizedImage = image.includes("?") ? image : `${image}?w=600&q=80`;

  return (
    <Card className="overflow-hidden h-full flex flex-col bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl border-0">
      <div className="relative h-48 overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 to-transparent z-10"></div>
        <img
          src={optimizedImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            // Fallback image if the original fails to load
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80";
          }}
        />
        <div className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
          <Star className="h-3 w-3 text-yellow-500 mr-1 fill-yellow-500" />
          <span className="text-xs font-medium">{rating}</span>
        </div>
        <div className="absolute top-3 left-3 z-20">
          <Badge className="bg-green-600 hover:bg-green-700 text-white border-0">
            {dietType}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-xl font-bold text-gray-800 hover:text-green-700 transition-colors">
          {title}
        </CardTitle>
        <div className="flex flex-wrap gap-2 mt-1">
          <div className="flex items-center text-gray-500 text-xs">
            <Clock className="h-3 w-3 mr-1" />
            {cookingTime}
          </div>
          <div className="flex items-center text-gray-500 text-xs">
            <span className="h-1 w-1 bg-gray-300 rounded-full mx-1"></span>
            {calories} calories
          </div>
          <div className="flex items-center text-gray-500 text-xs">
            <span className="h-1 w-1 bg-gray-300 rounded-full mx-1"></span>
            {difficulty}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-gray-600 text-sm">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-3 border-t border-gray-100">
        <SaveRecipeButton
          recipeId={id?.toString() || ""}
          title={title}
          cookingTime={cookingTime}
          calories={calories}
          dietType={dietType}
          image={image}
          description={description}
          rating={rating}
          difficulty={difficulty}
          variant="outline"
          size="sm"
          className="text-xs rounded-full border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800 hover:border-green-300"
        />
        <Button
          variant="outline"
          size="sm"
          className="text-xs flex items-center gap-1 rounded-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300"
        >
          <Calendar className="h-3 w-3" /> Add to Plan
        </Button>
        <Link to={`/recipe/${id}`} className="w-full mt-3">
          <Button className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 flex items-center justify-center gap-1">
            View Recipe <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
