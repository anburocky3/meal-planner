import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Indian Meal Planner",
    short_name: "Meal Planner",
    description:
      "Plan and prepare delicious South and North Indian meals with personalized recipes and shopping lists",
    start_url: "/",
    display: "standalone",
    background_color: "#fff7ed",
    theme_color: "#f97316",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/icons/icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "/icons/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/icons/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "/icons/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "/icons/icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/icons/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/1.png",
        sizes: "1280x720",
        type: "image/png",
        label: "Home Screen of Indian Meal Planner",
      },
      {
        src: "/screenshots/2.png",
        sizes: "1280x720",
        type: "image/png",
        label: "Meal Plan Screen",
      },
      {
        src: "/screenshots/3.png",
        sizes: "1280x720",
        type: "image/png",
        label: "Meal Details Screen",
      },
    ],
    id: "/",
    dir: "ltr",
    lang: "en-US",
    prefer_related_applications: false,
    categories: ["food", "lifestyle", "productivity"],
    scope: "/",
  };
}
