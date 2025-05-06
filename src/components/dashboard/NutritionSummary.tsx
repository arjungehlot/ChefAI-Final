import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface NutritionSummaryProps {
  calories?: {
    consumed: number;
    goal: number;
  };
  macros?: {
    protein: number;
    carbs: number;
    fats: number;
  };
  goals?: {
    achieved: number;
    total: number;
  };
}

const NutritionSummary = ({
  calories = { consumed: 1450, goal: 2000 },
  macros = { protein: 35, carbs: 40, fats: 25 },
  goals = { achieved: 3, total: 5 },
}: NutritionSummaryProps) => {
  const caloriePercentage = Math.min(
    Math.round((calories.consumed / calories.goal) * 100),
    100,
  );
  const goalPercentage = Math.round((goals.achieved / goals.total) * 100);

  return (
    <Card className="bg-white/90 backdrop-blur-sm border md:mx-52 mt-8 border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium text-gray-900">
          Nutrition Summary
        </CardTitle>
        <div className="text-xs font-medium text-gray-500">Today</div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Calories */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-700">Calories</span>
            <span className="text-gray-600">
              {calories.consumed} / {calories.goal} kcal
            </span>
          </div>
          <div className="relative pt-1">
            <Progress
              value={caloriePercentage}
              className="h-2 bg-gray-100 rounded-full"
              style={
                {
                  backgroundColor: "rgb(243, 244, 246)",
                } as React.CSSProperties
              }
            />
          </div>
        </div>

        {/* Macros */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-700">Macros</span>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 bg-blue-50 rounded-lg p-2 text-center">
              <div className="text-xs text-blue-600 font-medium">Protein</div>
              <div className="text-sm font-semibold text-blue-700">
                {macros.protein}%
              </div>
            </div>
            <div className="flex-1 bg-green-50 rounded-lg p-2 text-center">
              <div className="text-xs text-green-600 font-medium">Carbs</div>
              <div className="text-sm font-semibold text-green-700">
                {macros.carbs}%
              </div>
            </div>
            <div className="flex-1 bg-orange-50 rounded-lg p-2 text-center">
              <div className="text-xs text-orange-600 font-medium">Fats</div>
              <div className="text-sm font-semibold text-orange-700">
                {macros.fats}%
              </div>
            </div>
          </div>
        </div>

        {/* Goals */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-700">Goals Progress</span>
            <span className="text-gray-600">
              {goals.achieved}/{goals.total} completed
            </span>
          </div>
          <div className="relative pt-1">
            <Progress
              value={goalPercentage}
              className="h-2 bg-gray-100 rounded-full"
              style={
                {
                  backgroundColor: "rgb(243, 244, 246)",
                } as React.CSSProperties
              }
            />
          </div>
        </div>

        {/* Insights */}
        <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-700">
          <p className="font-medium">Today's Insight:</p>
          <p className="text-xs mt-1">
            You're on track with your protein goals. Consider adding more fiber
            to your next meal.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionSummary;
