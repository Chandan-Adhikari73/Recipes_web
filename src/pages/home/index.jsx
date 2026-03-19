import React, { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipe-item";

export default function Home() {
  const { recipeList, loading } = useContext(GlobalContext);

  return (
    <div className="w-full max-w-screen-xl mx-auto py-12  md:px-10">

      {/* Page Header */}
      <header className="py-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-black">
          Discover Delicious Recipes
        </h1>
        <p className="text-gray-600 mt-2">
          Search for meals, view full instructions, and save your favorites.
        </p>
      </header>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center h-[40vh] text-lg md:text-xl font-semibold text-gray-800">
          Loading... Please wait
        </div>
      )}

      {/* Recipes Grid */}
      {!loading && recipeList?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipeList.map((item) => (
            <RecipeItem key={item.idMeal} item={item} />
          ))}
        </div>
      ) : null}

      {/* No Recipes Message */}
      {!loading && (!recipeList || recipeList.length === 0) && (
        <div className="flex flex-col items-center justify-center mt-20 text-center px-4">
          <p className="text-2xl md:text-4xl font-extrabold text-black">
            Nothing to show
          </p>
          <div className="w-24 h-1 bg-yellow-400 mt-3 rounded-full" />
          <p className="text-gray-600 text-sm md:text-base mt-4">
            Try searching for your favorite recipes above.
          </p>
        </div>
      )}
    </div>
  );
}
