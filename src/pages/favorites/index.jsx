import React, { useContext } from "react";
import RecipeItem from "../../components/recipe-item";
import { GlobalContext } from "../../context";

export default function Favorites() {
  const { favoritesList } = useContext(GlobalContext);

  return (
    <div className="w-full max-w-6xl mx-auto py-16 px-4 md:px-6 min-h-[70vh]">
      {favoritesList && favoritesList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoritesList.map((item) => (
            <RecipeItem key={item.idMeal} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center mt-20 px-4">
          <p className="text-3xl md:text-5xl font-extrabold text-black">No Favorites Added</p>
          <div className="w-28 h-1 bg-yellow-400 mt-3 rounded-full" />
          <p className="text-gray-600 text-sm md:text-base max-w-md mt-5">
            Search and add delicious recipes to your favorites. All your saved recipes will appear here with full details.
          </p>
        </div>
      )}
    </div>
  );
}
