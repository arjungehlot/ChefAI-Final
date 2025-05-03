import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Clock } from "lucide-react";

interface Meal {
  id: string;
  time: string;
  name: string;
  image: string;
}

interface TodayMealPlanProps {
  meals?: Meal[];
}

const defaultMeals: Meal[] = [
  {
    id: "1",
    time: "08:00",
    name: "Avocado Toast with Poached Eggs",
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=300&q=80",
  },
  {
    id: "2",
    time: "12:30",
    name: "Quinoa Salad with Grilled Chicken",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=80",
  },
  {
    id: "3",
    time: "16:00",
    name: "Greek Yogurt with Berries",
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&q=80",
  },
  {
    id: "4",
    time: "19:00",
    name: "Baked Salmon with Roasted Vegetables",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&q=80",
  },
];

const TodayMealPlan = ({ meals = defaultMeals }: TodayMealPlanProps) => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium text-gray-900">
          Today's Meal Plan
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1 rounded-lg border-dashed border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Meal
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-colors group"
            >
              <div className="relative h-14 w-14 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {meal.time}
                  </span>
                </div>
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {meal.name}
                </h4>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit2 className="h-3.5 w-3.5 text-gray-500" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TodayMealPlan;
