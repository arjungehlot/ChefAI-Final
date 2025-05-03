import React from "react";
import PersonalizedWelcome from "./PersonalizedWelcome";
import TodayMealPlan from "./TodayMealPlan";

const DashboardGrid = () => {
  return (
    <div>
      <PersonalizedWelcome
        dietaryPreference="Vegetarian"
        goal="Weight management"
      />
    </div>
  );
};

export default DashboardGrid;
