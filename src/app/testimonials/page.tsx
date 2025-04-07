"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SparklesCore } from "@/components/ui/aceternity/sparkles";
import Link from "next/link";
import Image from "next/image";

// Define the testimonial type based on your schema
type Testimonial = {
  _id: string;
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  rating: number;
  position?: string;
  company?: string;
};

const TestimonialsPage = () => {
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
    {
      _id: "5",
      user: {
        _id: "u5",
        name: "Jennifer Lee",
        avatar: "/avatars/avatar-5.jpg",
      },
      content:
        "We've tried several AI platforms, but GenAI stands out for its reliability and ease of use. The documentation is comprehensive and the support team is always helpful.",
      rating: 5,
      position: "Product Manager",
      company: "InnoTech",
    },
    {
      _id: "6",
      user: {
        _id: "u6",
        name: "Robert Martinez",
        avatar: "/avatars/avatar-6.jpg",
      },
      content:
        "The GenAI Platform has helped us build AI features that we thought were years away from being possible. Their API is well-designed and the pricing is transparent.",
      rating: 4,
      position: "CIO",
      company: "FutureTech",
    },
  ];

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
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6">
              Join hundreds of satisfied users who have transformed their AI development with GenAI Platform
            </p>
            <Link 
              href="/testimonials/add" 
              className="inline-flex items-center px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all duration-200"
            >
              Add Your Testimonial
            </Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default TestimonialsPage;
