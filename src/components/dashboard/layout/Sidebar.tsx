import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  // LayoutDashboard,
  Calendar,
  // Users,
  Settings,
  HelpCircle,
  ShoppingCart,
  Activity,
  Wand2,
  ChevronLeft,
  ChevronRight,
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
  // { icon: <LayoutDashboard size={20} />, label: "Dashboard" },
];

const kitchenItems: NavItem[] = [
  {
    icon: <Wand2 size={20} />,
    label: "Recipe Generator",
    href: "/recipe-generator",
  },
  {
    icon: <ShoppingCart size={20} />,
    label: "Grocery List",
    href: "/grocery-list",
  },
  {
    icon: <Calendar size={20} />,
    label: "Meal Planner",
    href: "/meal-planner",
  },
  { icon: <Activity size={20} />, label: "Nutrition", href: "/nutrition" },
];

const defaultBottomItems: NavItem[] = [
  { icon: <Settings size={20} />, label: "Settings", href: "/settings" },
  { icon: <HelpCircle size={20} />, label: "Help", href: "/contact" },
];

const Sidebar = ({
  items = defaultNavItems,
  activeItem = "Home",
  onItemClick = () => {},
}: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div
      className={`h-full bg-white/80 backdrop-blur-md border-r border-gray-200 flex flex-col transition-all duration-300 ${
        isOpen ? "w-[280px]" : "w-[60px]"
      }`}
    >
      {/* Toggle Button */}
      <div className="flex justify-end p-2">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-gray-800 transition"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Logo Section */}
      <div className={`px-6 pb-4 ${isOpen ? "block" : "hidden"}`}>
        <h2 className="text-xl font-semibold mb-1 text-gray-900">ChefAI</h2>
        <p className="text-sm text-gray-500">Your smart kitchen companion</p>
      </div>

      {/* Scrollable Area */}
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1.5">
          {items.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className={`w-full justify-start gap-3 h-10 rounded-xl text-sm font-medium ${
                item.label === activeItem
                  ? "bg-green-50 text-green-600 hover:bg-green-100"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => {
                if (item.href) {
                  window.location.href = item.href;
                } else {
                  onItemClick(item.label);
                }
              }}
            >
              <span
                className={`${
                  item.label === activeItem
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {item.icon}
              </span>
              {isOpen && <span>{item.label}</span>}
            </Button>
          ))}
        </div>

        {isOpen && <Separator className="my-4 bg-gray-100" />}

        {/* Kitchen Tools */}
        <div className="space-y-3">
          {isOpen && (
            <h3 className="text-xs font-medium px-4 py-1 text-gray-500 uppercase tracking-wider">
              Kitchen Tools
            </h3>
          )}
          {kitchenItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className={`w-full justify-start gap-3 h-9 rounded-xl text-sm font-medium ${
                item.label === activeItem
                  ? "bg-green-50 text-green-600 hover:bg-green-100"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => {
                if (item.href) {
                  window.location.href = item.href;
                } else {
                  onItemClick(item.label);
                }
              }}
            >
              <span
                className={`${
                  item.label === activeItem
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {item.icon}
              </span>
              {isOpen && <span>{item.label}</span>}
            </Button>
          ))}
        </div>
      </ScrollArea>

      {/* Bottom Items */}
      <div className="p-4 mt-auto border-t border-gray-200">
        {defaultBottomItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className="w-full justify-start gap-3 h-10 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 mb-1.5"
            onClick={() => {
              if (item.href) {
                window.location.href = item.href;
              } else {
                onItemClick(item.label);
              }
            }}
          >
            <span className="text-gray-500">{item.icon}</span>
            {isOpen && <span>{item.label}</span>}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
