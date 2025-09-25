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
          <p className="lg:text-5xl text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-text">
            Nothing is added in favorites
          </p>
          <p className="text-gray-400 text-sm md:text-base max-w-md">
            Search and add some delicious recipes to your favorites list. All your favorite recipes will appear here with full details.
          </p>
        </div>
      )}
    </div>
  );
}

export default Favorites;
