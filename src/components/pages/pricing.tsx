import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../supabase/auth";

export default function PricingPage() {
  const { user } = useAuth();

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out ChefAi",
      features: [
        "5 recipe generations per day",
        "Basic ingredient substitutions",
        "Standard recipe collection",
        "Email support",
      ],
      buttonText: user ? "Current Plan" : "Get Started",
      buttonVariant: "outline",
      popular: false,
    },
    {
      name: "Premium",
      price: "$9.99",
      period: "per month",
      description: "For cooking enthusiasts",
      features: [
        "Unlimited recipe generations",
        "Advanced ingredient substitutions",
        "Expanded recipe collection",
        "Weekly meal planning",
        "Nutritional information",
        "Priority email support",
      ],
      buttonText: "Subscribe",
      buttonVariant: "default",
      popular: true,
    },
    {
      name: "Family",
      price: "$19.99",
      period: "per month",
      description: "For households and families",
      features: [
        "Everything in Premium",
        "Up to 5 user profiles",
        "Family meal planning",
        "Dietary preference management",
        "Shopping list integration",
        "24/7 priority support",
      ],
      buttonText: "Subscribe",
      buttonVariant: "outline",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header is included in the App layout */}

      <main className="pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that's right for you and start cooking smarter
              today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 border ${plan.popular ? "border-green-300 shadow-lg shadow-green-100" : "border-gray-200"} relative`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-gradient-to-r from-green-600 to-green-500 text-white text-sm font-medium px-4 py-1 rounded-full shadow-md">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {plan.name}
                  </h2>
                  <div className="mt-4 flex items-baseline justify-center">
                    <span className="text-4xl font-extrabold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="ml-1 text-xl font-medium text-gray-500">
                      {plan.period}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600">{plan.description}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-gray-600">{feature}</p>
                    </li>
                  ))}
                </ul>
                <div className="text-center">
                  <Link to={user ? "/dashboard" : "/signup"}>
                    <Button
                      variant={
                        plan.buttonVariant === "outline" ? "outline" : "default"
                      }
                      className={`w-full py-2 ${plan.buttonVariant === "outline" ? "border-green-200 text-green-700 hover:bg-green-50" : "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white"}`}
                    >
                      {plan.buttonText}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-semibold mb-4">
                  Enterprise Solutions
                </h2>
                <p className="text-gray-600 mb-6">
                  Looking for a custom solution for your business? We offer
                  enterprise plans with additional features, dedicated support,
                  and custom integrations.
                </p>
                <Link to="/contact">
                  <Button className="bg-white text-green-600 hover:bg-green-50 border border-green-200">
                    Contact Sales
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Custom AI Training
                  </h3>
                  <p className="text-sm text-gray-600">
                    Train our AI on your specific recipes and ingredients.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-2">API Access</h3>
                  <p className="text-sm text-gray-600">
                    Integrate our recipe generation into your own applications.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Dedicated Support
                  </h3>
                  <p className="text-sm text-gray-600">
                    Get a dedicated account manager and priority support.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Custom Branding
                  </h3>
                  <p className="text-sm text-gray-600">
                    White-label solutions for your business needs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Can I change plans at any time?
                </h3>
                <p className="text-gray-600">
                  Yes, you can upgrade, downgrade, or cancel your subscription
                  at any time from your account settings.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Is there a free trial for paid plans?
                </h3>
                <p className="text-gray-600">
                  Yes, we offer a 14-day free trial for both Premium and Family
                  plans. No credit card required.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  How does family sharing work?
                </h3>
                <p className="text-gray-600">
                  With the Family plan, you can invite up to 4 additional users
                  who will each get their own profile with personalized
                  preferences.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Can I get a refund if I'm not satisfied?
                </h3>
                <p className="text-gray-600">
                  We offer a 30-day money-back guarantee if you're not
                  completely satisfied with your paid subscription.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Do you offer discounts for annual billing?
                </h3>
                <p className="text-gray-600">
                  Yes, you can save 20% by choosing annual billing on any of our
                  paid plans.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-600">
                  We accept all major credit cards, PayPal, and Apple Pay for
                  subscription payments.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Ready to transform your cooking experience?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of happy users who are cooking smarter with
              ChefAi.
            </p>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-8 py-2 text-lg">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
