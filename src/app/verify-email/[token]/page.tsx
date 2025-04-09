"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BackgroundGradient } from "@/components/ui/aceternity/background-gradient";
import { SparklesCore } from "@/components/ui/aceternity/sparkles";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { useParams, useRouter } from "next/navigation";

const VerifyEmailPage = () => {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;

  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/local-auth/verify/${token}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Email verification failed");
        }

        setVerificationStatus({
          success: true,
          message:
            "Your email has been successfully verified! You can now log in to your account.",
        });
      } catch (error) {
        console.error("Verification error:", error);
        setVerificationStatus({
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "Email verification failed. The link may have expired or is invalid.",
        });
      } finally {
        setIsVerifying(false);
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setVerificationStatus({
        success: false,
        message:
          "Invalid verification link. Please check your email and try again.",
      });
      setIsVerifying(false);
    }
  }, [token]);

  const handleRedirect = () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-black text-white">
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

      <div className="container mx-auto px-6 relative z-10 flex-grow flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-2">
              Email Verification
            </h1>
            <p className="text-gray-400">Confirming your email address</p>
          </div>

          <BackgroundGradient className="rounded-xl p-[1px]">
            <div className="bg-gray-900 p-6 rounded-[10px] text-center">
              {isVerifying ? (
                <div className="py-8 flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
                  <p className="text-gray-300">
                    Verifying your email address...
                  </p>
                </div>
              ) : (
                <div className="py-4">
                  {verificationStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mb-6"
                    >
                      <Alert
                        className={`flex items-center ${
                          verificationStatus.success
                            ? "bg-green-900/20 border border-green-800 text-green-300"
                            : "bg-red-900/20 border border-red-800 text-red-300"
                        }`}
                      >
                        {verificationStatus.success ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5 text-green-400 flex-shrink-0"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5 text-red-400 flex-shrink-0"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                          </svg>
                        )}
                        <AlertDescription className="ml-2">
                          {verificationStatus.message}
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                  )}

                  <div className="mt-6">
                    {verificationStatus?.success ? (
                      <Button
                        onClick={handleRedirect}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 cursor-pointer"
                      >
                        Continue to Login
                      </Button>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-gray-400 text-sm">
                          If you're having trouble verifying your email, you
                          can:
                        </p>
                        <Link href="/login">
                          <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium">
                            Return to Login
                          </Button>
                        </Link>
                        <p className="text-gray-500 text-xs mt-2">
                          Need help?{" "}
                          <Link
                            href="/contact"
                            className="text-purple-400 hover:text-purple-300"
                          >
                            Contact support
                          </Link>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </BackgroundGradient>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default VerifyEmailPage;
