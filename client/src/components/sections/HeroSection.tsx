import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const phrases = [
    "Ideate Build Deploy",
    "Design Develop Disrupt",
    "Think Create Launch",
  ];

  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setIsAnimating(true);

      // After fade out animation completes, change the phrase
      setTimeout(() => {
        const nextPhrase = (currentPhrase + 1) % phrases.length;
        setCurrentPhrase(nextPhrase);
        setIsAnimating(false);
      }, 500); // Time to fade out
    }, 3000); // Total time per phrase

    return () => clearInterval(phraseInterval);
  }, [currentPhrase]);

  return (
    <section id="home" className="relative bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="heading text-4xl md:text-5xl font-bold tracking-tight text-dark mb-6">
              <span
                className={`block text-primary transition-opacity duration-500 ${isAnimating ? "opacity-0" : "opacity-100"}`}
                style={{ minHeight: "60px" }}
              >
                {phrases[currentPhrase]}
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              StartupPulse provides the guidance, resources, and network you
              need to transform your vision into a thriving business.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#services">
                <Button className="bg-primary hover:bg-primary-dark text-white px-6 py-3 h-auto">
                  Our Services
                </Button>
              </a>
              <a href="#contact">
                <Button
                  variant="outline"
                  className="text-dark border-gray-300 px-6 py-3 h-auto"
                >
                  Get in Touch
                </Button>
              </a>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Team discussing startup ideas"
              className="rounded-lg shadow-xl w-full h-auto"
            />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 max-w-xs hidden md:block">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-dark">
                    90% of our startups secure funding
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
