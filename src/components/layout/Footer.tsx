import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-green-50 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
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
                >
                  <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
                  <line x1="6" x2="18" y1="17" y2="17" />
                </svg>
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
                ChefAi
              </span>
            </div>
            <p className="text-gray-600 mb-6 max-w-md">
              Transform your kitchen experience with AI-powered recipe
              generation based on ingredients you already have.
            </p>
            <div className="flex space-x-4">
              <a
                href="/"
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="/"
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a
                href="/"
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-5">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/recipes"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Recipes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-5">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/recipes"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Recipe Database
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Nutrition Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Cooking Tips
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-5">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 mb-4 md:mb-0">
            © 2024 ChefAi. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              to="/"
              className="text-gray-600 hover:text-green-600 transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              to="/"
              className="text-gray-600 hover:text-green-600 transition-colors text-sm"
            >
              Terms of Service
            </Link>
            <Link
              to="/"
              className="text-gray-600 hover:text-green-600 transition-colors text-sm"
            >
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
