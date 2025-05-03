import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "../../../supabase/auth";
import { Link } from "react-router-dom";

export default function MealPlansPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Header is included in the App layout */}

      <main className="pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Meal Planning
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Plan your meals for the week with our AI-powered meal planning
              tool. Save time, reduce food waste, and eat healthier.
            </p>
          </div>

          {user ? (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <Tabs defaultValue="weekly" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="weekly">Weekly Plan</TabsTrigger>
                  <TabsTrigger value="templates">Plan Templates</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="weekly" className="space-y-6">
                  <div className="grid grid-cols-7 gap-4">
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ].map((day) => (
                      <div
                        key={day}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <h3 className="font-medium text-gray-800 mb-2">
                          {day}
                        </h3>
                        <div className="space-y-3">
                          <div className="bg-green-50 p-2 rounded-md">
                            <span className="text-xs font-medium text-gray-500 block">
                              Breakfast
                            </span>
                            <span className="text-sm text-gray-800">
                              Greek Yogurt Bowl
                            </span>
                          </div>
                          <div className="bg-blue-50 p-2 rounded-md">
                            <span className="text-xs font-medium text-gray-500 block">
                              Lunch
                            </span>
                            <span className="text-sm text-gray-800">
                              Quinoa Salad
                            </span>
                          </div>
                          <div className="bg-purple-50 p-2 rounded-md">
                            <span className="text-xs font-medium text-gray-500 block">
                              Dinner
                            </span>
                            <span className="text-sm text-gray-800">
                              Grilled Salmon
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center gap-4 mt-6">
                    <Button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600">
                      Generate New Plan
                    </Button>
                    <Button
                      variant="outline"
                      className="border-green-200 text-green-700 hover:bg-green-50"
                    >
                      Export Plan
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="templates" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      "Keto Week",
                      "Vegetarian Basics",
                      "High Protein",
                      "Family Friendly",
                      "Budget Meals",
                      "Quick & Easy",
                    ].map((template) => (
                      <div
                        key={template}
                        className="border border-gray-200 rounded-lg p-4 hover:border-green-300 hover:shadow-md transition-all cursor-pointer"
                      >
                        <h3 className="font-medium text-gray-800 mb-2">
                          {template}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          A curated meal plan focused on{" "}
                          {template.toLowerCase()} recipes.
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-green-200 text-green-700 hover:bg-green-50"
                        >
                          Use Template
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="history" className="space-y-6">
                  <div className="space-y-4">
                    {[
                      "May 1-7, 2023",
                      "April 24-30, 2023",
                      "April 17-23, 2023",
                    ].map((week) => (
                      <div
                        key={week}
                        className="border border-gray-200 rounded-lg p-4 hover:border-green-300 hover:shadow-md transition-all"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-gray-800">{week}</h3>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-green-200 text-green-700 hover:bg-green-50"
                            >
                              View
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-green-200 text-green-700 hover:bg-green-50"
                            >
                              Reuse
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 text-center shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">
                Sign in to create your meal plan
              </h2>
              <p className="text-gray-600 mb-6">
                Create an account to generate personalized meal plans based on
                your preferences and dietary needs.
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="border-green-200 text-green-700 hover:bg-green-50"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600">
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
          )}

          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-center mb-8">
              Benefits of Meal Planning
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Save Time</h3>
                <p className="text-gray-600">
                  Plan once and shop once for the entire week. No more daily
                  decisions about what to cook.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Eat Healthier</h3>
                <p className="text-gray-600">
                  Make balanced nutrition choices in advance instead of
                  impulsive decisions when hungry.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Reduce Food Waste</h3>
                <p className="text-gray-600">
                  Buy only what you need and use ingredients across multiple
                  meals to minimize waste.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
