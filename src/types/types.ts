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

export interface Testimonial {
  _id: string;
  user: string;
  name: string;
  avatar?: string;
  content: string;
  rating: number;
  isApproved: boolean;
  position?: string;
  company?: string;
  createdAt: string;
  updatedAt: string;
}

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
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
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

// Replace empty interfaces with type aliases
export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export interface ApiKeyDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  triggerButton?: React.ReactNode;
}

export interface DocNavigationProps {
  navItems: NavItem[];
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export interface PaginatedResponse {
  testimonials: Testimonial[];
  totalPages: number;
  currentPage: number;
  totalTestimonials: number;
}

export interface TestimonialsContextType {
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

export interface TestimonialsProviderProps {
  children: ReactNode;
}

export type Message = {
  role: "user" | "assistant";
  content: string;
};

export type ModelOption = {
  id: string;
  name: string;
  category: "creative" | "sentiment" | "conversation";
  description: string;
};

export type DemoContextType = {
  apiKey: string;
  setApiKey: (key: string) => void;
  isKeyValid: boolean;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  messages: Message[];
  inputMessage: string;
  setInputMessage: (message: string) => void;
  isLoading: boolean;
  modelCategory: "creative" | "sentiment" | "conversation";
  setModelCategory: (
    category: "creative" | "sentiment" | "conversation"
  ) => void;
  modelOptions: ModelOption[];
  filteredModels: ModelOption[];
  validateApiKey: () => void;
  handleSendMessage: () => Promise<void>;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  handleClearChat: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
};
