"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackgroundGradient } from "@/components/ui/aceternity/background-gradient";
import { SparklesCore } from "@/components/ui/aceternity/sparkles";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AddTestimonialsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    content: "",
    rating: 5,
    position: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // For content field, limit to 500 characters
    if (name === "content" && value.length > 500) {
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (newRating: number) => {
    setFormData((prev) => ({ ...prev, rating: newRating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Make API call to submit the testimonial
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/testimonials/public`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit testimonial");
      }

      const data = await response.json();
      console.log(data); // Log the response data for debugging

      setSubmitStatus({
        success: true,
        message:
          "Your testimonial has been submitted for review. Thank you for your feedback!",
      });

      // Reset form after successful submission
      setFormData({
        name: "",
        content: "",
        rating: 5,
        position: "",
        company: "",
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: `There was an error submitting your testimonial - ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />

      {/* Background sparkles effect */}
      <div className="w-full absolute inset-0">
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

      <div className="container mx-auto px-4 pt-16 pb-6 sm:pt-20 sm:pb-10 relative z-10 flex-grow flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl mx-auto w-full"
        >
          <div className="text-center mb-3 sm:mb-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-1 sm:mb-2">
              Share Your Experience
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm max-w-2xl mx-auto">
              We value your feedback! Let others know about your experience with
              our GenAI Platform.
            </p>
          </div>

          <BackgroundGradient className="rounded-xl p-[1px]">
            <div className="bg-gray-900 p-4 sm:p-6 rounded-[10px]">
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div className="space-y-1 sm:space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-white text-xs sm:text-sm font-medium block"
                  >
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="bg-gray-800/50 border-0 focus:ring-1 focus:ring-purple-500 text-white rounded-md h-9 sm:h-10 text-sm"
                  />
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <Label
                    htmlFor="content"
                    className="text-white text-xs sm:text-sm font-medium block"
                  >
                    Your Testimonial{" "}
                    <span className="text-xs text-gray-400">
                      (Max 500 characters)
                    </span>
                  </Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Share your experience with our GenAI Platform..."
                    required
                    maxLength={500}
                    className="bg-gray-800/50 border-0 focus:ring-1 focus:ring-purple-500 text-white min-h-[60px] sm:min-h-[100px] w-full rounded-md resize-none text-sm"
                  />
                  <div className="text-right text-xs text-gray-400">
                    {formData.content.length}/500 characters
                  </div>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <Label className="text-white text-xs sm:text-sm font-medium block">
                    Rating
                  </Label>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingChange(star)}
                        className="focus:outline-none mr-1 cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={star <= formData.rating ? "#FFD700" : "#4B5563"}
                          className="w-4 h-4 sm:w-6 sm:h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label
                      htmlFor="position"
                      className="text-white text-xs sm:text-sm font-medium block"
                    >
                      Your Position
                    </Label>
                    <Input
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      placeholder="e.g. Software Engineer"
                      className="bg-gray-800/50 border-0 focus:ring-1 focus:ring-purple-500 text-white rounded-md h-9 sm:h-10 text-sm"
                    />
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <Label
                      htmlFor="company"
                      className="text-white text-xs sm:text-sm font-medium block"
                    >
                      Company
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Tech Innovations Inc."
                      className="bg-gray-800/50 border-0 focus:ring-1 focus:ring-purple-500 text-white rounded-md h-9 sm:h-10 text-sm"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-pointer w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-2 rounded-md border-0 text-sm"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Testimonial"}
                  </Button>
                </div>
                
                {/* Success/Error message */}
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3"
                  >
                    <Alert
                      className={`${
                        submitStatus.success
                          ? "bg-green-900/20 border-green-500/50"
                          : "bg-red-900/20 border-red-500/50"
                      }`}
                    >
                      <AlertDescription className="text-xs sm:text-sm">
                        {submitStatus.message}
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </form>
            </div>
          </BackgroundGradient>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default AddTestimonialsPage;
