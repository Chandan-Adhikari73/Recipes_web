import React, { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipe-item";

function RecipeList() {
  const { recipeList, loading } = useContext(GlobalContext);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-xl font-semibold text-white">
        Loading... Please wait
      </div>
    );

  return (
    <div className="py-16 container mx-auto px-6 flex flex-wrap justify-center gap-10 min-h-[70vh]">
      {recipeList && recipeList.length > 0 ? (
        recipeList.map((item) => <RecipeItem key={item.id} item={item} />)
      ) : (
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <p className="lg:text-4xl text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            Nothing to show. Please search something
          </p>
          <p className="text-gray-400 text-sm md:text-base">
            Use the search bar above to find delicious recipes.
          </p>
        </div>
      )}
    </div>
  );
}

export default RecipeList;
