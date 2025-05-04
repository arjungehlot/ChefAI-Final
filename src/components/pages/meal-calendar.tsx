import React, { useState } from "react";
import Layout from "../layout/Layout";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, ChevronLeft, ChevronRight, X } from "lucide-react";

interface MealPlan {
  date: Date;
  breakfast?: string;
  lunch?: string;
  dinner?: string;
  snacks?: string;
  breakfastImage?: string;
  lunchImage?: string;
  dinnerImage?: string;
}

const MealCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [mealType, setMealType] = useState<
    "breakfast" | "lunch" | "dinner" | "snacks"
  >("breakfast");

  // Mock meal plan data
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([
    {
      date: new Date(),
      breakfast: "Greek Yogurt with Berries",
      lunch: "Quinoa Salad with Chickpeas",
      dinner: "Grilled Salmon with Vegetables",
      snacks: "Apple with Almond Butter",
      breakfastImage:
        "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&q=80",
      lunchImage:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=80",
      dinnerImage:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&q=80",
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      breakfast: "Avocado Toast with Poached Eggs",
      lunch: "Mediterranean Wrap",
      dinner: "Vegetable Stir Fry with Tofu",
      breakfastImage:
        "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=300&q=80",
      lunchImage:
        "https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?w=300&q=80",
      dinnerImage:
        "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=300&q=80",
    },
  ]);

  const getCurrentMealPlan = () => {
    if (!selectedDate) return null;
    return (
      mealPlans.find(
        (plan) => plan.date.toDateString() === selectedDate.toDateString(),
      ) || {
        date: selectedDate,
        breakfast: "",
        lunch: "",
        dinner: "",
        snacks: "",
      }
    );
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAddMeal = (type: "breakfast" | "lunch" | "dinner" | "snacks") => {
    setMealType(type);
    setShowAddMeal(true);
  };

  const handleSaveMeal = (mealName: string) => {
    if (!selectedDate) return;

    const existingPlanIndex = mealPlans.findIndex(
      (plan) => plan.date.toDateString() === selectedDate.toDateString(),
    );

    if (existingPlanIndex >= 0) {
      const updatedPlans = [...mealPlans];
      updatedPlans[existingPlanIndex] = {
        ...updatedPlans[existingPlanIndex],
        [mealType]: mealName,
      };
      setMealPlans(updatedPlans);
    } else {
      setMealPlans([
        ...mealPlans,
        {
          date: selectedDate,
          [mealType]: mealName,
        },
      ]);
    }

    setShowAddMeal(false);
  };

  // Function to check if a date has a meal plan
  const hasDateMealPlan = (date: Date) => {
    return mealPlans.some(
      (plan) => plan.date.toDateString() === date.toDateString(),
    );
  };

  // Get the current month name
  const currentMonthName = date.toLocaleString("default", { month: "long" });
  const currentYear = date.getFullYear();

  // Navigate to previous/next month
  const goToPreviousMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() - 1);
    setDate(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + 1);
    setDate(newDate);
  };

  const currentMealPlan = getCurrentMealPlan();

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">Meal Calendar</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Meal Planner</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToPreviousMonth}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="font-medium">
                    {currentMonthName} {currentYear}
                  </div>
                  <Button variant="outline" size="icon" onClick={goToNextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate || undefined}
                  onSelect={(date) => date && handleDateClick(date)}
                  month={date}
                  className="rounded-md border"
                  modifiers={{
                    hasMeal: (date) => hasDateMealPlan(date),
                  }}
                  modifiersStyles={{
                    hasMeal: { backgroundColor: "#e9f5e9", fontWeight: "bold" },
                  }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Selected Day Meal Plan */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedDate
                    ? selectedDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })
                    : "Select a date"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDate ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Breakfast</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleAddMeal("breakfast")}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {currentMealPlan?.breakfast ? (
                        <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                          {currentMealPlan.breakfastImage && (
                            <img
                              src={currentMealPlan.breakfastImage}
                              alt="Breakfast"
                              className="w-12 h-12 rounded-md object-cover"
                            />
                          )}
                          <span>{currentMealPlan.breakfast}</span>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 italic">
                          No breakfast planned
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Lunch</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleAddMeal("lunch")}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {currentMealPlan?.lunch ? (
                        <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                          {currentMealPlan.lunchImage && (
                            <img
                              src={currentMealPlan.lunchImage}
                              alt="Lunch"
                              className="w-12 h-12 rounded-md object-cover"
                            />
                          )}
                          <span>{currentMealPlan.lunch}</span>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 italic">
                          No lunch planned
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Dinner</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleAddMeal("dinner")}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {currentMealPlan?.dinner ? (
                        <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                          {currentMealPlan.dinnerImage && (
                            <img
                              src={currentMealPlan.dinnerImage}
                              alt="Dinner"
                              className="w-12 h-12 rounded-md object-cover"
                            />
                          )}
                          <span>{currentMealPlan.dinner}</span>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 italic">
                          No dinner planned
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Snacks</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleAddMeal("snacks")}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {currentMealPlan?.snacks ? (
                        <div className="p-2 bg-gray-50 rounded-lg">
                          <span>{currentMealPlan.snacks}</span>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 italic">
                          No snacks planned
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      Select a date to view or plan meals
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Add Meal Dialog */}
        <Dialog open={showAddMeal} onOpenChange={setShowAddMeal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Add {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    name: "Greek Yogurt with Berries",
                    image:
                      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&q=80",
                  },
                  {
                    name: "Avocado Toast with Eggs",
                    image:
                      "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=300&q=80",
                  },
                  {
                    name: "Quinoa Salad",
                    image:
                      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=80",
                  },
                  {
                    name: "Grilled Salmon",
                    image:
                      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&q=80",
                  },
                ].map((meal, index) => (
                  <div
                    key={index}
                    className="cursor-pointer hover:shadow-md transition-shadow rounded-lg overflow-hidden border"
                    onClick={() => handleSaveMeal(meal.name)}
                  >
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-2 text-center">
                      <p className="text-sm font-medium">{meal.name}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setShowAddMeal(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default MealCalendar;
