import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "../../../supabase/auth";

interface PersonalizedWelcomeProps {
  dietaryPreference?: string;
  goal?: string;
  dailyTip?: string;
}

const defaultTips = [
  "Try adding more fiber to your diet today.",
  "Stay hydrated! Aim for 8 glasses of water.",
  "Include a colorful vegetable in your next meal.",
  "Try a new spice in your cooking today.",
  "Consider meal prepping to save time this week.",
];

const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Morning";
  if (hour < 18) return "Afternoon";
  return "Evening";
};

const getRandomTip = () => {
  return defaultTips[Math.floor(Math.random() * defaultTips.length)];
};

const PersonalizedWelcome = ({
  dietaryPreference = "Balanced",
  goal = "Healthy eating",
  dailyTip = getRandomTip(),
}: PersonalizedWelcomeProps) => {
  const { user } = useAuth();
  const userName = user?.email?.split("@")[0] || "Chef";
  const timeOfDay = getTimeOfDay();

  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm overflow-hidden col-span-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900">
              Good {timeOfDay}, {userName} 👋
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                {dietaryPreference}
              </span>
              <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full">
                {goal}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              <span className="font-medium">Today's Tip:</span> {dailyTip}
            </p>
          </div>
          <Avatar className="h-16 w-16 border-2 border-white shadow-md">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || "default"}`}
              alt={userName}
            />
            <AvatarFallback className="bg-blue-100 text-blue-800 text-xl font-medium">
              {userName[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalizedWelcome;
