import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Meal Plan | Indian Meal Planner",
  description:
    "View and manage your personalized South and North Indian meal plan with recipes, preparation times, and ingredients.",
  openGraph: {
    title: "Your Personalized Indian Meal Plan",
    description:
      "View and manage your personalized South and North Indian meal plan with recipes, preparation times, and ingredients.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Weekly Indian Meal Plan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Personalized Indian Meal Plan",
    description:
      "View and manage your personalized South and North Indian meal plan with recipes, preparation times, and ingredients.",
    images: ["/og-image.png"],
  },
};

export default function MealPlanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
