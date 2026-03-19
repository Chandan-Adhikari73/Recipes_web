import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context";

function decodeHTML(str = "") {
  const txt = document.createElement("textarea");
  txt.innerHTML = str || "";
  return txt.value;
}

export default function RecipeDetails() {
  const { id } = useParams();
  const { recipeDetailsData, fetchRecipeDetails, favoritesList, handleAddToFavorite } =
    useContext(GlobalContext);

  useEffect(() => {
    if (id) fetchRecipeDetails(id);
  }, [id, fetchRecipeDetails]);

  const recipe = recipeDetailsData;
  if (!recipe) {
    return (
      <div className="w-full max-w-screen-xl mx-auto py-16 px-4 md:px-8">
        <div className="text-center text-gray-600">No recipe selected.</div>
      </div>
    );
  }

  const imageUrl = recipe.strMealThumb || "/images/default.jpg";
  const isFavorite = favoritesList?.some((it) => it.idMeal === recipe.idMeal);

  // Build ingredient list from TheMealDB fields (strIngredient1..20, strMeasure1..20)
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ing && ing.trim()) {
      ingredients.push(`${measure ? measure.trim() + " " : ""}${ing.trim()}`.trim());
    }
  }

  return (
    <div className="w-full bg-transparent">
      <div className="w-full max-w-screen-xl mx-auto py-16 px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

          {/* Main column: image + title + instructions */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="rounded-2xl overflow-hidden bg-gray-100 shadow-md">
              <img
                src={imageUrl}
                alt={decodeHTML(recipe.strMeal)}
                className="w-full h-96 object-cover"
              />
            </div>

            <div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-black leading-tight">
                    {decodeHTML(recipe.strMeal)}
                  </h1>
                  <p className="text-sm text-gray-600 mt-2">
                    {decodeHTML(recipe.strCategory || recipe.strArea || "")}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleAddToFavorite(recipe)}
                    className={`px-5 py-2 rounded-md text-sm font-semibold transition ${
                      isFavorite
                        ? "bg-yellow-500 text-black hover:bg-yellow-400"
                        : "bg-black text-white hover:bg-gray-800"
                    }`}
                  >
                    {isFavorite ? "Remove Favorite" : "Add to Favorites"}
                  </button>

                  {recipe.strSource && (
                    <a
                      href={recipe.strSource}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm px-4 py-2 border rounded-md bg-white text-black hover:bg-gray-100 transition"
                    >
                      View Source
                    </a>
                  )}
                </div>
              </div>

              {/* Quick metadata row (optional) */}
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-600">
                {recipe.strTags && (
                  <span className="px-3 py-1 bg-gray-100 rounded-full">{recipe.strTags}</span>
                )}
                {recipe.strArea && <span className="px-3 py-1 bg-gray-100 rounded-full">{recipe.strArea}</span>}
                {recipe.strCategory && <span className="px-3 py-1 bg-gray-100 rounded-full">{recipe.strCategory}</span>}
              </div>
            </div>

            {/* Instructions */}
            <div>
              <h3 className="text-xl font-bold text-black mb-4 border-l-4 border-yellow-400 pl-3">
                Instructions
              </h3>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-gray-800 leading-relaxed whitespace-pre-line">
                {decodeHTML(recipe.strInstructions || "No instructions provided.")}
              </div>
            </div>

            {/* Optional Video embed (if YouTube link available) */}
            {recipe.strYoutube && (
              <div>
                <h3 className="text-xl font-bold text-black mb-4 border-l-4 border-yellow-400 pl-3">
                  Video
                </h3>
                <div className="rounded-lg overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      title="recipe-video"
                      src={`https://www.youtube.com/embed/${(recipe.strYoutube || "").split("v=")[1] || ""}`}
                      allowFullScreen
                      className="w-full h-64"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right column: sticky ingredients sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h4 className="text-lg font-semibold text-black mb-3">Ingredients</h4>

                <ul className="flex flex-col gap-2 text-gray-800 text-sm max-h-[60vh] overflow-auto pr-2">
                  {ingredients.map((ing, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-1 text-yellow-500">•</span>
                      <span>{decodeHTML(ing)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* small metadata box below ingredients */}
              <div className="mt-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-sm text-gray-700">
                  {recipe.strArea && (
                    <div className="mb-2"><strong>Area:</strong> {recipe.strArea}</div>
                  )}
                  {recipe.strCategory && (
                    <div className="mb-2"><strong>Category:</strong> {recipe.strCategory}</div>
                  )}
                  {recipe.strTags && (
                    <div className="mb-2"><strong>Tags:</strong> {recipe.strTags}</div>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
