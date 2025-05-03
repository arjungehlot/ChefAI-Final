import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header is included in the App layout */}

      <main className="pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              About CheafAI
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionizing home cooking with AI-powered recipe generation and
              meal planning.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                At CheafAI, we're on a mission to transform the way people cook
                at home. We believe that cooking should be accessible,
                enjoyable, and sustainable for everyone, regardless of their
                culinary expertise or time constraints.
              </p>
              <p className="text-gray-600 mb-6">
                Our AI-powered platform helps you make the most of the
                ingredients you already have, reducing food waste while creating
                delicious, nutritionally balanced meals tailored to your dietary
                preferences and health goals.
              </p>
              <p className="text-gray-600">
                We're committed to making healthy eating easier, more
                affordable, and more enjoyable for households around the world.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"
                alt="Team working together"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-semibold text-center mb-12">
              Our Story
            </h2>
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3">
                  <div className="bg-green-100 text-green-800 text-xl font-semibold rounded-full w-16 h-16 flex items-center justify-center mx-auto md:mx-0">
                    2021
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-medium mb-2">The Beginning</h3>
                  <p className="text-gray-600">
                    CheafAI started as a personal project by our founder, who
                    was frustrated with food waste and the daily challenge of
                    deciding what to cook with limited ingredients. The initial
                    prototype was built to generate recipes based on whatever
                    was in the refrigerator.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3">
                  <div className="bg-blue-100 text-blue-800 text-xl font-semibold rounded-full w-16 h-16 flex items-center justify-center mx-auto md:mx-0">
                    2022
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-medium mb-2">Growing the Team</h3>
                  <p className="text-gray-600">
                    As the concept gained traction among friends and family, we
                    assembled a team of nutritionists, chefs, and AI engineers
                    to refine the algorithm and expand the recipe database. We
                    secured our first round of funding and began building the
                    full platform.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3">
                  <div className="bg-purple-100 text-purple-800 text-xl font-semibold rounded-full w-16 h-16 flex items-center justify-center mx-auto md:mx-0">
                    2023
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-medium mb-2">
                    Launch and Beyond
                  </h3>
                  <p className="text-gray-600">
                    We officially launched CheafAI to the public, quickly
                    growing to serve thousands of users. We've continued to
                    enhance our AI capabilities, add new features like meal
                    planning and nutritional tracking, and build a community of
                    home cooks who share our passion for sustainable, healthy
                    eating.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-semibold text-center mb-12">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Alex Johnson",
                  role: "Founder & CEO",
                  image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
                },
                {
                  name: "Samantha Lee",
                  role: "Chief Nutritionist",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Samantha",
                },
                {
                  name: "Marcus Chen",
                  role: "Lead AI Engineer",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
                },
                {
                  name: "Priya Patel",
                  role: "Head of Product",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
                },
                {
                  name: "David Kim",
                  role: "Executive Chef",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
                },
                {
                  name: "Emma Wilson",
                  role: "UX Designer",
                  image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
                },
                {
                  name: "James Rodriguez",
                  role: "Marketing Director",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
                },
                {
                  name: "Olivia Taylor",
                  role: "Community Manager",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
                },
              ].map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-100"
                >
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-green-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-gray-500">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-semibold mb-6">Join Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We're always looking for passionate individuals to join our team
              and help us revolutionize home cooking.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/careers">
                <Button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-8 py-2">
                  View Open Positions
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="border-green-200 text-green-700 hover:bg-green-50 px-8 py-2"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
