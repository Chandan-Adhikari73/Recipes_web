import React, { createContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

function GlobalProvider({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favoritesList, setFavoritesList] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!searchParam.trim()) {
        alert("Please enter a recipe name");
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
        );
        const data = await res.json();

        if (data?.data?.recipes?.length) {
          setRecipeList(data.data.recipes);
          navigate("/");
        } else {
          alert("No recipes found. Try another search.");
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
        alert("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
        setSearchParam("");
      }
    },
    [searchParam, navigate]
  );

  const handleAddToFavorite = useCallback(
    (recipe) => {
      setFavoritesList((prev) => {
        const exists = prev.find((item) => item.id === recipe.id);
        if (exists) {
          return prev.filter((item) => item.id !== recipe.id);
        }
        return [...prev, recipe];
      });
    },
    []
  );

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        loading,
        recipeList,
        handleSubmit,
        recipeDetailsData,
        setRecipeDetailsData,
        handleAddToFavorite,
        favoritesList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;
