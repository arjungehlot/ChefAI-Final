import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Link } from "react-router-dom";

const DAYS_OF_WEEK = [
  {
    day: "Monday",
    meal: "Lemon Garlic Chicken",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&q=80",
    icon: "🍗",
  },
  {
    day: "Tuesday",
    meal: "Vegetable Stir Fry",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=80",
    icon: "🥦",
  },
  {
    day: "Wednesday",
    meal: "Salmon with Asparagus",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&q=80",
    icon: "🐟",
  },
  {
    day: "Thursday",
    meal: "Quinoa Buddha Bowl",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&q=80",
    icon: "🥗",
  },
  {
    day: "Friday",
    meal: "Homemade Pizza",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&q=80",
    icon: "🍕",
  },
  {
    day: "Saturday",
    meal: "Beef Tacos",
    image:
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=300&q=80",
    icon: "🌮",
  },
  {
    day: "Sunday",
    meal: "Pasta Primavera",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=300&q=80",
    icon: "🍝",
  },
];

export default function WeeklyMealPlannerPreview() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Plan Your Week of Meals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Save time and eat healthier with our weekly meal planning tool
          </p>
        </div>

        <div className="relative overflow-x-auto pb-4">
          <div className="flex space-x-4 min-w-max">
            {DAYS_OF_WEEK.map((day, index) => (
              <Card
                key={index}
                className="w-40 shadow-md hover:shadow-lg transition-shadow border-0 overflow-hidden flex-shrink-0"
              >
                <div className="relative h-24 overflow-hidden">
                  <img
                    src={day.image}
                    alt={day.meal}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                    <span className="text-white font-medium text-sm">
                      {day.day}
                    </span>
                  </div>
                </div>
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{day.icon}</span>
                    <span className="text-sm font-medium text-gray-800 line-clamp-2">
                      {day.meal}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Gradient fade effect on the right side */}
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/meal-plans">
            <Button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-lg px-6 py-2 text-lg font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-2">
              Plan Your Week
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
