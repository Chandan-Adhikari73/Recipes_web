import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context";

function Navbar() {
  const { searchParam, setSearchParam, handleSubmit } = useContext(GlobalContext);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-gradient-to-r from-black/60 via-gray-900/40 to-black/60 backdrop-blur-xl shadow-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center py-4">
        <h2 className="text-2xl font-extrabold text-cyan-400 tracking-wide hover:text-cyan-300 transition-colors">
          <NavLink to="/">FoodRecipe</NavLink>
        </h2>

        <form onSubmit={handleSubmit} className="flex-1 max-w-md mx-6 hidden md:flex">
          <input
            type="text"
            name="search"
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
            placeholder="Enter items..."
            className="flex-1 bg-white/20 text-white placeholder-gray-300 p-3 px-6 rounded-full outline-none shadow-inner shadow-black/30 focus:ring-2 focus:ring-cyan-400 transition-all"
          />
        </form>

        <ul className="flex gap-6 items-center text-white font-medium text-sm">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-cyan-400 transition-colors ${
                  isActive ? "text-cyan-300" : "text-white"
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `hover:text-cyan-400 transition-colors ${
                  isActive ? "text-cyan-300" : "text-white"
                }`
              }
            >
              Favorites
            </NavLink>
          </li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="px-6 pb-3 md:hidden">
        <input
          type="text"
          name="search"
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          placeholder="Enter items..."
          className="w-full bg-white/20 text-white placeholder-gray-300 p-3 px-6 rounded-full outline-none shadow-inner shadow-black/30 focus:ring-2 focus:ring-cyan-400 transition-all"
        />
      </form>
    </nav>
  );
}

export default Navbar;
