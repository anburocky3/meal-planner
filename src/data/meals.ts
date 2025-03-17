interface Meal {
  id: string;
  name: string;
  image: string;
  cookingSteps: string[];
  ingredients: string[];
  preparationTime: string;
  cookingTime: string;
  totalTime: string;
}

interface MealCategory {
  breakfast: Meal[];
  lunch: Meal[];
  dinner: Meal[];
  snacks: Meal[];
}

interface CuisineMeals {
  regular: MealCategory;
  vegetarian: MealCategory;
  vegan: MealCategory;
}

export const southIndianMeals: CuisineMeals = {
  regular: {
    breakfast: [
      {
        id: "si-bf-1",
        name: "Idli with Sambar and Chutney",
        image: "/meals/south-indian/idly-sambar.jpg",
        cookingSteps: [
          "Soak rice and urad dal separately for 4-6 hours",
          "Grind them separately to make a smooth batter",
          "Mix the batters and let ferment overnight",
          "Steam in idli molds for 10-12 minutes",
          "Serve hot with sambar and chutney",
        ],
        ingredients: ["Idli Rice", "Urad Dal", "Sambar", "Coconut Chutney"],
        preparationTime: "30 mins",
        cookingTime: "15 mins",
        totalTime: "45 mins",
      },
      {
        id: "si-bf-2",
        name: "Dosa with Potato Masala",
        image: "/meals/south-indian/dosa-potato-masala.jpg",
        cookingSteps: [
          "Prepare dosa batter with rice and urad dal",
          "Make potato masala with onions and spices",
          "Heat tawa and spread batter in circular motion",
          "Add potato masala and fold dosa",
          "Serve hot with chutney",
        ],
        ingredients: ["Dosa Rice", "Urad Dal", "Potatoes", "Onions", "Spices"],
        preparationTime: "20 mins",
        cookingTime: "25 mins",
        totalTime: "45 mins",
      },
      {
        id: "si-bf-3",
        name: "Dosa with sambar",
        image: "/meals/south-indian/dosa-sambar.jpg",
        cookingSteps: [
          "Prepare dosa batter with rice and urad dal",
          "Make sambar with vegetables and dal",
          "Heat tawa and spread batter in circular motion",
          "Add sambar and fold dosa",
          "Serve hot with chutney",
        ],
        ingredients: ["Dosa Rice", "Urad Dal", "Sambar", "Coconut Chutney"],
        preparationTime: "20 mins",
        cookingTime: "25 mins",
        totalTime: "45 mins",
      },
      {
        id: "si-bf-4",
        name: "Poori with kelangu",
        image: "/meals/south-indian/poori-kelangu.jpg",
        cookingSteps: [
          "Prepare poori batter with rice and urad dal",
          "Make kelangu with vegetables and dal",
          "Heat tawa and spread batter in circular motion",
          "Add kelangu and fold poori",
          "Serve hot with chutney",
        ],
        ingredients: [
          "Flour",
          "Potato",
          "Urad Dal",
          "Kelangu",
          "Coconut Chutney",
        ],
        preparationTime: "20 mins",
        cookingTime: "25 mins",
        totalTime: "45 mins",
      },
      {
        id: "si-bf-5",
        name: "Pongal with sambar",
        image: "/meals/south-indian/pongal.jpg",
        cookingSteps: [
          "Prepare pongal with rice and urad dal",
          "Make sambar with vegetables and dal",
          "Heat tawa and spread batter in circular motion",
          "Add sambar and fold pongal",
          "Serve hot with chutney",
        ],
        ingredients: ["Rice", "Urad Dal", "Sambar", "Coconut Chutney"],
        preparationTime: "20 mins",
        cookingTime: "25 mins",
        totalTime: "45 mins",
      },
      {
        id: "si-bf-6",
        name: "Idiyappam with sambar",
        image: "/meals/south-indian/idiyappam.jpg",
        cookingSteps: [
          "Prepare idiyappam with rice and urad dal",
          "Make sambar with vegetables and dal",
          "Heat tawa and spread batter in circular motion",
          "Add sambar and fold idiyappam",
          "Serve hot with chutney",
        ],
        ingredients: ["Rice", "Urad Dal", "Sambar", "Coconut Chutney"],
        preparationTime: "20 mins",
        cookingTime: "25 mins",
        totalTime: "45 mins",
      },
      // Add more breakfast items...
    ],
    lunch: [
      {
        id: "si-ln-1",
        name: "Rice with Sambar, Rasam and Poriyal",
        image: "/meals/south-indian/rice-with-sambar-rasam-poriyal.jpeg",
        cookingSteps: [
          "Cook rice in pressure cooker",
          "Prepare sambar with vegetables and dal",
          "Make rasam with tomatoes and spices",
          "Cook poriyal with vegetables",
          "Serve all together with papad",
        ],
        ingredients: [
          "Rice",
          "Toor Dal",
          "Mixed Vegetables",
          "Sambar Powder",
          "Rasam Powder",
        ],
        preparationTime: "30 mins",
        cookingTime: "40 mins",
        totalTime: "70 mins",
      },
      {
        id: "si-ln-2",
        name: "Pulikulambu, Potato Roast, Cabbage Thoran & Keerai Kootu",
        image: "/meals/south-indian/lunch-pulikulambu.jpg",
        cookingSteps: [
          "Pulikulambu ( You can try my Brinjal Pulikulambu or Karunai Kilangu Pulikulambu)",
          "Potato Roast",
          "Cabbage Stir fry with Coconut",
          "Homemade Curd",
        ],
        ingredients: [
          "Pulikulambu",
          "Potato Roast",
          "Cabbage Thoran",
          "Keerai Kootu",
          "Coconuts",
        ],
        preparationTime: "30 mins",
        cookingTime: "40 mins",
        totalTime: "70 mins",
      },
      {
        id: "si-ln-3",
        name: "Vendaikai Pulikari, Kovakkai Poriyal, Papali Thoran, Green Gram Thogayal & Kilangu Kootu",
        image: "/meals/south-indian/lunch-vendaikai-pulikari.jpg",
        cookingSteps: [
          "Vendaikai Pulikari",
          "Kilangu kootu",
          "Papali Thoran",
          "Kovakkai Poriyal",
          "Green Gram Thogayal",
          "Homemade Curd",
        ],
        ingredients: [
          "Vendaikai Pulikari",
          "Kovakkai Poriyal",
          "Papali Thoran",
          "Green Gram Thogayal",
          "Kilangu Kootu",
        ],
        preparationTime: "30 mins",
        cookingTime: "40 mins",
        totalTime: "70 mins",
      },
      {
        id: "si-ln-4",
        name: "Malli Rasam, Potato Capsicum Poriyal, Siru Kizhangu Poriyal",
        image: "/meals/south-indian/lunch-malli-rasam.jpg",
        cookingSteps: [
          "Malli Rasam",
          "Capsicum Potato Poriyal",
          "Siru Kizhangu Poriyal",
          "Homemade Curd",
        ],
        ingredients: [
          "Malli Rasam",
          "Capsicum Potato Poriyal",
          "Siru Kizhangu Poriyal",
          "Homemade Curd",
        ],
        preparationTime: "30 mins",
        cookingTime: "40 mins",
        totalTime: "70 mins",
      },
      // Add more lunch items...
    ],
    dinner: [
      {
        id: "si-dn-1",
        name: "Chapati with Vegetable Kurma",
        image: "/meals/south-indian/chapati-vegetable-kurma.jpg",
        cookingSteps: [
          "Knead wheat flour dough",
          "Roll out chapatis",
          "Cook on tawa with ghee",
          "Prepare vegetable kurma with coconut milk",
          "Serve hot with kurma",
        ],
        ingredients: [
          "Wheat Flour",
          "Mixed Vegetables",
          "Coconut Milk",
          "Spices",
        ],
        preparationTime: "25 mins",
        cookingTime: "30 mins",
        totalTime: "55 mins",
      },
      {
        id: "si-dn-2",
        name: "Semiya Upma",
        image: "/meals/south-indian/semiya-upma.jpeg",
        cookingSteps: [
          "Soak semiya in water for 1 hour",
          "Mix with curd and spices",
          "Cook on tawa with ghee",
          "Serve hot with curd",
        ],
        ingredients: ["Semiya", "Curd", "Spices"],
        preparationTime: "25 mins",
        cookingTime: "30 mins",
        totalTime: "55 mins",
      },
      // Add more dinner items...
    ],
    snacks: [
      {
        id: "si-sn-1",
        name: "Murukku",
        image: "/meals/south-indian/murukku.jpg",
        cookingSteps: [
          "Mix rice flour and urad dal flour",
          "Add spices and water to make dough",
          "Shape using murukku press",
          "Deep fry until golden brown",
          "Cool and store in airtight container",
        ],
        ingredients: [
          "Rice Flour",
          "Urad Dal Flour",
          "Cumin Seeds",
          "Sesame Seeds",
        ],
        preparationTime: "20 mins",
        cookingTime: "25 mins",
        totalTime: "45 mins",
      },
      {
        id: "si-sn-2",
        name: "Vazhakkai bajji",
        image: "/meals/south-indian/vazhakkai-bajji.jpg",
        cookingSteps: [
          "Mix rice flour and urad dal flour",
          "Add spices and water to make dough",
          "Shape using murukku press",
          "Deep fry until golden brown",
          "Cool and store in airtight container",
        ],
        ingredients: [
          "Rice Flour",
          "Urad Dal Flour",
          "Cumin Seeds",
          "Sesame Seeds",
        ],
        preparationTime: "20 mins",
        cookingTime: "25 mins",
        totalTime: "45 mins",
      },
      // Add more snacks...
    ],
  },
  vegetarian: {
    // Similar structure as regular but with vegetarian options
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  },
  vegan: {
    // Similar structure as regular but with vegan options
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  },
};

