const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken";

export const fetchMeals = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch meals");
    }

    const data = await response.json();

    return data.meals || [];
  } catch (error) {
    throw error;
  }
};
