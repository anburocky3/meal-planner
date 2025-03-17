import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping List | Indian Meal Planner",
  description:
    "Get a comprehensive shopping list of all ingredients needed for your Indian meal plan. Easily check off items and share to WhatsApp.",
  openGraph: {
    title: "Your Indian Cooking Shopping List",
    description:
      "Get a comprehensive shopping list of all ingredients needed for your Indian meal plan. Easily check off items and share to WhatsApp.",
    images: [
      {
        url: "/og-shopping.jpg",
        width: 1200,
        height: 630,
        alt: "Indian Cooking Shopping List",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Indian Cooking Shopping List",
    description:
      "Get a comprehensive shopping list of all ingredients needed for your Indian meal plan. Easily check off items and share to WhatsApp.",
    images: ["/og-shopping.jpg"],
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
