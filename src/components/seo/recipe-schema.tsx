"use client";

interface RecipeSchemaProps {
  name: string;
  description: string;
  image: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  keywords: string[];
  ingredients: string[];
  instructions: string[];
  cuisine: string;
  category: string;
  author: string;
  datePublished: string;
  url: string;
}

export function RecipeSchema({
  name,
  description,
  image,
  prepTime,
  cookTime,
  totalTime,
  keywords,
  ingredients,
  instructions,
  cuisine,
  category,
  author,
  datePublished,
  url,
}: RecipeSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name,
    description,
    image,
    prepTime: `PT${prepTime.replace(/\D/g, "")}M`,
    cookTime: `PT${cookTime.replace(/\D/g, "")}M`,
    totalTime: `PT${totalTime.replace(/\D/g, "")}M`,
    keywords: keywords.join(", "),
    recipeIngredient: ingredients,
    recipeInstructions: instructions.map((step, index) => ({
      "@type": "HowToStep",
      text: step,
      position: index + 1,
    })),
    recipeCuisine: cuisine,
    recipeCategory: category,
    author: {
      "@type": "Person",
      name: author,
    },
    datePublished,
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
