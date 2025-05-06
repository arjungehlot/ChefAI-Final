import { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white text-black">
      {/* Enhanced navigation */}
      <header className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-green-100 shadow-sm">
        <div className="max-w-[1200px] mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chef-hat"
                >
                  <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
                  <line x1="6" x2="18" y1="17" y2="17" />
                </svg>
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
                CheafAI
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/recipes"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Recipes
            </Link>
            <Link
              to="/meal-plans"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Meal Plans
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              About Us
            </Link>
          </nav>
        </div>
      </header>

      <div className="min-h-screen flex items-center justify-center pt-24 pb-12">
        <div className="w-full max-w-md px-4">{children}</div>
      </div>
    </div>
  );
}
