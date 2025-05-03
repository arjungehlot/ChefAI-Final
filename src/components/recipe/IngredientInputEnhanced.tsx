import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Loader2, Send, Wand2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import VoiceInput from "./VoiceInput";

interface IngredientInputEnhancedProps {
  onGenerateRecipe: (ingredients: string, dietaryPreference: string) => void;
  isLoading?: boolean;
}

const IngredientInputEnhanced = ({
  onGenerateRecipe,
  isLoading = false,
}: IngredientInputEnhancedProps) => {
  const [ingredients, setIngredients] = useState("");
  const [dietaryPreference, setDietaryPreference] = useState("No restrictions");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageAnalysisResult, setImageAnalysisResult] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;

    setUploadingImage(true);
    try {
      // In a real app, you would send this to your backend for analysis
      // For now, we'll simulate the analysis with a timeout
      setTimeout(() => {
        // Simulate detected ingredients based on common food items
        const detectedIngredients = [
          "tomatoes",
          "onions",
          "bell peppers",
          "chicken breast",
          "olive oil",
          "garlic",
        ];

        const result = detectedIngredients.join(", ");
        setImageAnalysisResult(result);
        setIngredients((prev) => (prev ? `${prev}, ${result}` : result));
        setUploadingImage(false);
      }, 2000);
    } catch (error) {
      console.error("Error analyzing image:", error);
      setUploadingImage(false);
    }
  };

  const handleVoiceTranscript = (transcript: string) => {
    setIngredients((prev) => (prev ? `${prev}, ${transcript}` : transcript));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ingredients.trim()) {
      onGenerateRecipe(ingredients, dietaryPreference);
    }
  };

  return (
    <Card className="bg-white shadow-lg border-0 rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-green-600 to-green-500 text-white">
        <CardTitle className="text-xl font-bold flex items-center">
          <Wand2 className="mr-2 h-5 w-5" />
          What's in Your Kitchen?
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Upload a photo of your ingredients
            </label>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center gap-3">
                <label className="flex-1">
                  <div className="relative flex h-10 w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors">
                    <Camera className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-500">Choose image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleImageChange}
                    />
                  </div>
                </label>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleImageUpload}
                  disabled={!imageFile || uploadingImage}
                  className="h-10"
                >
                  {uploadingImage ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Image"
                  )}
                </Button>
              </div>

              {imagePreview && (
                <div className="relative mt-2 rounded-md overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Ingredient preview"
                    className="w-full h-40 object-cover rounded-md"
                  />
                  {uploadingImage && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-white text-sm font-medium">
                        Analyzing image...
                      </div>
                    </div>
                  )}
                </div>
              )}

              {imageAnalysisResult && (
                <div className="p-3 bg-green-50 border border-green-100 rounded-md">
                  <p className="text-sm font-medium text-green-800">
                    Detected ingredients:
                  </p>
                  <p className="text-sm text-green-700">
                    {imageAnalysisResult}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Or use voice input
            </label>
            <VoiceInput onTranscript={handleVoiceTranscript} />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="ingredients"
              className="text-sm font-medium text-gray-700"
            >
              Enter ingredients you have
            </label>
            <Textarea
              id="ingredients"
              placeholder="e.g., chicken, spinach, garlic, olive oil..."
              className="min-h-[100px] bg-gray-50 border-gray-200 resize-none"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="dietary-preference"
              className="text-sm font-medium text-gray-700"
            >
              Dietary preference
            </label>
            <Select
              value={dietaryPreference}
              onValueChange={setDietaryPreference}
            >
              <SelectTrigger className="w-full bg-gray-50 border-gray-200">
                <SelectValue placeholder="Select dietary preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="No restrictions">No restrictions</SelectItem>
                <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                <SelectItem value="Vegan">Vegan</SelectItem>
                <SelectItem value="Gluten-free">Gluten-free</SelectItem>
                <SelectItem value="Keto">Keto</SelectItem>
                <SelectItem value="Paleo">Paleo</SelectItem>
                <SelectItem value="Low-carb">Low-carb</SelectItem>
                <SelectItem value="Dairy-free">Dairy-free</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-medium py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
            disabled={!ingredients.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Recipe...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Recipe
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default IngredientInputEnhanced;
