// User interface for authentication
export interface User {
  id: string;
  fullName: string;
  email: string;
  nationality: string;
  purpose: 'tourism' | 'study' | 'business';
  createdAt: string;
  updatedAt: string;
}

// Registration data interface
export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  nationality: string;
  purpose: 'tourism' | 'study' | 'business';
}

// Login data interface
export interface LoginData {
  email: string;
  password: string;
}

// API response interfaces
export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

export interface ErrorResponse {
  success: false;
  message: string;
  error?: string;
}

// JWT payload interface (for decoded tokens)
export interface JwtPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}
