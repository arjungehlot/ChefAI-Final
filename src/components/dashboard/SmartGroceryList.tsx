import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Download, Share2, Sun, Moon, Trash2, ShoppingBasket } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

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
      { id: "1", name: "Spinach", category: "Fruits & Vegetables", checked: false },
      { id: "2", name: "Avocados", category: "Fruits & Vegetables", checked: true },
      { id: "3", name: "Bell peppers", category: "Fruits & Vegetables", checked: false },
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
  const [groceryList, setGroceryList] = useState<GroceryCategory[]>(defaultGroceryList);
  const [search, setSearch] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Pantry");

  const toggleItem = (itemId: string) => {
    setGroceryList((prevList) =>
      prevList.map((category) => ({
        ...category,
        items: category.items.map((item) =>
          item.id === itemId ? { ...item, checked: !item.checked } : item
        ),
      }))
    );
  };

  const filteredList = groceryList.map((category) => ({
    ...category,
    items: category.items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  const checkedCount = groceryList
    .flatMap((cat) => cat.items)
    .filter((item) => item.checked).length;

  const addItem = () => {
    if (!newItemName.trim()) return;
    const newId = Date.now().toString();
    const updatedList = groceryList.map((category) => {
      if (category.name === newItemCategory) {
        return {
          ...category,
          items: [...category.items, { id: newId, name: newItemName, category: newItemCategory, checked: false }],
        };
      }
      return category;
    });
    setGroceryList(updatedList);
    setShowAddDialog(false);
    setNewItemName("");
  };

  const clearCheckedItems = () => {
    const updatedList = groceryList.map((category) => ({
      ...category,
      items: category.items.filter((item) => !item.checked),
    }));
    setGroceryList(updatedList);
  };

  return (
    <div className="p-4 mx-28 transition-all text-gray-900 rounded-xl">
      <Card className="backdrop-blur border border-gray-200 rounded-2xl shadow-md">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 space-y-2 sm:space-y-0 bg-green-500 p-4 rounded-t-2xl text-white">
          <div className="flex items-center gap-2">
            <ShoppingBasket className="h-5 w-5" />
            <CardTitle className="text-lg font-semibold">Smart Grocery List</CardTitle>
          </div>
          <div className="flex gap-2 items-center">
            <Input
              type="text"
              placeholder="Search items..."
              className="w-40 sm:w-56 white rounded-md border border-white px-3 py-2 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
        
          </div>
        </CardHeader>

        <CardContent className="max-h-[350px] overflow-y-auto space-y-4 p-4">
          {filteredList.map(
            (category) =>
              category.items.length > 0 && (
                <div key={category.name} className="space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {category.name}
                  </h4>
                  <div className="space-y-1">
                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2 py-1 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Checkbox
                          id={`item-${item.id}`}
                          checked={item.checked}
                          onCheckedChange={() => toggleItem(item.id)}
                          className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                        />
                        <label
                          htmlFor={`item-${item.id}`}
                          className={`text-sm flex-1 cursor-pointer ${item.checked ? "line-through text-gray-400" : ""}`}
                        >
                          {item.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
          <div className="flex justify-between items-center pt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAddDialog(true)}
              className="gap-1 border border-dashed text-gray-600 hover:border-gray-400 rounded-md"
            >
              <Plus className="h-4 w-4" />
              Add Item
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-700"
              onClick={clearCheckedItems}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear Checked
            </Button>
          </div>
          <p className="text-xs text-right text-gray-500 pt-2">
            ✅ {checkedCount} item{checkedCount !== 1 && "s"} completed
          </p>
        </CardContent>
      </Card>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Grocery Item</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Enter item name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <select
            value={newItemCategory}
            onChange={(e) => setNewItemCategory(e.target.value)}
            className="w-full mt-2 rounded-md border px-3 py-2 text-sm"
          >
            {groceryList.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <DialogFooter>
            <Button onClick={addItem} disabled={!newItemName.trim()}>
              Add Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SmartGroceryList;
