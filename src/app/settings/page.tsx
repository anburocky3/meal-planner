"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BottomNavigation } from "@/components/bottom-navigation";

export default function SettingsPage() {
  const [preferences, setPreferences] = useState({
    dietType: "regular",
    familySize: "1",
    allergies: "",
    cuisine: "south-indian",
  });
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Load preferences from localStorage
    const savedPreferences = localStorage.getItem("mealPreferences");
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }

    // Load dark mode setting
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode) {
      const isDarkMode = savedDarkMode === "true";
      setDarkMode(isDarkMode);

      // Apply dark mode to document
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const handlePreferenceChange = (key: string, value: string) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    localStorage.setItem("mealPreferences", JSON.stringify(newPreferences));
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());

    // Apply dark mode to document
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

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
          <h1 className="text-xl font-bold">Settings</h1>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </div>

      <div className="container mx-auto max-w-md p-4">
        <Card className="border-none shadow-md mb-4 dark:bg-gray-800 dark:text-gray-100 py-0">
          <CardHeader className="bg-orange-100 dark:bg-gray-700 rounded-t-lg py-4">
            <CardTitle className="text-orange-800 dark:text-gray-100">
              Appearance
            </CardTitle>
            <CardDescription className="text-orange-600 dark:text-gray-300">
              Customize how the app looks
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {darkMode ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
                <Label htmlFor="dark-mode" className="font-medium">
                  Dark Mode
                </Label>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={toggleDarkMode}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md mb-4 dark:bg-gray-800 dark:text-gray-100 py-0">
          <CardHeader className="bg-orange-100 dark:bg-gray-700 rounded-t-lg py-4">
            <CardTitle className="text-orange-800 dark:text-gray-100">
              Meal Preferences
            </CardTitle>
            <CardDescription className="text-orange-600 dark:text-gray-300">
              Customize your meal plan
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cuisine" className="font-medium">
                Cuisine
              </Label>
              <Select
                value={preferences.cuisine}
                onValueChange={(value) =>
                  handlePreferenceChange("cuisine", value)
                }
              >
                <SelectTrigger className="w-full dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
                  <SelectValue placeholder="Select cuisine" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
                  <SelectGroup>
                    <SelectLabel>Cuisine</SelectLabel>
                    <SelectItem value="south-indian">South Indian</SelectItem>
                    <SelectItem value="north-indian">North Indian</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="diet-type" className="font-medium">
                Diet Type
              </Label>
              <Select
                value={preferences.dietType}
                onValueChange={(value) =>
                  handlePreferenceChange("dietType", value)
                }
              >
                <SelectTrigger className="w-full dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
                  <SelectValue placeholder="Select diet type" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
                  <SelectGroup>
                    <SelectLabel>Diet Type</SelectLabel>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="family-size" className="font-medium">
                Family Size
              </Label>
              <Select
                value={preferences.familySize}
                onValueChange={(value) =>
                  handlePreferenceChange("familySize", value)
                }
              >
                <SelectTrigger className="w-full dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
                  <SelectValue placeholder="Select family size" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
                  <SelectGroup>
                    <SelectLabel>Family Size</SelectLabel>
                    <SelectItem value="1">1 person</SelectItem>
                    <SelectItem value="2">2 people</SelectItem>
                    <SelectItem value="3">3 people</SelectItem>
                    <SelectItem value="4">4 people</SelectItem>
                    <SelectItem value="5">5+ people</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="allergies" className="font-medium">
                Allergies (comma separated)
              </Label>
              <Input
                id="allergies"
                className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                placeholder="e.g. peanuts, shellfish"
                value={preferences.allergies}
                onChange={(e) =>
                  handlePreferenceChange("allergies", e.target.value)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* <Card className="border-none shadow-md dark:bg-gray-800 dark:text-gray-100 py-0 ">
          <CardHeader className="bg-orange-100 dark:bg-gray-700 rounded-t-lg py-4">
            <CardTitle className="text-orange-800 dark:text-gray-100">
              Account
            </CardTitle>
            <CardDescription className="text-orange-600 dark:text-gray-300">
              Manage your account
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <Button
              variant="outline"
              className="w-full dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Sync with Cloud
            </Button>
            <Button variant="destructive" className="w-full">
              Reset All Preferences
            </Button>
          </CardContent>
        </Card> */}
      </div>

      <BottomNavigation />
    </main>
  );
}
