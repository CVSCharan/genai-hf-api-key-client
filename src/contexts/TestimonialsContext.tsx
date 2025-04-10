"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Testimonial, PaginatedResponse } from "@/types/types";

interface TestimonialsContextType {
  // Shared state
  apiUrl: string;
  
  // For testimonials page (paginated)
  testimonials: Testimonial[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  
  // For testimonial section (recent)
  recentTestimonials: Testimonial[];
  recentLoading: boolean;
  recentError: string | null;
  
  // Methods
  fetchTestimonials: (page: number, limit: number) => Promise<void>;
  loadMoreTestimonials: () => Promise<void>;
  fetchRecentTestimonials: () => Promise<void>;
  resetTestimonials: () => void;
}

const TestimonialsContext = createContext<TestimonialsContextType | undefined>(undefined);

export const useTestimonials = () => {
  const context = useContext(TestimonialsContext);
  if (context === undefined) {
    throw new Error("useTestimonials must be used within a TestimonialsProvider");
  }
  return context;
};

interface TestimonialsProviderProps {
  children: ReactNode;
}

export const TestimonialsProvider = ({ children }: TestimonialsProviderProps) => {
  // Shared state
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
  
  // For testimonials page (paginated)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageLimit, setPageLimit] = useState(4); // Store the limit used for initial fetch
  
  // For testimonial section (recent)
  const [recentTestimonials, setRecentTestimonials] = useState<Testimonial[]>([]);
  const [recentLoading, setRecentLoading] = useState(false);
  const [recentError, setRecentError] = useState<string | null>(null);
  
  // Fetch paginated testimonials
  const fetchTestimonials = async (page: number = 1, limit: number = 4) => {
    setLoading(true);
    setError(null);
    setPageLimit(limit); // Store the limit for future use
    
    try {
      const response = await fetch(
        `${apiUrl}/testimonials/approved?page=${page}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch testimonials");
      }

      const data = await response.json();
      // Ensure we're handling the response correctly
      const testimonialsList = Array.isArray(data.testimonials) 
        ? data.testimonials 
        : Array.isArray(data) 
          ? data 
          : [];
          
      setTestimonials(testimonialsList);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(page);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      setError("Failed to load testimonials. Please try again later.");
      // Set empty array to prevent errors
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  // Load more testimonials (pagination)
  const loadMoreTestimonials = async () => {
    if (currentPage >= totalPages) return;
    
    setLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const response = await fetch(
        `${apiUrl}/testimonials/approved?page=${nextPage}&limit=${pageLimit}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch more testimonials");
      }

      const data = await response.json();
      
      // Ensure we're handling the response correctly
      const newTestimonials = Array.isArray(data.testimonials) 
        ? data.testimonials 
        : Array.isArray(data) 
          ? data 
          : [];
          
      // Properly append new testimonials to existing ones
      setTestimonials(prev => [...prev, ...newTestimonials]);
      setCurrentPage(nextPage);
    } catch (err) {
      console.error("Error fetching more testimonials:", err);
      setError("Failed to load more testimonials. Please try again.");
    } finally {
      setLoadingMore(false);
    }
  };

  // Fetch recent testimonials
  const fetchRecentTestimonials = async () => {
    setRecentLoading(true);
    setRecentError(null);
    
    try {
      const response = await fetch(`${apiUrl}/testimonials/recent`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch recent testimonials");
      }
      
      const data = await response.json();
      // Handle both array response and object with testimonials property
      const testimonialArray = Array.isArray(data) 
        ? data 
        : Array.isArray(data.testimonials) 
          ? data.testimonials 
          : [];
          
      setRecentTestimonials(testimonialArray);
    } catch (err) {
      console.error("Error fetching recent testimonials:", err);
      setRecentError("Failed to load recent testimonials");
      // Set empty array to prevent errors
      setRecentTestimonials([]);
    } finally {
      setRecentLoading(false);
    }
  };

  // Reset testimonials state
  const resetTestimonials = () => {
    setTestimonials([]);
    setCurrentPage(1);
    setError(null);
  };

  const value = {
    apiUrl,
    testimonials,
    loading,
    loadingMore,
    error,
    currentPage,
    totalPages,
    recentTestimonials,
    recentLoading,
    recentError,
    fetchTestimonials,
    loadMoreTestimonials,
    fetchRecentTestimonials,
    resetTestimonials
  };

  return (
    <TestimonialsContext.Provider value={value}>
      {children}
    </TestimonialsContext.Provider>
  );
};