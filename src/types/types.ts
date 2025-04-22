import { ReactNode } from "react";

// Define the user interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  picture?: string;
  isAdmin: boolean;
}

export interface LoginProps {
  success: true;
  token: string;
  user: User;
}

// Define the auth context type
export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  refreshUserData: () => Promise<void>;
  fetchUserProfile: (token: string) => Promise<void>;
  saveUserDataToCookies: (userData: LoginProps) => Promise<void>;
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
  apiKey?: string;
  setApiKey?: (value: string) => void;
  handleSubmit?: (e: React.FormEvent) => void;
  triggerButton?: React.ReactNode;
  initialApiKey?: string;
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

export type ModelOption = {
  id: string;
  name: string;
  category: "creative" | "sentiment" | "conversation";
  description: string;
};

export interface DemoContextType {
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
  isDemo: boolean;
  setIsDemo: (value: boolean) => void;
  handleApiKeySubmit: (newApiKey: string) => boolean;
  generatingMessageId: string | null;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  messageCount: number;
  showLoginModal: boolean;
}

export interface ApiKeyModalContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  sourceSection: string;
  setSourceSection: (section: string) => void;
}

// Chat history item component
export interface ChatHistoryItemProps {
  chat: ChatSession;
  isActive: boolean;
  onClick: () => void;
  onDelete: () => void;
}

export interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  chatSessions: ChatSession[];
  activeChat: ChatSession | null;
  selectChat: (id: string) => void;
  createNewChat: () => void;
  deleteChat: (id: string) => void;
}

export interface ChatSession {
  id: string;
  title: string;
  modelCategory: string;
  modelId: string | null;
  messages: Message[];
  createdAt: Date;
}

export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

export interface DashboardContextType {
  chatSessions: ChatSession[];
  activeChatId: string | null;
  apiKey: string;
  setApiKey: (key: string) => void;
  createNewChat: () => void;
  selectChat: (id: string) => void;
  deleteChat: (id: string) => void;
  setModelCategory: (chatId: string, category: string) => void;
  setModel: (chatId: string, modelId: string) => void;
  availableModels: ModelOption[];
  addMessage: (
    chatId: string,
    message: Omit<Message, "id" | "timestamp">
  ) => void;
  isModelSelectionLocked: (chatId: string) => boolean;
  getActiveChat: () => ChatSession | null;
  sendMessage: (chatId: string, content: string) => Promise<void>;
  clearChat: (chatId: string) => void;
  renameChat: (chatId: string, newTitle: string) => void;
}

export interface DashboardApiKeyInputProps {
  value: string;
  onChange: (value: string) => void;
}

export interface DashboardMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

export interface DashboardChatInterfaceProps {
  messages: DashboardMessage[];
  onSendMessage: (content: string) => void;
  isModelSelected: boolean;
  isKeyValid?: boolean;
  isLoading?: boolean;
  onClearChat?: () => void;
}

export interface DashboardMessageProps {
  message: {
    id: string;
    role: "user" | "assistant" | "system";
    content: string;
  };
  generatingMessageId: string | null;
  modelCategory?: string;
}

export interface DashboardModelSelectorProps {
  isDisabled: boolean;
  selectedCategory: string;
  selectedModel: string;
  onCategoryChange: (category: string) => void;
  onModelChange: (modelId: string) => void;
}

export interface ModelSelectorProps {
  categoryRef: React.RefObject<HTMLDivElement | null>;
  modelRef: React.RefObject<HTMLDivElement | null>;
  tourStep: number | null;
  nextTourStep: () => void;
  closeTour: () => void;
  isDisabled?: boolean;
}

export interface SentimentResult {
  originalText: string;
  primarySentiment: {
    label: string;
    confidence: string;
  };
  allSentiments: Array<{
    sentiment: string;
    confidence: string;
  }>;
}

export interface MessageDisplayProps {
  message: Message;
  generatingMessageId: string | null;
  modelCategory: "creative" | "sentiment" | "conversation";
}

export interface ApiKeyInputProps {
  apiKeyRef: React.RefObject<HTMLDivElement | null>;
  tourStep: number | null;
  nextTourStep: () => void;
}

export interface TourGuideProps {
  tourStep: number | null;
  closeTour: () => void;
  nextTourStep: () => void;
}
