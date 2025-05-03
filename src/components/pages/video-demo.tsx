import React, { useState, useRef } from "react";
import Layout from "../layout/Layout";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

const VideoDemo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  // Sample cooking video URL - replace with your actual video
  const videoUrl =
    "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4";

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      if (newVolume === 0) {
        setIsMuted(true);
        videoRef.current.muted = true;
      } else if (isMuted) {
        setIsMuted(false);
        videoRef.current.muted = false;
      }
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 bg-white">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Cooking Video Demonstration
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Watch our step-by-step guide on how to prepare delicious dishes with
          CheafAI
        </p>

        <div className="max-w-4xl mx-auto bg-gray-100 rounded-lg overflow-hidden shadow-xl">
          <div className="relative">
            <video
              ref={videoRef}
              className="w-full h-auto"
              src={videoUrl}
              poster="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80"
            >
              Your browser does not support the video tag.
            </video>

            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white hover:bg-opacity-20"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </Button>

              <div className="flex items-center space-x-2 flex-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white hover:bg-opacity-20"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </Button>
                <div className="w-24">
                  <Slider
                    defaultValue={[0.5]}
                    max={1}
                    step={0.01}
                    value={[volume]}
                    onValueChange={handleVolumeChange}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              How to Cook Perfect Pasta
            </h2>
            <p className="text-gray-700 mb-4">
              This video demonstrates the essential techniques for cooking
              perfect pasta every time. Learn about proper water ratios,
              salting, timing, and how to pair with the right sauce.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Pasta
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Italian
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Beginner
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VideoDemo;
