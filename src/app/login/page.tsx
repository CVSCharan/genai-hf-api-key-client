"use client";

import React, { Suspense, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BackgroundGradient } from "@/components/ui/aceternity/background-gradient";
import { SparklesCore } from "@/components/ui/aceternity/sparkles";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaGithub } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";

const LoginPageContent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();

  // Get auth context
  const { login, error: authError, isLoading: authLoading } = useAuth();

  // Update component state when auth context changes
  useEffect(() => {
    if (authError) {
      setErrorMessage(authError);
      setShowAlert(true);
    }

    // Sync loading state with auth context
    setIsLoading(authLoading);
  }, [authError, authLoading]);

  useEffect(() => {
    // Check for success message in URL
    const message = searchParams.get("message");
    if (message) {
      setSuccessMessage(decodeURIComponent(message));

      // Reset URL to remove the query parameter
      const { pathname } = window.location;
      window.history.replaceState({}, "", pathname);
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Call the login function from AuthContext
      await login(email, password);

      // Success message is optional as the redirect is handled by AuthContext
      setSuccessMessage("Login successful! Redirecting to dashboard...");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleOAuthLogin = (provider: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (provider === "Google") {
      // Redirect to your backend's Google OAuth route
      window.location.href = `${apiUrl}/auth/login/google`;
    } else if (provider === "GitHub") {
      // For GitHub OAuth (if implemented in your backend)
      window.location.href = `${apiUrl}/auth/login/github`;
      console.log("GitHub OAuth not implemented yet");
    }
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

      <div className="container mx-auto px-6 flex-grow relative z-10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-2">
              GenAI Platform
            </h1>
            <p className="text-gray-400 text-base md:text-lg">
              Sign in to access GenAI management dashboard
            </p>
          </div>

          <BackgroundGradient className="rounded-xl p-[1px]">
            <div className="bg-gray-900 p-6 md:p-8 rounded-[10px]">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-gray-800 border-gray-700 text-white pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-gray-800 border-gray-700 text-white pl-10"
                    />
                    {password.length !== 0 && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300"
                      >
                        {showPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            className="h-5 w-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            className="h-5 w-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end text-sm">
                  <Link
                    href="/forgot-password"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-2 ${
                    isLoading ? "cursor-wait" : "cursor-pointer"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Logging in...
                    </span>
                  ) : (
                    "Log In"
                  )}
                </Button>

                {/* Success and error messages */}
                {successMessage && showAlert && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Alert
                      autoClose={true}
                      autoCloseTime={5000}
                      onClose={() => setShowAlert(false)}
                      variant="success"
                      className="flex items-center"
                    >
                      <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
                      <AlertDescription className="ml-2 text-xs">
                        {successMessage}
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                {errorMessage && showAlert && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Alert
                      autoClose={true}
                      autoCloseTime={5000}
                      onClose={() => setShowAlert(false)}
                      variant="destructive"
                      className="flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-red-400 flex-shrink-0"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                      </svg>
                      <AlertDescription className="ml-2 text-xs">
                        {errorMessage}
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </form>

              <div className="relative my-6">
                <Separator className="bg-gray-700" />
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 px-2 text-sm text-gray-400">
                  OR CONTINUE WITH
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  className="cursor-pointer bg-transparent border border-gray-700 hover:bg-gray-800 text-white font-medium flex items-center justify-center"
                  onClick={() => handleOAuthLogin("Google")}
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  className="cursor-pointer bg-transparent border border-gray-700 hover:bg-gray-800 text-white font-medium flex items-center justify-center"
                  onClick={() => handleOAuthLogin("GitHub")}
                >
                  <FaGithub className="mr-2" />
                  GitHub
                </Button>
              </div>

              <div className="mt-6 text-center text-sm text-gray-400">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  Create an account
                </Link>
              </div>
            </div>
          </BackgroundGradient>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

// Loading fallback component
const LoadingFallback = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-6 py-24 relative z-10 flex-grow flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-300">Loading...</p>
        </div>
      </div>
    </div>
  );
};

// Main page component
const LoginPage = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <LoginPageContent />
    </Suspense>
  );
};

export default LoginPage;
