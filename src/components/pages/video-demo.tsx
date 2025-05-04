import React from "react";
import Layout from "../layout/Layout";

const CookingVideosPage = () => {
  const additionalVideos = [
    {
      youtubeEmbedUrl: "https://www.youtube.com/embed/nt1f0IegTWQ?si=6RjTUetCmv__0MWe",
      title: "chana dal tadka recipe",
      description:
        "Learn how to make a quick and flavorful chicken curry using simple ingredients.",
      tags: ["Chicken", "Indian", "Spicy"],
    },
    {
      youtubeEmbedUrl: "https://www.youtube.com/embed/cLGIs2Qh54Q?si=dZTOopL4KT9hHOVv&amp",
      title: "Fluffy Pancakes",
      description:
        "Whip up soft, fluffy pancakes perfect for a cozy weekend breakfast.",
      tags: ["Pancake", "Breakfast", "Sweet"],
    },
    {
      youtubeEmbedUrl: "https://www.youtube.com/embed/PlNE7Mrlvcg?si=vXXcMEczrCOtJheG",
      title: "Healthy Green Salad",
      description:
        "A crisp and refreshing salad loaded with greens, veggies, and a tangy dressing.",
      tags: ["Salad", "Vegan", "Quick"],
    },
    {
      youtubeEmbedUrl: "https://www.youtube.com/embed/a03U45jFxOI",
      title: "Butter Chicken",
      description:
        "Classic Indian butter chicken recipe with creamy tomato gravy and rich spices.",
      tags: ["Butter Chicken", "Rich", "Classic"],
    },
    {
      youtubeEmbedUrl: "https://www.youtube.com/embed/aQHr9Zsnzbw?si=8PHY_U3zocnaid7E&amp",
      title: "Quick Veg Noodles",
      description:
        "Spicy and fast veg noodles recipe for instant satisfaction.",
      tags: ["Noodles", "Quick", "Spicy"],
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 bg-white">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Cooking Video Demonstration
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Watch our step-by-step guide on how to prepare delicious dishes with CheafAI
        </p>

        {/* Main Video Section */}
        <div className="max-w-4xl mx-auto bg-gray-100 rounded-lg overflow-hidden shadow-xl">
          <div className="relative">
            <iframe
              width="100%"
              height="415"
              src="https://www.youtube.com/embed/Fb_IljnhwTo?rel=0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">How to Cook Perfect Pasta</h2>
            <p className="text-gray-700 mb-4">
              This video demonstrates the essential techniques for cooking perfect pasta every time.
              Learn about proper water ratios, salting, timing, and how to pair with the right sauce.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Pasta", "Italian", "Beginner"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Videos */}
        <h2 className="text-2xl font-bold mt-12 mb-6 text-center">More Recipes for You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {additionalVideos.map((video, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 transform hover:scale-105"
            >
              <div className="relative group">
                <iframe
                  width="100%"
                  height="215"
                  src={video.youtubeEmbedUrl}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{video.description}</p>
                <div className="flex flex-wrap gap-1">
                  {video.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CookingVideosPage;
