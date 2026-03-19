import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context";

export default function Navbar() {
  const { searchParam, setSearchParam, handleSubmit } = useContext(GlobalContext);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center py-4">
        <h2 className="text-2xl font-extrabold tracking-wide text-black">
          <NavLink to="/">Italian<span className="text-yellow-500">Recipe</span></NavLink>
        </h2>

        <form onSubmit={handleSubmit} className="flex-1 max-w-md mx-6 hidden md:flex">
          <input
            type="text"
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
            placeholder="Search Italian recipes..."
            className="flex-1 bg-gray-100 text-gray-800 placeholder-gray-500 p-3 px-5 rounded-full border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
          />
        </form>

        <ul className="flex gap-6 items-center text-black font-medium text-sm">
          <li>
            <NavLink to="/" className={({ isActive }) => `hover:text-yellow-500 transition-colors ${isActive ? "text-yellow-500 font-semibold" : "text-black"}`}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/favorites" className={({ isActive }) => `hover:text-yellow-500 transition-colors ${isActive ? "text-yellow-500 font-semibold" : "text-black"}`}>
              Favorites
            </NavLink>
          </li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="px-6 pb-3 md:hidden">
        <input
          type="text"
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          placeholder="Search Italian recipes..."
          className="w-full bg-gray-100 text-gray-800 placeholder-gray-500 p-3 px-5 rounded-full border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
        />
      </form>
    </nav>
  );
}
