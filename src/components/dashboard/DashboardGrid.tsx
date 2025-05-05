import React from "react";
import PersonalizedWelcome from "./PersonalizedWelcome";
import TodayMealPlan from "./TodayMealPlan";

type DashboardGridProps = {
  isLoading: boolean;
};

const DashboardGrid: React.FC<DashboardGridProps> = ({ isLoading }) => {
  if (isLoading) {
    return <p>Loading dashboard grid...</p>;
  }

  return (
    <div>
      <PersonalizedWelcome
        dietaryPreference="Vegetarian"
        goal="Weight management"
      />
      <TodayMealPlan />
    </div>
  );
};

export default DashboardGrid;