export const northIndianMeals: CuisineMeals = {
  regular: {
    breakfast: [
      {
        id: "ni-bf-1",
        name: "Aloo Paratha with Curd",
        image:
          "https://images.unsplash.com/photo-1568717099338-55a926f2d4d1?w=800&auto=format&fit=crop&q=60",
        cookingSteps: [
          "Boil and mash potatoes with spices",
          "Knead wheat flour dough",
          "Stuff dough with potato mixture",
          "Roll out and cook on tawa",
          "Serve hot with curd and pickle",
        ],
        ingredients: ["Wheat Flour", "Potatoes", "Spices", "Curd", "Ghee"],
        preparationTime: "25 mins",
        cookingTime: "20 mins",
        totalTime: "45 mins",
      },
      // Add more breakfast items...
    ],
    lunch: [
      {
        id: "ni-ln-1",
        name: "Dal Makhani with Jeera Rice",
        image:
          "https://images.unsplash.com/photo-1585937421612-70a008356c36?w=800&auto=format&fit=crop&q=60",
        cookingSteps: [
          "Soak black dal overnight",
          "Cook dal with spices and cream",
          "Prepare jeera rice",
          "Garnish with butter and cream",
          "Serve hot with onion rings",
        ],
        ingredients: ["Black Dal", "Rice", "Cumin Seeds", "Cream", "Butter"],
        preparationTime: "20 mins",
        cookingTime: "45 mins",
        totalTime: "65 mins",
      },
      // Add more lunch items...
    ],
    dinner: [
      {
        id: "ni-dn-1",
        name: "Roti with Paneer Curry",
        image:
          "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&auto=format&fit=crop&q=60",
        cookingSteps: [
          "Knead wheat flour dough",
          "Roll out rotis",
          "Cook on tawa",
          "Prepare paneer curry with gravy",
          "Serve hot with roti",
        ],
        ingredients: ["Wheat Flour", "Paneer", "Onions", "Tomatoes", "Spices"],
        preparationTime: "30 mins",
        cookingTime: "25 mins",
        totalTime: "55 mins",
      },
      // Add more dinner items...
    ],
    snacks: [
      {
        id: "ni-sn-1",
        name: "Samosa with Chutney",
        image:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=60",
        cookingSteps: [
          "Prepare dough with flour and oil",
          "Make potato-pea filling",
          "Shape samosas",
          "Deep fry until golden",
          "Serve hot with chutney",
        ],
        ingredients: [
          "All Purpose Flour",
          "Potatoes",
          "Green Peas",
          "Spices",
          "Oil",
        ],
        preparationTime: "35 mins",
        cookingTime: "20 mins",
        totalTime: "55 mins",
      },
      // Add more snacks...
    ],
  },
  vegetarian: {
    // Similar structure as regular but with vegetarian options
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  },
  vegan: {
    // Similar structure as regular but with vegan options
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  },
};

export const generateMealPlan = (cuisine: string, dietType: string) => {
  const meals =
    cuisine === "south-indian"
      ? southIndianMeals[dietType as keyof typeof southIndianMeals] ||
        southIndianMeals.regular
      : northIndianMeals[dietType as keyof typeof northIndianMeals] ||
        northIndianMeals.regular;

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return days.map((day, index) => ({
    day,
    breakfast: meals.breakfast[index % meals.breakfast.length],
    lunch: meals.lunch[index % meals.lunch.length],
    dinner: meals.dinner[index % meals.dinner.length],
    snack: meals.snacks[index % meals.snacks.length],
  }));
};
