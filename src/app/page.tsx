"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Utensils } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    dietType: "regular",
    familySize: "3",
    allergies: "",
    cuisine: "south-indian",
  });

  const handleChange = (field: string, value: string) => {
    setPreferences({ ...preferences, [field]: value });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Save preferences to localStorage for use in meal plan page
      localStorage.setItem("mealPreferences", JSON.stringify(preferences));
      router.push("/meal-plan");
    }
  };

  return (
    <>
      {/* Add JSON-LD structured data for Recipe */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Indian Meal Planner",
            url: "https://indian-meal.vercel.app",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://indian-meal.vercel.app/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-indigo-50 to-orange-200 dark:bg-gradient-to-b dark:from-indigo-900 dark:to-orange-950 relative">
        <div className="absolute top-4 right-10">
          <ModeToggle />
        </div>
        <div className="w-full max-w-md flex flex-col items-center mb-6">
          <div className="h-16 w-16 rounded-full bg-orange-500 flex items-center justify-center mb-4">
            <Utensils className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-orange-800 dark:text-orange-100">
            Indian Meal Planner
          </h1>
        </div>
        <Card className="w-full max-w-md border-none  shadow-lg p-0">
          <CardHeader className="bg-orange-500 text-white rounded-t-lg  py-5">
            <CardTitle className="text-xl text-center">
              Setup Your Meal Plan
            </CardTitle>
            <CardDescription className="text-center text-orange-100">
              {step === 1 && "Let's set up your meal preferences"}
              {step === 2 && "Tell us about your dietary needs"}
              {step === 3 && "Almost done! Just a few more details"}
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="familySize">
                    How many people are you cooking for?
                  </Label>
                  <Select
                    defaultValue={preferences.familySize}
                    onValueChange={(value) => handleChange("familySize", value)}
                  >
                    <SelectTrigger
                      id="familySize"
                      className="border-orange-200 w-full outline"
                    >
                      <SelectValue placeholder="Select family size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Just me</SelectItem>
                      <SelectItem value="2">2 people</SelectItem>
                      <SelectItem value="3">3 people</SelectItem>
                      <SelectItem value="4">4 people</SelectItem>
                      <SelectItem value="5">5+ people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cuisine">Preferred Cuisine</Label>
                  <RadioGroup
                    defaultValue={preferences.cuisine}
                    onValueChange={(value) => handleChange("cuisine", value)}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-orange-200 hover:bg-orange-50">
                      <RadioGroupItem
                        value="south-indian"
                        id="cuisine-south"
                        className="text-orange-500"
                      />
                      <Label
                        htmlFor="cuisine-south"
                        className="flex-1 cursor-pointer"
                      >
                        South Indian
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-orange-200 hover:bg-orange-50">
                      <RadioGroupItem
                        value="north-indian"
                        id="cuisine-north"
                        className="text-orange-500"
                      />
                      <Label
                        htmlFor="cuisine-north"
                        className="flex-1 cursor-pointer"
                      >
                        North Indian
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>What type of diet do you follow?</Label>
                  <RadioGroup
                    defaultValue={preferences.dietType}
                    onValueChange={(value) => handleChange("dietType", value)}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-orange-200 hover:bg-orange-50">
                      <RadioGroupItem
                        value="regular"
                        id="diet-regular"
                        className="text-orange-500"
                      />
                      <Label
                        htmlFor="diet-regular"
                        className="flex-1 cursor-pointer"
                      >
                        Regular (No restrictions)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-orange-200 hover:bg-orange-50">
                      <RadioGroupItem
                        value="vegetarian"
                        id="diet-vegetarian"
                        className="text-orange-500"
                      />
                      <Label
                        htmlFor="diet-vegetarian"
                        className="flex-1 cursor-pointer"
                      >
                        Vegetarian
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-orange-200 hover:bg-orange-50">
                      <RadioGroupItem
                        value="vegan"
                        id="diet-vegan"
                        className="text-orange-500"
                      />
                      <Label
                        htmlFor="diet-vegan"
                        className="flex-1 cursor-pointer"
                      >
                        Vegan
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="allergies">
                    Any allergies or foods to avoid?
                  </Label>
                  <Input
                    id="allergies"
                    placeholder="e.g., nuts, dairy"
                    value={preferences.allergies}
                    onChange={(e) => handleChange("allergies", e.target.value)}
                    className="border-orange-200"
                  />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="pb-6">
            <Button
              onClick={handleNext}
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              {step < 3 ? "Next" : "Create My Meal Plan"}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}
