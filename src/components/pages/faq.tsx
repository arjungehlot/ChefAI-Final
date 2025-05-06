import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function FAQPage() {
  const faqs = [
    {
      question: "What is ChefAi?",
      answer:
        "ChefAi is an AI-powered recipe generator that creates personalized recipes based on the ingredients you have available, your dietary preferences, and nutritional goals. Our platform helps you reduce food waste, eat healthier, and discover new delicious meals.",
    },
    {
      question: "How does the recipe generator work?",
      answer:
        "Our recipe generator uses advanced AI algorithms to analyze the ingredients you input, along with your dietary preferences and nutritional goals. It then searches through thousands of recipe patterns to create a personalized recipe that maximizes the use of your available ingredients while meeting your specific requirements.",
    },
    {
      question: "Is ChefAi free to use?",
      answer:
        "ChefAi offers a free plan that allows you to generate up to 5 recipes per day. For unlimited recipe generation, advanced features, and meal planning capabilities, we offer Premium and Family subscription plans. Visit our Pricing page for more details.",
    },
    {
      question: "Can I save recipes for later?",
      answer:
        "Yes! When you create an account, you can save any generated recipe to your personal collection for easy access later. Premium users can organize recipes into custom collections and add notes.",
    },
    {
      question: "How accurate is the nutritional information?",
      answer:
        "Our nutritional information is calculated based on standard USDA food composition databases and is intended to provide a reasonable estimate. While we strive for accuracy, variations in specific ingredients and cooking methods may affect the exact nutritional content of the prepared dish.",
    },
    {
      question: "Can I specify dietary restrictions or allergies?",
      answer:
        "Absolutely. ChefAi allows you to set dietary preferences such as vegetarian, vegan, gluten-free, dairy-free, keto, and more. You can also specify allergies in your profile settings, and our AI will avoid suggesting recipes with those ingredients.",
    },
    {
      question: "What if I don't have all the ingredients for a recipe?",
      answer:
        "No problem! Our AI provides substitution suggestions for ingredients you might not have. Additionally, you can regenerate recipes with only the ingredients you have available, or see what additional ingredients would be needed to complete a recipe.",
    },
    {
      question: "Can I create meal plans with ChefAi?",
      answer:
        "Yes, Premium and Family plan subscribers can create weekly meal plans based on their preferences. The meal planner helps you organize your meals for the week and generates a consolidated shopping list for all the recipes.",
    },
    {
      question: "Is there a mobile app available?",
      answer:
        "Currently, ChefAi is available as a web application that works on all devices, including mobile phones. We're working on dedicated iOS and Android apps that will be released soon. Sign up for our newsletter to be notified when they launch.",
    },
    {
      question: "How do I cancel my subscription?",
      answer:
        "You can cancel your subscription at any time from your account settings. After cancellation, you'll continue to have access to premium features until the end of your current billing cycle.",
    },
  ];

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 py-8 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center">
        Frequently Asked Questions (FAQ)
      </h1>

      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg sm:text-lg font-semibold">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 text-sm sm:text-base">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="flex justify-center mt-6">
        <Link to="/pricing">
          <Button variant="outline" className="px-6 py-2 text-base sm:text-lg">
            See Pricing Plans
          </Button>
        </Link>
      </div>
    </div>
  );
}
