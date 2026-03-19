import React from "react";
import { Link } from "react-router-dom";

function decodeHTML(str = "") {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

// This component is used as <RecipeItem item={item} />
export default function RecipeItem({ item }) {
  const imageUrl = item?.strMealThumb ? item.strMealThumb : "/images/default.jpg";

  return (
    <div className="group flex flex-col w-80 overflow-hidden p-5 bg-white border border-gray-200 shadow-md rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="h-44 flex justify-center items-center overflow-hidden rounded-xl relative bg-gray-100">
        <img
          src={imageUrl}
          alt={decodeHTML(item?.strMeal || "Recipe")}
          className="block w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      <div className="flex flex-col gap-2 mt-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
          {decodeHTML(item?.strCategory || item?.strArea) || "Italian Recipe"}
        </span>

        <h3 className="font-bold text-xl text-black truncate group-hover:text-yellow-500 transition-colors">
          {decodeHTML(item?.strMeal) || "No Title"}
        </h3>

        <Link
          to={`/recipe-item/${item?.idMeal}`}
          className="text-sm py-2 px-5 mt-3 rounded-lg uppercase font-medium tracking-wide inline-block
            bg-yellow-500 text-black hover:bg-yellow-400
            border border-yellow-500 hover:border-yellow-400
            transition-all shadow-sm"
        >
          Recipe Details
        </Link>
      </div>
    </div>
  );
}
