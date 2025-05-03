import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Download, Share2 } from "lucide-react";

interface GroceryItem {
  id: string;
  name: string;
  category: string;
  checked: boolean;
}

interface GroceryCategory {
  name: string;
  items: GroceryItem[];
}

const defaultGroceryList: GroceryCategory[] = [
  {
    name: "Fruits & Vegetables",
    items: [
      {
        id: "1",
        name: "Spinach",
        category: "Fruits & Vegetables",
        checked: false,
      },
      {
        id: "2",
        name: "Avocados",
        category: "Fruits & Vegetables",
        checked: true,
      },
      {
        id: "3",
        name: "Bell peppers",
        category: "Fruits & Vegetables",
        checked: false,
      },
    ],
  },
  {
    name: "Protein",
    items: [
      { id: "4", name: "Chicken breast", category: "Protein", checked: false },
      { id: "5", name: "Salmon fillet", category: "Protein", checked: false },
    ],
  },
  {
    name: "Dairy",
    items: [
      { id: "6", name: "Greek yogurt", category: "Dairy", checked: true },
      { id: "7", name: "Feta cheese", category: "Dairy", checked: false },
    ],
  },
  {
    name: "Pantry",
    items: [
      { id: "8", name: "Quinoa", category: "Pantry", checked: false },
      { id: "9", name: "Olive oil", category: "Pantry", checked: true },
    ],
  },
];

const SmartGroceryList = () => {
  const [groceryList, setGroceryList] =
    useState<GroceryCategory[]>(defaultGroceryList);

  const toggleItem = (itemId: string) => {
    setGroceryList((prevList) =>
      prevList.map((category) => ({
        ...category,
        items: category.items.map((item) =>
          item.id === itemId ? { ...item, checked: !item.checked } : item,
        ),
      })),
    );
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium text-gray-900">
          Smart Grocery List
        </CardTitle>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 rounded-lg border-gray-200"
          >
            <Download className="h-3.5 w-3.5 text-gray-500" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 rounded-lg border-gray-200"
          >
            <Share2 className="h-3.5 w-3.5 text-gray-500" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="max-h-[300px] overflow-y-auto">
        <div className="space-y-4">
          {groceryList.map((category) => (
            <div key={category.name} className="space-y-2">
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                {category.name}
              </h4>
              <div className="space-y-1">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-gray-50"
                  >
                    <Checkbox
                      id={`item-${item.id}`}
                      checked={item.checked}
                      onCheckedChange={() => toggleItem(item.id)}
                      className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <label
                      htmlFor={`item-${item.id}`}
                      className={`text-sm flex-1 cursor-pointer ${item.checked ? "line-through text-gray-400" : "text-gray-700"}`}
                    >
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full mt-4 h-8 gap-1 border border-dashed border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400 rounded-lg"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Item
        </Button>
      </CardContent>
    </Card>
  );
};

export default SmartGroceryList;
