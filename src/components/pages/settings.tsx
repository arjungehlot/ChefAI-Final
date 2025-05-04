import React, { useState } from "react";
import Layout from "../layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "../../../supabase/auth";

const SettingsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: user?.email?.split("@")[0] || "",
    email: user?.email || "",
    bio: "",
    dietaryPreferences: ["vegetarian"],
    allergies: "",
    notifyRecipes: true,
    notifyTips: true,
    notifyUpdates: false,
    theme: "light",
    language: "english",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save the settings to your backend
    alert("Settings saved successfully!");
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || "default"}`}
                  />
                  <AvatarFallback>
                    {user?.email?.[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h2 className="font-semibold">{formData.name}</h2>
                <p className="text-sm text-gray-500">{formData.email}</p>
              </div>

              <nav className="space-y-1">
                <Button
                  variant={activeTab === "profile" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("profile")}
                >
                  Profile Information
                </Button>
                <Button
                  variant={activeTab === "preferences" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("preferences")}
                >
                  Dietary Preferences
                </Button>
                <Button
                  variant={activeTab === "notifications" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("notifications")}
                >
                  Notifications
                </Button>
                <Button
                  variant={activeTab === "account" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("account")}
                >
                  Account Security
                </Button>
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="account">Account</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-6">
                  <h2 className="text-xl font-semibold">Profile Information</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Name
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Bio
                      </label>
                      <Textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                    <Button type="submit">Save Changes</Button>
                  </form>
                </TabsContent>

                <TabsContent value="preferences" className="space-y-6">
                  <h2 className="text-xl font-semibold">Dietary Preferences</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Dietary Preferences
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "Vegetarian",
                          "Vegan",
                          "Pescatarian",
                          "Keto",
                          "Paleo",
                          "Low-carb",
                          "Gluten-free",
                          "Dairy-free",
                        ].map((diet) => (
                          <div
                            key={diet}
                            className="flex items-center space-x-2"
                          >
                            <Switch id={diet} />
                            <label htmlFor={diet}>{diet}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Allergies & Restrictions
                      </label>
                      <Textarea
                        name="allergies"
                        value={formData.allergies}
                        onChange={handleInputChange}
                        placeholder="e.g., nuts, shellfish, etc."
                      />
                    </div>
                    <Button type="submit">Save Changes</Button>
                  </form>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                  <h2 className="text-xl font-semibold">
                    Notification Settings
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Recipe Recommendations</p>
                          <p className="text-sm text-gray-500">
                            Get notified about new recipes that match your
                            preferences
                          </p>
                        </div>
                        <Switch
                          checked={formData.notifyRecipes}
                          onCheckedChange={(checked) =>
                            handleSwitchChange("notifyRecipes", checked)
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Cooking Tips</p>
                          <p className="text-sm text-gray-500">
                            Receive helpful cooking tips and tricks
                          </p>
                        </div>
                        <Switch
                          checked={formData.notifyTips}
                          onCheckedChange={(checked) =>
                            handleSwitchChange("notifyTips", checked)
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">App Updates</p>
                          <p className="text-sm text-gray-500">
                            Stay informed about new features and updates
                          </p>
                        </div>
                        <Switch
                          checked={formData.notifyUpdates}
                          onCheckedChange={(checked) =>
                            handleSwitchChange("notifyUpdates", checked)
                          }
                        />
                      </div>
                    </div>
                    <Button type="submit">Save Changes</Button>
                  </form>
                </TabsContent>

                <TabsContent value="account" className="space-y-6">
                  <h2 className="text-xl font-semibold">Account Security</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Current Password
                      </label>
                      <Input
                        type="password"
                        placeholder="Enter your current password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        New Password
                      </label>
                      <Input type="password" placeholder="Enter new password" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Confirm New Password
                      </label>
                      <Input
                        type="password"
                        placeholder="Confirm new password"
                      />
                    </div>
                    <Button type="submit">Update Password</Button>
                  </form>

                  <div className="pt-6 mt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-red-600 mb-2">
                      Danger Zone
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Once you delete your account, there is no going back.
                      Please be certain.
                    </p>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
