import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth } from "@/app/firebase/config"; 

interface AuthContextType {
  currentUser: FirebaseUser | null|any;
  signUp: (firstName:string, lastName:string, email: string, password: string) => Promise<void|any>;
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signUp = (email: string, password: string) => {
      return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: string, password: string) => {
      return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
      return signOut(auth);
  };

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          setCurrentUser(user);
          setIsLoading(false);
      });
      return unsubscribe;
  }, []);

  const value:any = {
      currentUser,
      signUp,
      signIn,
      logOut,
  };

  return (
      <AuthContext.Provider value={value}>
          {!isLoading && children}
      </AuthContext.Provider>
  );
};
