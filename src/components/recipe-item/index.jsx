import React from "react";
import { Link } from "react-router-dom";

function RecipeCard({ item }) {
  const imageUrl = item?.image_url
    ? item.image_url.replace("http://", "https://")
    : "/images/default.jpg"; // fallback image from public folder

  return (
    <div className="group flex flex-col w-80 overflow-hidden p-5 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-xl shadow-2xl gap-5 border border-white/40 rounded-2xl hover:scale-105 transition-transform duration-300">
      <div className="h-44 flex justify-center overflow-hidden items-center rounded-xl relative">
        <img
          src={imageUrl}
          alt={item?.title || "recipe item"}
          className="block w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-cyan-400 font-semibold tracking-wide">
          {item?.publisher || "Unknown Publisher"}
        </span>
        <h3 className="font-bold text-xl text-white truncate group-hover:text-cyan-300 transition-colors">
          {item?.title || "No Title"}
        </h3>
        <Link
          to={`/recipe-item/${item?.id}`}
          className="text-sm py-2 px-6 mt-3 rounded-lg uppercase font-medium tracking-wider inline-block shadow-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 transition-colors"
        >
          Recipe Details
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard;
