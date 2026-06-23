import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white px-4 sm:px-6 md:px-8 h-16 sm:h-20 flex items-center justify-between shadow-md">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-wide cursor-pointer">
        Job<span className="text-yellow-300">Tracker</span>
      </h1>

      <button
        className="md:hidden flex items-center justify-center w-10 h-10 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(!open)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <div className="hidden md:flex items-center gap-6 lg:gap-8 text-base lg:text-lg font-medium">
        <Link to="/" className="hover:text-yellow-300 transition-colors">Home</Link>
        <Link to="/add-job" className="hover:text-yellow-300 transition-colors">Add Job</Link>
        <Link to="/dashboard" className="hover:text-yellow-300 transition-colors">Dashboard</Link>
      </div>

      {open && (
        <div id="mobile-menu" className="absolute top-16 left-0 right-0 bg-blue-600 flex flex-col items-center gap-4 py-6 md:hidden shadow-lg z-50">
          <Link to="/" className="text-lg font-medium hover:text-yellow-300 transition-colors" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/add-job" className="text-lg font-medium hover:text-yellow-300 transition-colors" onClick={() => setOpen(false)}>Add Job</Link>
          <Link to="/dashboard" className="text-lg font-medium hover:text-yellow-300 transition-colors" onClick={() => setOpen(false)}>Dashboard</Link>
        </div>
      )}
    </nav>
  );
}