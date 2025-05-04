"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Clock, Droplet, X, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Meal {
  id: string;
  time: string;
  name: string;
  image: string;
  recipe?: string;
  calories?: number;
}

const defaultMeals: Meal[] = [
  {
    id: "1",
    time: "08:00",
    name: "Avocado Toast with Poached Eggs",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=300&q=80",
    recipe: "Toast bread, add avocado mash, top with poached eggs.",
    calories: 350,
  },
  {
    id: "2",
    time: "12:30",
    name: "Quinoa Salad with Grilled Chicken",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=80",
    recipe: "Mix cooked quinoa, grilled chicken, veggies, olive oil.",
    calories: 480,
  },
  {
    id: "3",
    time: "16:00",
    name: "Greek Yogurt with Berries",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&q=80",
    recipe: "Add berries to a cup of Greek yogurt, top with honey.",
    calories: 200,
  },
  {
    id: "4",
    time: "19:00",
    name: "Baked Salmon with Roasted Vegetables",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&q=80",
    recipe: "Bake salmon, season, serve with roasted vegetables.",
    calories: 520,
  },
];

const TodayMealPlan = () => {
  const [meals, setMeals] = useState<Meal[]>(defaultMeals);
  const [waterCups, setWaterCups] = useState(5);
  const [showRecipe, setShowRecipe] = useState<Meal | null>(null);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);

  const totalCalories = meals.reduce((sum, meal) => sum + (meal.calories || 0), 0);

  const handleSaveMeal = () => {
    if (!editingMeal) return;

    setMeals((prev) => {
      const existingIndex = prev.findIndex((m) => m.id === editingMeal.id);
      if (existingIndex !== -1) {
        // Update
        const updated = [...prev];
        updated[existingIndex] = editingMeal;
        return updated;
      }
      // Add
      return [...prev, { ...editingMeal, id: Date.now().toString() }];
    });

    setEditingMeal(null);
    setIsAddEditOpen(false);
  };

  return (
    <div className="p-6 mx-28 space-y-6 text-gray-800">
      {/* SECTION 1: Header + Add Meal */}
      <Card className="bg-white/90 border border-gray-100 rounded-2xl shadow-lg">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Today's Meal Plan 🍽️</CardTitle>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => {
              setEditingMeal({
                id: "",
                name: "",
                image: "",
                time: "",
                recipe: "",
                calories: 0,
              });
              setIsAddEditOpen(true);
            }}
          >
            <Plus className="h-4 w-4" />
            Add Meal
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className="flex items-center gap-4 p-2 rounded-xl hover:bg-gray-100 group transition"
            >
              <img
                src={meal.image}
                alt={meal.name}
                className="w-14 h-14 rounded-xl object-cover"
              />
              <div className="flex-1">
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {meal.time}
                </p>
                <p className="font-medium truncate">{meal.name}</p>
                <p className="text-xs text-gray-500">{meal.calories} kcal</p>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" onClick={() => setShowRecipe(meal)}>
                  <Eye className="w-4 h-4 text-gray-600" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    setEditingMeal(meal);
                    setIsAddEditOpen(true);
                  }}
                >
                  <Edit2 className="w-4 h-4 text-gray-600" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Water Tracker */}
      <Card className="bg-blue-50 border border-blue-200 rounded-2xl shadow">
        <CardHeader>
          <CardTitle className="text-blue-800 flex justify-between items-center">
            Water Intake 💧
            <span className="text-sm text-blue-600">{waterCups} cups</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3 items-center">
          <Button onClick={() => setWaterCups(waterCups - 1)} disabled={waterCups === 0}>
            -
          </Button>
          <Droplet className="text-blue-500 w-6 h-6" />
          <Button onClick={() => setWaterCups(waterCups + 1)}>+</Button>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="bg-green-50 border border-green-200 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-green-700">Summary 🧮</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Total Calories: <strong>{totalCalories}</strong> kcal</p>
          <p className="text-sm mt-1">Meals planned: <strong>{meals.length}</strong></p>
        </CardContent>
      </Card>

      {/* Tip */}
      <Card className="bg-yellow-50 border border-yellow-200 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-yellow-800">Tip of the Day 🌟</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Don't skip breakfast. It helps kickstart your metabolism and gives energy.
          </p>
        </CardContent>
      </Card>

      {/* Snack Suggestions */}
      <Card className="bg-purple-50 border border-purple-200 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-purple-800">Quick Snack Suggestions 🍌</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-700 space-y-1">
          <li>Fruit smoothie with chia seeds</li>
          <li>Peanut butter & banana toast</li>
          <li>Handful of almonds</li>
        </CardContent>
      </Card>

      {/* View Recipe Modal */}
      {showRecipe && (
        <Dialog open={!!showRecipe} onOpenChange={() => setShowRecipe(null)}>
          <DialogContent>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">{showRecipe.name}</h2>
              <Button size="icon" variant="ghost" onClick={() => setShowRecipe(null)}>
                <X />
              </Button>
            </div>
            <img src={showRecipe.image} alt={showRecipe.name} className="rounded-xl w-full" />
            <p className="mt-4 text-sm text-gray-700">{showRecipe.recipe}</p>
          </DialogContent>
        </Dialog>
      )}

      {/* Add/Edit Modal */}
      <Dialog open={isAddEditOpen} onOpenChange={setIsAddEditOpen}>
        <DialogContent className="space-y-4">
          <h2 className="text-lg font-semibold">
            {editingMeal?.id ? "Edit Meal" : "Add New Meal"}
          </h2>
          <Input
            placeholder="Meal name"
            value={editingMeal?.name || ""}
            onChange={(e) => setEditingMeal((m) => ({ ...m!, name: e.target.value }))}
          />
          <Input
            placeholder="Image URL"
            value={editingMeal?.image || ""}
            onChange={(e) => setEditingMeal((m) => ({ ...m!, image: e.target.value }))}
          />
          <Input
            placeholder="Time (e.g. 08:00)"
            value={editingMeal?.time || ""}
            onChange={(e) => setEditingMeal((m) => ({ ...m!, time: e.target.value }))}
          />
          <Input
            placeholder="Calories"
            type="number"
            value={editingMeal?.calories || ""}
            onChange={(e) => setEditingMeal((m) => ({ ...m!, calories: parseInt(e.target.value) }))}
          />
          <Input
            placeholder="Recipe"
            value={editingMeal?.recipe || ""}
            onChange={(e) => setEditingMeal((m) => ({ ...m!, recipe: e.target.value }))}
          />
          <Button onClick={handleSaveMeal} className="w-full">
            {editingMeal?.id ? "Update Meal" : "Add Meal"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TodayMealPlan;
