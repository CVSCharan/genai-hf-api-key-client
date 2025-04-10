"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SparklesCore } from "@/components/ui/aceternity/sparkles";
import Link from "next/link";
import Image from "next/image";
import { useTestimonials } from "@/contexts/TestimonialsContext";

const TestimonialsPage = () => {
  // Use the shared context
  const {
    testimonials,
    loading,
    loadingMore,
    error,
    currentPage,
    totalPages,
    fetchTestimonials,
    loadMoreTestimonials,
    resetTestimonials,
  } = useTestimonials();

  const limit = 4; // Number of testimonials per page

  // Fetch testimonials on component mount
  useEffect(() => {
    fetchTestimonials(1, limit);

    // Cleanup function to reset state when component unmounts
    return () => {
      resetTestimonials();
    };
  }, [limit]); // Add all dependencies

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

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />

      {/* Background sparkles effect */}
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={50}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-4">
              What Our Users Say
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover how developers and businesses are leveraging our GenAI
              Platform to build innovative solutions
            </p>
            <div className="mt-8">
              <Link
                href="/testimonials/add"
                className="inline-flex items-center px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all duration-200"
              >
                Share Your Experience
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-400 text-lg">{error}</p>
              <button
                onClick={() => fetchTestimonials(1, limit)}
                className="mt-4 px-6 py-2 bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400 text-lg">No testimonials found.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="rounded-xl bg-gradient-to-r from-purple-600/50 via-pink-500/50 to-purple-600/50 p-[1px] h-full">
                      <div className="bg-gray-900 p-6 rounded-[10px] flex flex-col h-full">
                        <div className="flex items-center mb-3">
                          <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-800 flex-shrink-0">
                            {testimonial.avatar ? (
                              <Image
                                src={testimonial.avatar}
                                alt={testimonial.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-lg font-bold text-white">
                                {testimonial.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-bold text-white text-lg">
                              {testimonial.name}
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
                          &quot;{testimonial.content}&quot;
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {currentPage < totalPages && (
                <div className="flex justify-center mt-10">
                  <button
                    onClick={() => loadMoreTestimonials()} // Remove the limit parameter
                    disabled={loadingMore}
                    className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all duration-200 flex items-center space-x-2 disabled:opacity-70"
                  >
                    {loadingMore ? (
                      <>
                        <span className="animate-spin h-5 w-5 border-t-2 border-b-2 border-white rounded-full mr-2"></span>
                        <span>Loading...</span>
                      </>
                    ) : (
                      <span>Load More Testimonials</span>
                    )}
                  </button>
                </div>
              )}
            </>
          )}

          <div className="mt-16">
            <div className="rounded-xl bg-gradient-to-r from-purple-600/70 via-pink-500/70 to-purple-600/70 p-[1px]">
              <div className="bg-gray-900/90 backdrop-blur-sm p-8 md:p-10 rounded-[10px] flex flex-col md:flex-row items-center justify-between">
                <div className="text-left mb-6 md:mb-0 md:mr-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Share Your Experience
                  </h3>
                  <p className="text-gray-300 text-lg max-w-xl">
                    Join hundreds of satisfied users who have transformed their
                    AI development with GenAI Platform. Your feedback helps us
                    improve.
                  </p>
                </div>
                <Link
                  href="/testimonials/add"
                  className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 transform whitespace-nowrap"
                >
                  Add Your Testimonial
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default TestimonialsPage;
