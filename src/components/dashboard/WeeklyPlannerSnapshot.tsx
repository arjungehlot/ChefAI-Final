import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

interface MealPlan {
  day: string;
  date: string;
  meals: {
    type: string;
    name: string;
  }[];
}

const defaultWeekPlan: MealPlan[] = [
  {
    day: "Mon",
    date: "15",
    meals: [
      { type: "breakfast", name: "Avocado Toast" },
      { type: "lunch", name: "Quinoa Salad" },
      { type: "dinner", name: "Baked Salmon" },
    ],
  },
  {
    day: "Tue",
    date: "16",
    meals: [
      { type: "breakfast", name: "Greek Yogurt Bowl" },
      { type: "lunch", name: "Chicken Wrap" },
      { type: "dinner", name: "Vegetable Stir Fry" },
    ],
  },
  {
    day: "Wed",
    date: "17",
    meals: [
      { type: "breakfast", name: "Smoothie Bowl" },
      { type: "lunch", name: "Lentil Soup" },
      { type: "dinner", name: "Grilled Chicken" },
    ],
  },
  {
    day: "Thu",
    date: "18",
    meals: [
      { type: "breakfast", name: "Oatmeal" },
      { type: "lunch", name: "Tuna Salad" },
      { type: "dinner", name: "Pasta Primavera" },
    ],
  },
  {
    day: "Fri",
    date: "19",
    meals: [
      { type: "breakfast", name: "Egg Muffins" },
      { type: "lunch", name: "Buddha Bowl" },
      { type: "dinner", name: "Fish Tacos" },
    ],
  },
  {
    day: "Sat",
    date: "20",
    meals: [
      { type: "breakfast", name: "Pancakes" },
      { type: "lunch", name: "Caprese Sandwich" },
      { type: "dinner", name: "Homemade Pizza" },
    ],
  },
  {
    day: "Sun",
    date: "21",
    meals: [
      { type: "breakfast", name: "French Toast" },
      { type: "lunch", name: "Cobb Salad" },
      { type: "dinner", name: "Beef Stir Fry" },
    ],
  },
];

const WeeklyPlannerSnapshot = () => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium text-gray-900">
          Weekly Meal Planner
        </CardTitle>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 rounded-lg text-gray-500 hover:text-gray-900"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">This Week</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 rounded-lg text-gray-500 hover:text-gray-900"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-7 divide-x divide-gray-100">
          {defaultWeekPlan.map((day) => (
            <div key={day.day} className="min-w-0">
              <div className="text-center py-2 border-b border-gray-100">
                <div className="text-xs font-medium text-gray-500">
                  {day.day}
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  {day.date}
                </div>
              </div>
              <div className="p-2 space-y-2">
                {day.meals.map((meal, idx) => (
                  <div
                    key={idx}
                    className={`text-xs p-1 rounded truncate ${meal.type === "breakfast" ? "bg-blue-50 text-blue-700" : meal.type === "lunch" ? "bg-green-50 text-green-700" : "bg-purple-50 text-purple-700"}`}
                  >
                    {meal.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-gray-100">
          <Button
            variant="outline"
            size="sm"
            className="w-full h-8 gap-1 rounded-lg border-green-200 text-green-700 hover:bg-green-50"
          >
            <CalendarDays className="h-3.5 w-3.5" />
            View Full Calendar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyPlannerSnapshot;
