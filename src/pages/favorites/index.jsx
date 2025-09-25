import React, { useContext } from "react";
import RecipeItem from "../../components/recipe-item";
import { GlobalContext } from "../../context";

function Favorites() {
  const { favoritesList } = useContext(GlobalContext);

  return (
    <div className="py-16 container mx-auto px-6 flex flex-wrap justify-center gap-10 min-h-[70vh]">
      {favoritesList && favoritesList.length > 0 ? (
        favoritesList.map((item) => (
          <RecipeItem key={item.id} item={item} />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <p className="lg:text-4xl text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            Nothing is added in favorites
          </p>
          <p className="text-gray-500 text-sm md:text-base">
            Search and add some delicious recipes to your favorites list.
          </p>
        </div>
      )}
    </div>
  );
}

export default Favorites;
