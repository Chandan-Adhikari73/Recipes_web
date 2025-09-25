import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context";

function RecipeDetails() {
  const { id } = useParams();
  const {
    recipeDetailsData,
    setRecipeDetailsData,
    favoritesList,
    handleAddToFavorite,
  } = useContext(GlobalContext);

  useEffect(() => {
    async function getRecipeDetails() {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const data = await response.json();
      if (data?.data) {
        setRecipeDetailsData(data.data);
      }
    }
    getRecipeDetails();
  }, [id, setRecipeDetailsData]);

  return (
    <div className="container mx-auto py-16 px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-2xl shadow-2xl relative group">
          <img
            src={recipeDetailsData?.recipe?.image_url}
            alt="recipe"
            className="w-full h-full object-cover block rounded-2xl group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <span className="text-sm text-cyan-400 font-semibold uppercase tracking-wider">
          {recipeDetailsData?.recipe?.publisher}
        </span>
        <h3 className="font-bold text-3xl text-white drop-shadow-lg">
          {recipeDetailsData?.recipe?.title}
        </h3>

        <button
          onClick={() => handleAddToFavorite(recipeDetailsData?.recipe)}
          className="px-6 py-3 rounded-xl text-sm uppercase font-semibold tracking-wider shadow-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 transition-colors w-fit"
        >
          {favoritesList?.some(
            (item) => item.id === recipeDetailsData?.recipe?.id
          )
            ? "Remove from Favorites"
            : "Add to Favorites"}
        </button>

        <div>
          <h4 className="text-xl font-semibold text-cyan-300 mb-4">
            Ingredients
          </h4>
          <ul className="flex flex-col gap-3 bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-lg">
            {recipeDetailsData?.recipe?.ingredients?.map((ingredient, index) => (
              <li
                key={index}
                className="flex gap-2 text-white text-base tracking-wide"
              >
                <span className="font-semibold text-cyan-400">
                  {ingredient.quantity || ""} {ingredient.unit || ""}
                </span>
                <span>{ingredient.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
