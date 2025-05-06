import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "../../../supabase/auth";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full bg-gradient-to-r from-green-50 to-white backdrop-blur-md border-b border-green-100 shadow-sm">
      <div className="max-w-[1200px] mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-2 rounded-lg">
            {/* SVG Logo */}
            <svg xmlns="http://www.w3.org/2000/svg" className="lucide lucide-chef-hat" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
              <line x1="6" x2="18" y1="17" y2="17" />
            </svg>
          </div>
          <span className="font-bold text-2xl bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
            ChefAi
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {["/", "/recipes", "/meal-plans", "/about"].map((path, i) => (
            <Link
              key={path}
              to={path}
              className={`text-gray-700 hover:text-green-600 font-medium transition-colors ${
                location.pathname === path ? "text-green-600" : ""
              }`}
            >
              {["Home", "Recipes", "Meal Plans", "About Us"][i]}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons & User Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/dashboard">
                <Button
                  variant="ghost"
                  className={`text-sm font-medium hover:text-green-600 hover:bg-green-50 ${
                    location.pathname === "/dashboard" ? "text-green-600 bg-green-50" : ""
                  }`}
                >
                  My Kitchen
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 bg-white rounded-full pl-2 pr-1 py-1 border border-gray-200 hover:border-green-300 cursor-pointer transition-all">
                    <span className="text-sm font-medium text-gray-700">My Account</span>
                    <Avatar className="h-8 w-8 border-2 border-green-100">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt={user.email || ""} />
                      <AvatarFallback className="bg-green-100 text-green-800">{user.email?.[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-xl border border-green-100 shadow-lg w-56">
                  <DropdownMenuLabel className="text-sm text-gray-700 border-b border-green-50 pb-2">
                    <div className="font-medium">{user.email}</div>
                    <div className="text-xs text-gray-500 mt-1">Premium Member</div>
                  </DropdownMenuLabel>
                  <div className="p-2">
                    <DropdownMenuItem className="hover:bg-green-50 hover:text-green-700">My Profile</DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-green-50 hover:text-green-700">My Recipes</DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-green-50 hover:text-green-700">Settings</DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator className="bg-green-50" />
                  <div className="p-2">
                    <DropdownMenuItem onSelect={() => signOut()} className="hover:bg-red-50 hover:text-red-600">
                      Sign Out
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="text-sm hover:text-green-600 hover:bg-green-50 px-4">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button className="rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600 text-sm px-5 py-2 shadow-sm">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden flex flex-col gap-[5px] items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="w-6 h-[2px] bg-gray-700"></span>
          <span className="w-6 h-[2px] bg-gray-700"></span>
          <span className="w-6 h-[2px] bg-gray-700"></span>
        </button>
      </div>

    {/* Mobile Menu */}
{mobileMenuOpen && (
  <div className="md:hidden px-6 pb-4 p-8 bg-white shadow-lg border-t border-green-100 space-y-4 rounded-lg transition-transform ease-in-out duration-300 transform">
    {["/", "/recipes", "/meal-plans", "/about"].map((path, i) => (
      <Link
        key={path}
        to={path}
        onClick={() => setMobileMenuOpen(false)}
        className={`block text-gray-700 hover:text-green-600 font-medium transition-colors transform hover:scale-105 ${
          location.pathname === path ? "text-green-600 font-semibold" : ""
        }`}
      >
        {["Home", "Recipes", "Meal Plans", "About Us"][i]}
      </Link>
    ))}

    {user ? (
      <>
        <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
          <Button variant="ghost" className="w-full text-left bg-gray-50 hover:bg-green-50 rounded-md text-green-800 shadow-sm transition-colors">
            My Kitchen
          </Button>
        </Link>
        <Button
          variant="ghost"
          onClick={() => signOut()}
          className="w-full text-left text-red-600 hover:bg-red-50 rounded-md transition-colors shadow-sm"
        >
          Sign Out
        </Button>
      </>
    ) : (
      <>
        <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
          <Button variant="ghost" className="w-full text-left bg-gray-50 hover:bg-green-50 rounded-md text-green-800 shadow-sm transition-colors">
            Sign In
          </Button>
        </Link>
        <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
          <Button className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-500 hover:to-green-400 rounded-md shadow-md transition-all">
            Get Started
          </Button>
        </Link>
      </>
    )}
  </div>
)}

    </header>
  );
};

export default Navbar;
