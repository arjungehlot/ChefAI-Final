import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

export default function CareersPage() {
  const jobOpenings = [
    {
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "San Francisco, CA (Hybrid)",
      type: "Full-time",
      description:
        "We're looking for an experienced AI Engineer to help us improve our recipe generation algorithms and develop new AI-powered features.",
      responsibilities: [
        "Lead the development of our core AI recipe generation engine",
        "Implement and optimize machine learning models for food and nutrition analysis",
        "Collaborate with product and design teams to create innovative AI features",
        "Stay current with the latest advancements in AI and machine learning",
      ],
      requirements: [
        "5+ years of experience in AI/ML engineering",
        "Strong background in natural language processing and recommendation systems",
        "Experience with Python, TensorFlow, and PyTorch",
        "MS or PhD in Computer Science, AI, or related field",
      ],
    },
    {
      title: "Full Stack Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description:
        "Join our engineering team to build and maintain our web application, ensuring a seamless user experience across all devices.",
      responsibilities: [
        "Develop and maintain our React-based web application",
        "Build RESTful APIs and backend services",
        "Implement responsive UI components and features",
        "Optimize application performance and scalability",
      ],
      requirements: [
        "3+ years of experience in full stack development",
        "Proficiency in React, TypeScript, and Node.js",
        "Experience with database design and optimization",
        "Knowledge of cloud services (AWS, GCP, or Azure)",
      ],
    },
    {
      title: "Nutritionist",
      department: "Content",
      location: "New York, NY (On-site)",
      type: "Full-time",
      description:
        "Help us ensure that our recipes meet nutritional standards and provide accurate dietary information to our users.",
      responsibilities: [
        "Review and validate nutritional information for generated recipes",
        "Develop dietary guidelines and nutritional standards",
        "Create content related to nutrition and healthy eating",
        "Collaborate with the AI team to improve nutritional accuracy",
      ],
      requirements: [
        "Registered Dietitian (RD) or equivalent certification",
        "3+ years of experience in nutrition counseling or content creation",
        "Knowledge of various dietary patterns and restrictions",
        "Excellent communication and writing skills",
      ],
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      description:
        "Create intuitive and engaging user experiences that make cooking with AI a delight for our users.",
      responsibilities: [
        "Design user interfaces for web and mobile applications",
        "Conduct user research and usability testing",
        "Create wireframes, prototypes, and high-fidelity designs",
        "Collaborate with engineers to implement designs",
      ],
      requirements: [
        "3+ years of experience in UX/UI design",
        "Proficiency in Figma, Sketch, or similar design tools",
        "Portfolio demonstrating strong visual design skills",
        "Experience designing for consumer applications",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header is included in the App layout */}

      <main className="pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Join Our Team
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Help us revolutionize home cooking with AI-powered solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 text-center">
              <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">Innovative Work</h2>
              <p className="text-gray-600">
                Be at the forefront of AI technology in the food and nutrition
                space, solving real-world problems.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 text-center">
              <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">
                Collaborative Culture
              </h2>
              <p className="text-gray-600">
                Work with a diverse team of engineers, nutritionists, chefs, and
                designers in a supportive environment.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 text-center">
              <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">Growth & Impact</h2>
              <p className="text-gray-600">
                Develop your skills while making a meaningful impact on how
                people cook and eat around the world.
              </p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-semibold mb-8">Open Positions</h2>
            <div className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                {jobOpenings.map((job, index) => (
                  <AccordionItem
                    key={index}
                    value={`job-${index}`}
                    className="border border-gray-200 rounded-lg mb-4 overflow-hidden"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                      <div className="flex flex-col md:flex-row md:items-center justify-between w-full text-left">
                        <div>
                          <h3 className="text-xl font-medium text-gray-900">
                            {job.title}
                          </h3>
                          <p className="text-gray-500">{job.department}</p>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-2 md:mt-0">
                          <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                            {job.location}
                          </span>
                          <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                            {job.type}
                          </span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 py-4 bg-white">
                      <div className="space-y-4">
                        <p className="text-gray-700">{job.description}</p>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">
                            Responsibilities:
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-600">
                            {job.responsibilities.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">
                            Requirements:
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-600">
                            {job.requirements.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-2">
                          <Button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600">
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Don't see a position that fits?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals to join our team.
              Send us your resume and tell us how you can contribute to CheafAI.
            </p>
            <Link to="/contact">
              <Button className="bg-white text-green-600 hover:bg-green-50 border border-green-200">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
