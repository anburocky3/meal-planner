import { Metadata } from "next";

export const metadata: Metadata = {
  title: "App Settings | Indian Meal Planner",
  description:
    "Customize your Indian Meal Planner experience with preferences for cuisine type, diet type, family size, and appearance settings.",
  openGraph: {
    title: "Customize Your Indian Meal Planner",
    description:
      "Customize your Indian Meal Planner experience with preferences for cuisine type, diet type, family size, and appearance settings.",
    images: [
      {
        url: "/og-settings.jpg",
        width: 1200,
        height: 630,
        alt: "Indian Meal Planner Settings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Customize Your Indian Meal Planner",
    description:
      "Customize your Indian Meal Planner experience with preferences for cuisine type, diet type, family size, and appearance settings.",
    images: ["/og-settings.jpg"],
  },
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
