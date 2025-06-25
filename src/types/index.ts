// types/index.ts
import { User } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

export interface Message {
  id: string;
  userId: string;
  message: string;
  isAI: boolean;
  timestamp: Timestamp | null;
  createdAt: string;
  updatedAt?: Timestamp;
}

export interface AuthContextType {
  currentUser: User | null;
  signup: (email: string, password: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<any>;
}

export interface MessageInput {
  userId: string;
  message: string;
  isAI: boolean;
}