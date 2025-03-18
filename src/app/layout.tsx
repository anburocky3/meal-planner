import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { InstallPWA } from "@/components/pwa/install-prompt";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Indian Meal Planner - Personalized South & North Indian Recipes",
  description:
    "Plan and prepare delicious South and North Indian meals with personalized recipes, shopping lists, and meal plans for your diet preferences.",
  keywords: [
    "meal planner",
    "indian recipes",
    "south indian food",
    "north indian food",
    "vegetarian",
    "vegan",
    "meal prep",
    "cooking",
  ],
  authors: [{ name: "Indian Meal Planner Team" }],
  creator: "Indian Meal Planner",
  publisher: "Indian Meal Planner",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://indian-meal.vercel.app",
    title: "Indian Meal Planner - Personalized South & North Indian Recipes",
    description:
      "Plan and prepare delicious South and North Indian meals with personalized recipes, shopping lists, and meal plans for your diet preferences.",
    siteName: "Indian Meal Planner",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Indian Meal Planner - Delicious Recipes and Meal Plans",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Indian Meal Planner - Personalized South & North Indian Recipes",
    description:
      "Plan and prepare delicious South and North Indian meals with personalized recipes, shopping lists, and meal plans for your diet preferences.",
    images: ["/twitter-image.jpg"],
    creator: "@indianmealplanner",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f97316" },
    { media: "(prefers-color-scheme: dark)", color: "#1f2937" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest",
  appleWebApp: {
    title: "Indian Meal Planner",
    statusBarStyle: "black-translucent",
    capable: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="application-name" content="Indian Meal Planner" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Indian Meal Planner" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <InstallPWA />
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/service-worker').then(
                    function(registration) {
                      console.log('Service Worker registration successful with scope: ', registration.scope);
                    },
                    function(err) {
                      console.log('Service Worker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
