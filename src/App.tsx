import { Suspense } from "react";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import Dashboard from "./components/pages/dashboard";
import Success from "./components/pages/success";
import Home from "./components/pages/home";
import { AuthProvider, useAuth } from "../supabase/auth";
import { Toaster } from "./components/ui/toaster";
import { LoadingScreen, LoadingSpinner } from "./components/ui/loading-spinner";
import AboutPage from "./components/pages/about";
import RecipesPage from "./components/pages/recipes";
import Layout from "./components/layout/Layout";
import MealPlansPage from "./components/pages/meal-plans";
import ContactPage from "./components/pages/contact";
import CareersPage from "./components/pages/careers";
import PricingPage from "./components/pages/pricing";
import VideoDemo from "./components/pages/video-demo";
import QuickRecipeGenerator from "./components/dashboard/QuickRecipeGenerator";
import SmartGroceryList from "./components/dashboard/SmartGroceryList";
import TodayMealPlan from "./components/dashboard/TodayMealPlan";
import NutritionSummary from "./components/dashboard/NutritionSummary";
import AIRecipeGeneratorPreview from "./components/home/AIRecipeGeneratorPreview";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen text="Authenticating..." />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <Layout>
              <LoginForm />
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout>
              <SignUpForm />
            </Layout>
          }
        />
        <Route
          path="/recipe-generator"
          element={
            <Layout>
              <AIRecipeGeneratorPreview />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <AboutPage />
            </Layout>
          }
        />
        <Route
          path="/recipes"
          element={
            <Layout>
              <RecipesPage />
            </Layout>
          }
        />
        <Route
          path="/meal-plans"
          element={
            <Layout>
              <MealPlansPage />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <ContactPage />
            </Layout>
          }
        />
        <Route
          path="/careers"
          element={
            <Layout>
              <CareersPage />
            </Layout>
          }
        />
        <Route
          path="/recipe-generator"
          element={
            <Layout>
              <QuickRecipeGenerator />
            </Layout>
          }
        />
        <Route
          path="/grocery-list"
          element={
            <Layout>
              <SmartGroceryList />
            </Layout>
          }
        />
        <Route
          path="/meal-planner"
          element={
            <Layout>
              <TodayMealPlan />
            </Layout>
          }
        />
        <Route
          path="/nutrition"
          element={
            <Layout>
              <NutritionSummary />
            </Layout>
          }
        />
        <Route
          path="/pricing"
          element={
            <Layout>
              <PricingPage />
            </Layout>
          }
        />
        <Route path="/video-demo" element={<VideoDemo />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/success" element={<Success />} />
      </Routes>
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<LoadingScreen text="Loading application..." />}>
        <AppRoutes />
      </Suspense>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
