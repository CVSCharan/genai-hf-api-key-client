import { ReactNode } from "react";

// Define the user type
export interface User {
  id: string;
  email: string;
  name?: string;
  picture?: string;
}

// Define the auth context type
export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export type Testimonial = {
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

export interface TourStepProps {
  step: number;
  title: string;
  description: string;
  position?: "top" | "bottom" | "left" | "right";
  onClose: (skipAll?: boolean) => void;
}

export interface HeroSectionProps {
  apiKey: string;
  setApiKey: (value: string) => void;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface TechItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
}

export interface CTASectionProps {
  apiKey: string;
  setApiKey: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export interface NavItem {
  id: string;
  title: string;
  icon: ReactNode;
  children?: { id: string; title: string }[];
}

export interface DocSection {
  title: string;
  content: ReactNode;
}

export type SparklesCoreProps = {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
