"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SparklesCore } from "@/components/ui/aceternity/sparkles";

const TermsPage = () => {
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
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-4">
              Terms and Conditions
            </h1>
            <p className="text-gray-400 text-lg">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="bg-gray-900/70 rounded-xl p-8 backdrop-blur-sm border border-gray-800">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  1. Introduction
                </h2>
                <p className="text-gray-300 mb-3">
                  Welcome to CVS GenAI Platform. These Terms and Conditions
                  govern your use of our API key management service and website.
                </p>
                <p className="text-gray-300">
                  By accessing or using our service, you agree to be bound by
                  these Terms. This is a developer showcase project intended to
                  demonstrate technical capabilities and is not an enterprise
                  application.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  2. Use of Service
                </h2>
                <p className="text-gray-300 mb-3">
                  Our service provides API key management for generative AI
                  applications. You may use this service for personal,
                  non-commercial purposes only.
                </p>
                <p className="text-gray-300">
                  You are responsible for maintaining the confidentiality of
                  your account information and for all activities that occur
                  under your account.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  3. Intellectual Property
                </h2>
                <p className="text-gray-300 mb-3">
                  The service and its original content, features, and
                  functionality are owned by CVS GenAI Platform and are
                  protected by international copyright, trademark, patent, trade
                  secret, and other intellectual property laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  4. Limitation of Liability
                </h2>
                <p className="text-gray-300 mb-3">
                  In no event shall CVS GenAI Platform, nor its directors,
                  employees, partners, agents, suppliers, or affiliates, be
                  liable for any indirect, incidental, special, consequential or
                  punitive damages, including without limitation, loss of
                  profits, data, use, goodwill, or other intangible losses,
                  resulting from your access to or use of or inability to access
                  or use the service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  5. Disclaimer
                </h2>
                <p className="text-gray-300 mb-3">
                  {`Your use of the service is at your sole risk. The service is
                  provided on an "AS IS" and "AS AVAILABLE" basis. The service
                  is provided without warranties of any kind, whether express or
                  implied.`}
                </p>
                <p className="text-gray-300">
                  As this is a developer showcase project, it may contain bugs,
                  errors, or other issues. We do not guarantee that the service
                  will meet your specific requirements or expectations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  6. Changes to Terms
                </h2>
                <p className="text-gray-300 mb-3">
                  We reserve the right to modify or replace these Terms at any
                  time. It is your responsibility to review these Terms
                  periodically for changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  7. Contact Us
                </h2>
                <p className="text-gray-300 mb-3">
                  If you have any questions about these Terms, please contact us
                  at:
                </p>
                <p className="text-gray-300">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                    cvstechsolutions@gmail.com
                  </span>
                </p>
              </section>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-400">
              By using our service, you acknowledge that you have read and
              understood these Terms and Conditions.
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsPage;
