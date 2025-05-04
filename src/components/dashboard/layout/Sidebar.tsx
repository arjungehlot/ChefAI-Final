import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  LayoutDashboard,
  Calendar,
  Users,
  Settings,
  HelpCircle,
  ChefHat,
  ShoppingCart,
  Activity,
  Wand2,
} from "lucide-react";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  isActive?: boolean;
}

interface SidebarProps {
  items?: NavItem[];
  activeItem?: string;
  onItemClick?: (label: string) => void;
}

const defaultNavItems: NavItem[] = [
  { icon: <Home size={20} />, label: "Home", isActive: true },
  { icon: <LayoutDashboard size={20} />, label: "Dashboard" },
];

const kitchenItems: NavItem[] = [
  { icon: <Wand2 size={20} />, label: "Recipe Generator" , href: "/recipe-generator" },
  { icon: <ShoppingCart size={20} />, label: "Grocery List" , href: "/grocery-list" },
  { icon: <Calendar size={20} />, label: "Meal Planner", href: "/meal-planner" },
  { icon: <Activity size={20} />, label: "Nutrition" , href: "/nutrition" },
];

const defaultBottomItems: NavItem[] = [
  { icon: <Settings size={20} />, label: "Settings" , href: "/settings" },
  { icon: <HelpCircle size={20} />, label: "Help" , href: "/help" },
];

const Sidebar = ({
  items = defaultNavItems,
  activeItem = "Home",
  onItemClick = () => {},
}: SidebarProps) => {
  return (
    <div className="w-[280px] h-full bg-white/80 backdrop-blur-md border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-900">ChefAI</h2>
        <p className="text-sm text-gray-500">Your smart kitchen companion</p>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-1.5">
          {items.map((item) => (
            <Button
              key={item.label}
              variant={"ghost"}
              className={`w-full justify-start gap-3 h-10 rounded-xl text-sm font-medium ${item.label === activeItem ? "bg-green-50 text-green-600 hover:bg-green-100" : "text-gray-700 hover:bg-gray-100"}`}
              // onClick={() => onItemClick(item.label)}
              onClick={() => {
                if (item.href) {
                  window.location.href = item.href;
                } else {  // Handle the case where href is not provided
                  onItemClick(item.label);  
                }
              }}
            >
              <span
                className={`${item.label === activeItem ? "text-green-600" : "text-gray-500"}`}
              >
                {item.icon}
              </span>
              {item.label}
            </Button>
          ))}
        </div>

        <Separator className="my-4 bg-gray-100" />

        <div className="space-y-3">
          <h3 className="text-xs font-medium px-4 py-1 text-gray-500 uppercase tracking-wider">
            Kitchen Tools
          </h3>
          {kitchenItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className={`w-full justify-start gap-3 h-9 rounded-xl text-sm font-medium ${item.label === activeItem ? "bg-green-50 text-green-600 hover:bg-green-100" : "text-gray-700 hover:bg-gray-100"}`}
              // onClick={() => onItemClick(item.label)}/
              onClick={() => {
                if (item.href) {
                  window.location.href = item.href;
                } else {  // Handle the case where href is not provided
                  onItemClick(item.label);  
                }
              }}
            >
              <span
                className={`${item.label === activeItem ? "text-green-600" : "text-gray-500"}`}
              >
                {item.icon}
              </span>
              {item.label}
            </Button>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 mt-auto border-t border-gray-200">
        {defaultBottomItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className="w-full justify-start gap-3 h-10 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 mb-1.5"
            // onClick={() => onItemClick(item.label)}
            onClick={() => {
              if (item.href) {
                window.location.href = item.href;
              } else {  // Handle the case where href is not provided
                onItemClick(item.label);  
              }
            }}
          >
            <span className="text-gray-500">{item.icon}</span>
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
