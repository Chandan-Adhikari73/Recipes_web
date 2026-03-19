import React, { createContext, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

function GlobalProvider({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favoritesList, setFavoritesList] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // ------------------------------------------------------------
  // 🔥 Load TOP 6 Italian Recipes when website starts
  // ------------------------------------------------------------
  useEffect(() => {
    async function loadItalian() {
      try {
        setLoading(true);
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian"
        );

        const data = await res.json();

        if (data?.meals) {
          // Take ONLY the first 6 meals
          setRecipeList(data.meals.slice(0, 6));
        }
      } finally {
        setLoading(false);
      }
    }

    loadItalian();
  }, []);

  // ------------------------------------------------------------
  // 🔍 Search recipes
  // ------------------------------------------------------------
  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (!searchParam.trim()) {
        setMessage("Please enter a recipe name.");
        return;
      }

      try {
        setLoading(true);
        setMessage("");

        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchParam}`
        );

        const data = await res.json();

        if (data?.meals) {
          setRecipeList(data.meals);
          navigate("/");
        } else {
          setRecipeList([]);
          setMessage("No recipes found.");
        }
      } catch (error) {
        console.error(error);
        setMessage("Something went wrong.");
      } finally {
        setLoading(false);
        setSearchParam("");
      }
    },
    [searchParam, navigate]
  );

  // ------------------------------------------------------------
  // 🍽 Fetch FULL recipe details using ID
  // ------------------------------------------------------------
  const fetchRecipeDetails = useCallback(async (id) => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );

      const data = await res.json();

      if (data?.meals?.length > 0) {
        setRecipeDetailsData(data.meals[0]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // ------------------------------------------------------------
  // ❤️ Add/remove favorites
  // ------------------------------------------------------------
  const handleAddToFavorite = useCallback((recipe) => {
    setFavoritesList((prev) => {
      const exists = prev.find((i) => i.idMeal === recipe.idMeal);

      return exists
        ? prev.filter((i) => i.idMeal !== recipe.idMeal)
        : [...prev, recipe];
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        loading,
        recipeList,
        handleSubmit,
        fetchRecipeDetails,
        recipeDetailsData,
        favoritesList,
        handleAddToFavorite,
        message,
        setMessage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;
