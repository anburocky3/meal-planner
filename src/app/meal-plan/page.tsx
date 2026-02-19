"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Utensils,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BottomNavigation } from "@/components/bottom-navigation";
import { extractIngredients } from "@/data/ingredients";
import { generateMealPlan } from "@/data/meals";

interface MealPlan {
  day: string;
  breakfast: {
    id: string;
    name: string;
    image: string;
    cookingSteps: string[];
    ingredients: string[];
    preparationTime: string;
    cookingTime: string;
    totalTime: string;
  };
  lunch: {
    id: string;
    name: string;
    image: string;
    cookingSteps: string[];
    ingredients: string[];
    preparationTime: string;
    cookingTime: string;
    totalTime: string;
  };
  dinner: {
    id: string;
    name: string;
    image: string;
    cookingSteps: string[];
    ingredients: string[];
    preparationTime: string;
    cookingTime: string;
    totalTime: string;
  };
  snack: {
    id: string;
    name: string;
    image: string;
    cookingSteps: string[];
    ingredients: string[];
    preparationTime: string;
    cookingTime: string;
    totalTime: string;
  };
}

export default function MealPlanPage() {
  const [preferences, setPreferences] = useState({
    dietType: "regular",
    familySize: "1",
    allergies: "",
    cuisine: "south-indian",
  });

  const [mealPlan, setMealPlan] = useState<MealPlan[]>([]);
  const [currentDay, setCurrentDay] = useState(0);
  const [activeTab, setActiveTab] = useState("plan");
  const [ingredients, setIngredients] = useState<Record<string, number>>({});
  const [viewMode, setViewMode] = useState<"daily" | "weekly">("daily");

  useEffect(() => {
    // Load preferences from localStorage
    const savedPreferences = localStorage.getItem("mealPreferences");
    if (savedPreferences) {
      const parsedPreferences = JSON.parse(savedPreferences);
      setPreferences(parsedPreferences);

      // Generate meal plan based on preferences
      const newMealPlan = generateMealPlan(
        parsedPreferences.cuisine || "south-indian",
        parsedPreferences.dietType || "regular",
      );
      setMealPlan(newMealPlan);

      // Extract ingredients
      const ingredientsList = extractIngredients(
        parsedPreferences.cuisine || "south-indian",
      );
      setIngredients(ingredientsList);
    } else {
      // If no preferences found, generate default meal plan
      const defaultMealPlan = generateMealPlan("south-indian", "regular");
      setMealPlan(defaultMealPlan);

      // Extract ingredients
      const ingredientsList = extractIngredients("south-indian");
      setIngredients(ingredientsList);
    }
  }, []);

  const handlePrevDay = () => {
    setCurrentDay((prev) => (prev > 0 ? prev - 1 : 6));
  };

  const handleNextDay = () => {
    setCurrentDay((prev) => (prev < 6 ? prev + 1 : 0));
  };

  if (mealPlan.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-orange-50">
        <div className="animate-pulse flex flex-col items-center">
          <Utensils className="h-12 w-12 text-orange-500 mb-4" />
          <p className="text-orange-800">Loading your meal plan...</p>
        </div>
      </div>
    );
  }

  const currentMeal = mealPlan[currentDay];

  return (
    <main className="flex min-h-screen flex-col pb-16 bg-orange-50 dark:bg-gray-900">
      <div className="sticky top-0 z-10 bg-orange-500 dark:bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto max-w-md flex justify-between items-center">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-orange-600 dark:hover:bg-gray-700"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Your Meal Plan</h1>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-orange-600 dark:hover:bg-gray-700"
            onClick={() =>
              setViewMode(viewMode === "daily" ? "weekly" : "daily")
            }
          >
            {viewMode === "daily" ? "Weekly" : "Daily"}
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
            •<span className="ml-1">{preferences.dietType} diet</span> •
            <span className="ml-1">
              {preferences.familySize}{" "}
              {Number.parseInt(preferences.familySize) === 1
                ? "person"
                : "people"}
            </span>
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-orange-100">
            <TabsTrigger
              value="plan"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Meal Plan
            </TabsTrigger>
            <TabsTrigger
              value="shopping"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Shopping List
            </TabsTrigger>
          </TabsList>

          <TabsContent value="plan" className="mt-4">
            {viewMode === "daily" ? (
              <Card className="border-none shadow-md pt-0 gap-0">
                <CardHeader className="pt-3 pb-2 bg-orange-100 rounded-t-lg">
                  <div className="flex justify-between items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handlePrevDay}
                      className="text-orange-800"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-orange-500" />
                      <CardTitle className="text-orange-800">
                        {currentMeal.day}
                      </CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleNextDay}
                      className="text-orange-800"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 p-4">
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm text-orange-500">
                      Breakfast
                    </h3>
                    <div className="flex items-center gap-3 rounded-lg border border-orange-100 p-3 hover:bg-orange-50">
                      <div className="h-14 w-14 rounded-full overflow-hidden bg-orange-100 flex-shrink-0">
                        <Image
                          src={currentMeal.breakfast.image}
                          alt={currentMeal.breakfast.name}
                          width={56}
                          height={56}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none text-orange-900 mb-2">
                          {currentMeal.breakfast.name}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <Badge
                            variant="outline"
                            className="text-xs bg-orange-50 text-orange-800"
                          >
                            Prep: {currentMeal.breakfast.preparationTime}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-xs bg-orange-50 text-orange-800"
                          >
                            Cook: {currentMeal.breakfast.cookingTime}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-xs bg-orange-50 text-orange-800"
                          >
                            Total: {currentMeal.breakfast.totalTime}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-sm text-orange-500">
                      Lunch
                    </h3>
                    <div className="flex items-center gap-3 rounded-lg border border-orange-100 p-3 hover:bg-orange-50">
                      <div className="h-14 w-14 rounded-full overflow-hidden bg-orange-100 flex-shrink-0">
                        <Image
                          src={currentMeal.lunch.image}
                          alt={currentMeal.lunch.name}
                          width={56}
                          height={56}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-5 text-orange-900 mb-2">
                          {currentMeal.lunch.name}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <Badge
                            variant="outline"
                            className="text-xs bg-orange-50 text-orange-800"
                          >
                            Prep: {currentMeal.lunch.preparationTime}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-xs bg-orange-50 text-orange-800"
                          >
                            Cook: {currentMeal.lunch.cookingTime}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-xs bg-orange-50 text-orange-800"
                          >
                            Total: {currentMeal.lunch.totalTime}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-sm text-orange-500">
                      Dinner
                    </h3>
                    <div className="flex items-center gap-3 rounded-lg border border-orange-100 p-3 hover:bg-orange-50">
                      <div className="h-14 w-14 rounded-full overflow-hidden bg-orange-100 flex-shrink-0">
                        <Image
                          src={currentMeal.dinner.image}
                          alt={currentMeal.dinner.name}
                          width={56}
                          height={56}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium leading-none text-orange-900 mb-2">
                          {currentMeal.dinner.name}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <Badge
                            variant="outline"
                            className="text-xs bg-orange-50 text-orange-800"
                          >
                            Prep: {currentMeal.dinner.preparationTime}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-xs bg-orange-50 text-orange-800"
                          >
                            Cook: {currentMeal.dinner.cookingTime}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-xs bg-orange-50 text-orange-800"
                          >
                            Total: {currentMeal.dinner.totalTime}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-sm text-orange-500">
                      Snack
                    </h3>
                    <div className="flex items-center gap-3 rounded-lg border border-orange-100 p-3 hover:bg-orange-50">
                      <div className="h-14 w-14 rounded-full overflow-hidden bg-orange-100 flex-shrink-0">
                        <Image
                          src={currentMeal.snack.image}
                          alt={currentMeal.snack.name}
                          width={56}
                          height={56}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium leading-none text-orange-900 mb-2">
                          {currentMeal.snack.name}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <Badge
                            variant="outline"
                            className="text-xs bg-orange-50 text-orange-800"
                          >
                            Prep: {currentMeal.snack.preparationTime}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-xs bg-orange-50 text-orange-800"
                          >
                            Cook: {currentMeal.snack.cookingTime}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-xs bg-orange-50 text-orange-800"
                          >
                            Total: {currentMeal.snack.totalTime}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <Card className="border-none shadow-md pt-0 gap-0">
                  <CardHeader className="py-3 bg-orange-100 rounded-t-lg">
                    <CardTitle className="text-orange-800 text-center">
                      Weekly Meal Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-6">
                      {mealPlan.map((meal, index) => (
                        <div
                          key={index}
                          className="border-b border-orange-100 pb-4 last:border-0 last:pb-0"
                        >
                          <h3 className="font-bold text-orange-800 mb-2">
                            {meal.day}
                          </h3>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div className="space-y-1">
                              <Badge
                                variant="outline"
                                className="bg-orange-100 text-orange-800 w-full justify-center"
                              >
                                Breakfast
                              </Badge>
                              <p className="text-center">
                                {meal.breakfast.name}
                              </p>
                              <div className="flex justify-center gap-1 mt-1">
                                <Badge
                                  variant="outline"
                                  className="text-[10px] bg-orange-50 text-orange-800"
                                >
                                  {meal.breakfast.totalTime}
                                </Badge>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <Badge
                                variant="outline"
                                className="bg-orange-100 text-orange-800 w-full justify-center"
                              >
                                Lunch
                              </Badge>
                              <p className="text-center">{meal.lunch.name}</p>
                              <div className="flex justify-center gap-1 mt-1">
                                <Badge
                                  variant="outline"
                                  className="text-[10px] bg-orange-50 text-orange-800"
                                >
                                  {meal.lunch.totalTime}
                                </Badge>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <Badge
                                variant="outline"
                                className="bg-orange-100 text-orange-800 w-full justify-center"
                              >
                                Dinner
                              </Badge>
                              <p className="text-center">{meal.dinner.name}</p>
                              <div className="flex justify-center gap-1 mt-1">
                                <Badge
                                  variant="outline"
                                  className="text-[10px] bg-orange-50 text-orange-800"
                                >
                                  {meal.dinner.totalTime}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="shopping" className="mt-4">
            <Card className="border-none shadow-md pt-0 gap-0">
              <CardHeader className="bg-orange-100 rounded-t-lg py-4">
                <CardTitle className="flex items-center text-orange-800 text-xl font-bold">
                  <ShoppingCart className="mr-2 h-5 w-5 text-orange-500" />
                  Shopping List
                </CardTitle>
                <CardDescription className="text-orange-600">
                  Ingredients for your weekly meal plan
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {Object.entries(ingredients).map(([ingredient, quantity]) => (
                    <div
                      key={ingredient}
                      className="flex items-center justify-between border-b border-orange-100 pb-2"
                    >
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full border border-orange-500 mr-2"></div>
                        <span className="text-orange-900 text-sm">
                          {ingredient}
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-orange-50 text-orange-800"
                      >
                        {quantity}{" "}
                        {quantity > 1 &&
                        ![
                          "Rice",
                          "Ghee",
                          "Oil",
                          "Butter",
                          "Salt",
                          "Powder",
                        ].some((item) => ingredient.includes(item))
                          ? "pcs"
                          : ""}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-4">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Order Groceries
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation />
    </main>
  );
}
