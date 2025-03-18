import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Meals | Indian Meal Planner",
  description:
    "Explore a wide variety of delicious South and North Indian meals with detailed recipes, cooking times, and ingredient information.",
  openGraph: {
    title: "Explore Delicious Indian Meals and Recipes",
    description:
      "Discover a wide variety of delicious South and North Indian meals with detailed recipes, cooking times, and ingredient information.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Indian Meal Recipes Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Delicious Indian Meals and Recipes",
    description:
      "Discover a wide variety of delicious South and North Indian meals with detailed recipes, cooking times, and ingredient information.",
    images: ["/og-image.png"],
  },
};

export default function MealsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
