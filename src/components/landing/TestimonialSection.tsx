"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundGradient } from "@/components/ui/aceternity/background-gradient";
import Image from "next/image";
import { Testimonial } from "@/types/types";

export const TestimonialSection = () => {
  // Mock data - in a real app, you would fetch this from your API
  const testimonials: Testimonial[] = [
    {
      _id: "1",
      user: {
        _id: "u1",
        name: "Sarah Johnson",
        avatar: "/avatars/avatar-1.jpg",
      },
      content:
        "The GenAI Platform has completely transformed how we implement AI solutions. The API is intuitive and the documentation is excellent. We've reduced our development time by 60%.",
      rating: 5,
      position: "CTO",
      company: "TechInnovate",
    },
    {
      _id: "2",
      user: {
        _id: "u2",
        name: "Michael Chen",
        avatar: "/avatars/avatar-2.jpg",
      },
      content:
        "As a startup founder, I needed an AI solution that was both powerful and cost-effective. GenAI Platform delivered on both fronts. Their API key management is seamless.",
      rating: 5,
      position: "Founder",
      company: "AI Ventures",
    },
    {
      _id: "3",
      user: {
        _id: "u3",
        name: "Emily Rodriguez",
        avatar: "/avatars/avatar-3.jpg",
      },
      content:
        "The customer support team is exceptional. Whenever we had questions about implementation, they were quick to respond with detailed solutions.",
      rating: 4,
      position: "Lead Developer",
      company: "CodeCraft",
    },
    {
      _id: "4",
      user: {
        _id: "u4",
        name: "David Wilson",
        avatar: "/avatars/avatar-4.jpg",
      },
      content:
        "GenAI Platform's API has been a game-changer for our machine learning projects. The integration was smooth and the performance is outstanding.",
      rating: 5,
      position: "ML Engineer",
      company: "DataSphere",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const testimonialsPerPage = 2;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={i < rating ? "#FFD700" : "#4B5563"}
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clipRule="evenodd"
        />
      </svg>
    ));
  };

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
  }, [totalPages]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  }, [totalPages]);

  // Autoplay functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoplay) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoplay, nextSlide]);

  // Get current testimonials to display
  const getCurrentTestimonials = () => {
    const startIndex = currentIndex * testimonialsPerPage;
    return testimonials.slice(startIndex, startIndex + testimonialsPerPage);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-70"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-3 md:mb-4"
          >
            What Our Users Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Discover how developers and businesses are leveraging our GenAI
            Platform to build innovative solutions
          </motion.p>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
            >
              {getCurrentTestimonials().map((testimonial, index) => (
                <div key={testimonial._id} className="h-full flex">
                  <div className="rounded-xl bg-gradient-to-r from-purple-600/50 via-pink-500/50 to-purple-600/50 p-[1px] h-full">
                    <div className="bg-gray-900 p-6 rounded-[10px] flex flex-col h-full">
                      <div className="flex items-center mb-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-800 flex-shrink-0">
                          {testimonial.user.avatar ? (
                            <Image
                              src={testimonial.user.avatar}
                              alt={testimonial.user.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-lg font-bold text-white">
                              {testimonial.user.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-lg">
                            {testimonial.user.name}
                          </h3>
                          {testimonial.position && testimonial.company && (
                            <p className="text-sm text-gray-400">
                              {testimonial.position} at {testimonial.company}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex mb-3">
                        {renderStars(testimonial.rating)}
                      </div>

                      <p className="text-gray-300 text-base flex-grow">
                        "{testimonial.content}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={prevSlide}
              className="cursor-pointer p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors"
              aria-label="Previous testimonials"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="flex space-x-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`cursor-pointer w-2.5 h-2.5 rounded-full transition-colors ${
                    currentIndex === idx
                      ? "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                  aria-label={`Go to testimonial page ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="cursor-pointer p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors"
              aria-label="Next testimonials"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <button
              onClick={() => setAutoplay(!autoplay)}
              className={`p-2 rounded-full cursor-pointer ${
                autoplay
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-gray-800 hover:bg-gray-700"
              } text-white transition-colors`}
              aria-label={autoplay ? "Pause autoplay" : "Start autoplay"}
            >
              {autoplay ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
