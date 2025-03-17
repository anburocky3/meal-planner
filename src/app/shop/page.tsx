"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, Share2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { BottomNavigation } from "@/components/bottom-navigation";
import { extractIngredients } from "@/data/ingredients";

export default function ShopPage() {
  const [ingredients, setIngredients] = useState<Record<string, number>>({});
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [preferences, setPreferences] = useState({
    cuisine: "south-indian",
    dietType: "regular",
  });

  useEffect(() => {
    // Load preferences from localStorage
    const savedPreferences = localStorage.getItem("mealPreferences");
    if (savedPreferences) {
      const parsedPreferences = JSON.parse(savedPreferences);
      setPreferences({
        cuisine: parsedPreferences.cuisine || "south-indian",
        dietType: parsedPreferences.dietType || "regular",
      });

      // Extract ingredients based on preferences
      const ingredientsList = extractIngredients(
        parsedPreferences.cuisine || "south-indian"
      );
      setIngredients(ingredientsList);
    } else {
      // If no preferences found, use default
      const ingredientsList = extractIngredients("south-indian");
      setIngredients(ingredientsList);
    }
  }, []);

  const toggleItem = (item: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(item)) {
      newSelected.delete(item);
    } else {
      newSelected.add(item);
    }
    setSelectedItems(newSelected);
  };

  const shareToWhatsApp = () => {
    const remainingItems = Object.entries(ingredients)
      .filter(([ingredient]) => !selectedItems.has(ingredient))
      .map(([ingredient, quantity]) => {
        return `${ingredient} - ${quantity}${
          quantity > 1 &&
          !["Rice", "Ghee", "Oil", "Butter", "Salt", "Powder"].some((item) =>
            ingredient.includes(item)
          )
            ? " pcs"
            : ""
        }`;
      })
      .join("\n");

    const message = `*My Shopping List*\n\n${remainingItems}\n\n*Shared from Meal Planner App*`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
  };

  const selectAll = () => {
    if (selectedItems.size === Object.keys(ingredients).length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(Object.keys(ingredients)));
    }
  };

  return (
    <main className="flex min-h-screen flex-col pb-16 bg-orange-50">
      <div className="sticky top-0 z-10 bg-orange-500 text-white p-4 shadow-md">
        <div className="container mx-auto max-w-md flex justify-between items-center">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-orange-600"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Shopping List</h1>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-orange-600"
            onClick={shareToWhatsApp}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="container mx-auto max-w-md p-4">
        <div className="bg-white rounded-lg p-3 mb-4 shadow-sm">
          <p className="text-center text-sm text-orange-800">
            <span className="font-semibold">
              {preferences.cuisine === "south-indian" ? "South" : "North"}{" "}
              Indian
            </span>{" "}
            • <span className="ml-1">{preferences.dietType} diet</span>
          </p>
        </div>

        <Card className="border-none shadow-md py-0">
          <CardHeader className="bg-orange-100 rounded-t-lg py-4">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center text-orange-800 text-xl font-bold">
                <ShoppingCart className="mr-2 h-5 w-5 text-orange-500" />
                Shopping List
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="text-orange-600 hover:bg-orange-200 border-orange-300"
                onClick={selectAll}
              >
                {selectedItems.size === Object.keys(ingredients).length
                  ? "Unselect All"
                  : "Select All"}
              </Button>
            </div>
            <CardDescription className="text-orange-600">
              {Object.keys(ingredients).length - selectedItems.size} items
              remaining
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-2">
              {Object.entries(ingredients).map(([ingredient, quantity]) => (
                <div
                  key={ingredient}
                  className={`flex items-center justify-between border-b border-orange-100 p-2 ${
                    selectedItems.has(ingredient)
                      ? "line-through text-gray-400"
                      : ""
                  }`}
                >
                  <div className="flex items-center">
                    <Checkbox
                      id={`ingredient-${ingredient}`}
                      checked={selectedItems.has(ingredient)}
                      onCheckedChange={() => toggleItem(ingredient)}
                      className="mr-2 border-orange-500 data-[state=checked]:bg-orange-500"
                    />
                    <label
                      htmlFor={`ingredient-${ingredient}`}
                      className="text-orange-900 cursor-pointer flex-1"
                    >
                      {ingredient}
                    </label>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-orange-50 text-orange-800"
                  >
                    {quantity}{" "}
                    {quantity > 1 &&
                    !["Rice", "Ghee", "Oil", "Butter", "Salt", "Powder"].some(
                      (item) => ingredient.includes(item)
                    )
                      ? "pcs"
                      : ""}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          <Button
            className="w-full bg-green-600 hover:bg-green-700 shadow-md flex items-center justify-center gap-2 py-6"
            onClick={shareToWhatsApp}
          >
            <Share2 className="h-5 w-5" />
            Share to WhatsApp
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </main>
  );
}
