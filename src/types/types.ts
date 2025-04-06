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
