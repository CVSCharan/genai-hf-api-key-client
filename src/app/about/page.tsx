"use client";

import React from "react";
import { motion } from "framer-motion";
import { BackgroundGradient } from "@/components/ui/aceternity/background-gradient";
import { SparklesCore } from "@/components/ui/aceternity/sparkles";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const AboutPage = () => {
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

      <div className="container mx-auto px-6 py-24 relative z-10 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-4">
            About Me
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Full Stack Developer & AI Enthusiast
          </p>
        </motion.div>

        {/* Rest of your content remains the same */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Profile section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <BackgroundGradient className="rounded-xl p-[1px]">
              <div className="bg-gray-900 p-6 rounded-[10px]">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-6">
                  <Image
                    src="/images/profile-image.jpeg"
                    alt="CVS Charan"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="flex justify-center space-x-4">
                  <Link
                    href="https://github.com/cvs0"
                    target="_blank"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Github className="h-6 w-6" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/cvs-charan/"
                    target="_blank"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Linkedin className="h-6 w-6" />
                  </Link>
                  <Link
                    href="mailto:contact@charan-cvs.dev"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Mail className="h-6 w-6" />
                  </Link>
                  <Link
                    href="https://charan-cvs.dev"
                    target="_blank"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <ExternalLink className="h-6 w-6" />
                  </Link>
                </div>
              </div>
            </BackgroundGradient>
          </motion.div>

          {/* Bio section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <BackgroundGradient className="rounded-xl p-[1px]">
              <div className="bg-gray-900 p-8 rounded-[10px]">
                <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                  Who I Am
                </h2>
                <p className="text-gray-300 mb-4">
                  {`I'm CVS Charan, a passionate Full Stack Developer with
                  expertise in building modern web applications and AI-powered
                  solutions. With a strong foundation in both frontend and
                  backend technologies, I create seamless digital experiences
                  that solve real-world problems.`}
                </p>
                <p className="text-gray-300">
                  My journey in tech has been driven by curiosity and a desire
                  to continuously learn and adapt to emerging technologies,
                  particularly in the AI space.
                </p>
              </div>
            </BackgroundGradient>

            <BackgroundGradient className="rounded-xl p-[1px]">
              <div className="bg-gray-900 p-8 rounded-[10px]">
                <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                  My Expertise
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-white mb-2">Frontend</h3>
                    <ul className="text-gray-400 space-y-1">
                      <li>React & Next.js</li>
                      <li>JavaScript</li>
                      <li>TypeScript</li>
                      <li>Tailwind CSS</li>
                      <li>Framer Motion</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Backend</h3>
                    <ul className="text-gray-400 space-y-1">
                      <li>Node.js & Express</li>
                      <li>MongoDB</li>
                      <li>PostgreSql</li>
                      <li>RESTful APIs</li>
                      <li>AI Integration</li>
                    </ul>
                  </div>
                </div>
              </div>
            </BackgroundGradient>
          </motion.div>
        </div>

        {/* Projects section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <BackgroundGradient className="rounded-xl p-[1px]">
            <div className="bg-gray-900 p-8 rounded-[10px]">
              <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                Featured Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="font-bold text-white mb-2">GenAI Platform</h3>
                  <p className="text-gray-400 mb-4">
                    A powerful platform for leveraging state-of-the-art AI
                    models for creative writing, sentiment analysis, and more.
                  </p>
                  <div className="flex space-x-2 text-sm">
                    <span className="bg-purple-900/50 text-purple-300 px-2 py-1 rounded">
                      Next.js
                    </span>
                    <span className="bg-blue-900/50 text-blue-300 px-2 py-1 rounded">
                      TypeScript
                    </span>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="font-bold text-white mb-2">
                    Portfolio Website
                  </h3>
                  <p className="text-gray-400 mb-4">
                    My personal portfolio showcasing projects and skills with
                    modern design and animations.
                  </p>
                  <div className="flex space-x-2 text-sm">
                    <span className="bg-purple-900/50 text-purple-300 px-2 py-1 rounded">
                      React
                    </span>
                    <span className="bg-pink-900/50 text-pink-300 px-2 py-1 rounded">
                      Tailwind
                    </span>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="font-bold text-white mb-2">
                    AI Chat Application
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Real-time chat application with AI-powered responses and
                    natural language processing.
                  </p>
                  <div className="flex space-x-2 text-sm">
                    <span className="bg-green-900/50 text-green-300 px-2 py-1 rounded">
                      Node.js
                    </span>
                    <span className="bg-yellow-900/50 text-yellow-300 px-2 py-1 rounded">
                      MongoDB
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </BackgroundGradient>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
