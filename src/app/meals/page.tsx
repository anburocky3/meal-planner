"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BottomNavigation } from "@/components/bottom-navigation";
import { northIndianMeals, southIndianMeals } from "@/data/meals";

export default function MealsPage() {
  const [activeTab, setActiveTab] = useState("south");
  const [activeMealType, setActiveMealType] = useState("breakfast");
  const [activeDietType, setActiveDietType] = useState("regular");

  const meals = activeTab === "south" ? southIndianMeals : northIndianMeals;
  const activeMeals =
    meals[activeDietType as keyof typeof meals]?.[
      activeMealType as keyof typeof meals.regular
    ] || [];

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
          <h1 className="text-xl font-bold">All Meals</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="container mx-auto max-w-md p-4">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full mb-4"
        >
          <TabsList className="grid w-full grid-cols-2 bg-orange-100">
            <TabsTrigger
              value="south"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              South Indian
            </TabsTrigger>
            <TabsTrigger
              value="north"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              North Indian
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mb-4">
          <Tabs
            value={activeDietType}
            onValueChange={setActiveDietType}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 bg-orange-100">
              <TabsTrigger
                value="regular"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Regular
              </TabsTrigger>
              <TabsTrigger
                value="vegetarian"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Vegetarian
              </TabsTrigger>
              <TabsTrigger
                value="vegan"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Vegan
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="mb-4">
          <Tabs
            value={activeMealType}
            onValueChange={setActiveMealType}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4 bg-orange-100">
              <TabsTrigger
                value="breakfast"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Breakfast
              </TabsTrigger>
              <TabsTrigger
                value="lunch"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Lunch
              </TabsTrigger>
              <TabsTrigger
                value="dinner"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Dinner
              </TabsTrigger>
              <TabsTrigger
                value="snacks"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Snacks
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {activeMeals.length > 0 ? (
            activeMeals.map((meal) => (
              <Card key={meal.id} className="overflow-hidden pt-0">
                <div className="h-48 w-full relative">
                  <Image
                    src={meal.image}
                    alt={meal.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-orange-800">{meal.name}</CardTitle>
                  <div className="flex gap-2 mt-1">
                    <Badge
                      variant="outline"
                      className="flex items-center text-xs bg-orange-50 text-orange-800"
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      Prep: {meal.preparationTime}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="flex items-center text-xs bg-orange-50 text-orange-800"
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      Cook: {meal.cookingTime}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <h4 className="font-medium text-sm text-orange-600 mb-2">
                    Ingredients:
                  </h4>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {meal.ingredients.map((ingredient, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="bg-orange-100"
                      >
                        {ingredient}
                      </Badge>
                    ))}
                  </div>

                  <h4 className="font-medium text-sm text-orange-600 mb-2">
                    Cooking Steps:
                  </h4>
                  <ol className="list-decimal pl-5 text-sm space-y-1 text-orange-900">
                    {meal.cookingSteps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-10 text-orange-800">
              <p>No meals available for this selection.</p>
              <p className="text-sm mt-2">
                Try a different combination of cuisine, diet type, or meal type.
              </p>
            </div>
          )}
        </div>
      </div>

      <BottomNavigation />
    </main>
  );
}
