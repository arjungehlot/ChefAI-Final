import React from "react";
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

  return (
    <header className="fixed top-0 z-50 w-full bg-gradient-to-r from-green-50 to-white backdrop-blur-md border-b border-green-100 shadow-sm">
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
              ChefAI
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`text-gray-700 hover:text-green-600 font-medium transition-colors ${location.pathname === "/" ? "text-green-600" : ""}`}
          >
            Home
          </Link>
          <Link
            to="/recipes"
            className={`text-gray-700 hover:text-green-600 font-medium transition-colors ${location.pathname === "/recipes" ? "text-green-600" : ""}`}
          >
            Recipes
          </Link>
          <Link
            to="/meal-plans"
            className={`text-gray-700 hover:text-green-600 font-medium transition-colors ${location.pathname === "/meal-plans" ? "text-green-600" : ""}`}
          >
            Meal Plans
          </Link>
          <Link
            to="/about"
            className={`text-gray-700 hover:text-green-600 font-medium transition-colors ${location.pathname === "/about" ? "text-green-600" : ""}`}
          >
            About Us
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button
                  variant="ghost"
                  className={`text-sm font-medium hover:text-green-600 hover:bg-green-50 ${location.pathname === "/dashboard" ? "text-green-600 bg-green-50" : ""}`}
                >
                  My Kitchen
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 bg-white rounded-full pl-2 pr-1 py-1 border border-gray-200 hover:border-green-300 cursor-pointer transition-all">
                    <span className="text-sm font-medium text-gray-700">
                      My Account
                    </span>
                    <Avatar className="h-8 w-8 border-2 border-green-100">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                        alt={user.email || ""}
                      />
                      <AvatarFallback className="bg-green-100 text-green-800">
                        {user.email?.[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="rounded-xl border border-green-100 shadow-lg w-56"
                >
                  <DropdownMenuLabel className="text-sm text-gray-700 border-b border-green-50 pb-2">
                    <div className="font-medium">{user.email}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Premium Member
                    </div>
                  </DropdownMenuLabel>
                  <div className="p-2">
                    <DropdownMenuItem className="cursor-pointer rounded-lg hover:bg-green-50 hover:text-green-700">
                      My Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer rounded-lg hover:bg-green-50 hover:text-green-700">
                      My Recipes
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer rounded-lg hover:bg-green-50 hover:text-green-700">
                      Settings
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator className="bg-green-50" />
                  <div className="p-2">
                    <DropdownMenuItem
                      className="cursor-pointer rounded-lg hover:bg-red-50 hover:text-red-600"
                      onSelect={() => signOut()}
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="text-sm font-medium hover:text-green-600 hover:bg-green-50 rounded-lg px-4"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600 text-sm px-5 py-2 shadow-sm hover:shadow transition-all font-medium">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
