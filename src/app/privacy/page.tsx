"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SparklesCore } from "@/components/ui/aceternity/sparkles";

const PrivacyPage = () => {
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
              Privacy Policy
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
                  Welcome to the CVS GenAI Platform privacy policy. This policy
                  explains how we collect, use, and protect your personal
                  information when you use our API key management service.
                </p>
                <p className="text-gray-300">
                  This is a developer showcase project intended to demonstrate
                  technical capabilities and is not an enterprise application.
                  As such, we prioritize transparency about our data practices.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  2. Information We Collect
                </h2>
                <p className="text-gray-300 mb-3">
                  We may collect the following types of information:
                </p>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>
                    <span className="text-purple-400">
                      Account Information:
                    </span>{" "}
                    Email address, name, and password when you register for an
                    account.
                  </li>
                  <li>
                    <span className="text-purple-400">Usage Data:</span>{" "}
                    Information about how you use our service, including API key
                    usage patterns and feature interactions.
                  </li>
                  <li>
                    <span className="text-purple-400">Technical Data:</span> IP
                    address, browser type, device information, and cookies for
                    service optimization.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  3. How We Use Your Information
                </h2>
                <p className="text-gray-300 mb-3">
                  We use your information for the following purposes:
                </p>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>To provide and maintain our service</li>
                  <li>To notify you about changes to our service</li>
                  <li>To allow you to participate in interactive features</li>
                  <li>To provide customer support</li>
                  <li>To gather analysis to improve our service</li>
                  <li>To monitor the usage of our service</li>
                  <li>To detect, prevent and address technical issues</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  4. Data Security
                </h2>
                <p className="text-gray-300 mb-3">
                  The security of your data is important to us. We strive to use
                  commercially acceptable means to protect your personal
                  information, but we cannot guarantee its absolute security.
                </p>
                <p className="text-gray-300">
                  As this is a developer showcase project, we implement security
                  best practices for demonstration purposes, including
                  encryption of sensitive data and secure authentication
                  methods.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  5. Third-Party Services
                </h2>
                <p className="text-gray-300 mb-3">
                  Our service may contain links to other sites that are not
                  operated by us. If you click on a third-party link, you will
                  be directed to that third party's site. We strongly advise you
                  to review the Privacy Policy of every site you visit.
                </p>
                <p className="text-gray-300">
                  We have no control over and assume no responsibility for the
                  content, privacy policies, or practices of any third-party
                  sites or services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  6. Changes to This Privacy Policy
                </h2>
                <p className="text-gray-300 mb-3">
                  We may update our Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page.
                </p>
                <p className="text-gray-300">
                  You are advised to review this Privacy Policy periodically for
                  any changes. Changes to this Privacy Policy are effective when
                  they are posted on this page.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  7. Contact Us
                </h2>
                <p className="text-gray-300 mb-3">
                  If you have any questions about this Privacy Policy, please
                  contact us:
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
              understood this Privacy Policy.
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPage;
