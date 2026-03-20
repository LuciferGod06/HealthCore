"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  type User,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";

type AuthState = {
  user: User | null;
  loading: boolean;
  firebaseReady: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getFirebaseAuth();
  const firebaseReady = !!auth;

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, [auth]);

  const login = useCallback(
    async (email: string, password: string) => {
      if (auth) {
        await signInWithEmailAndPassword(auth, email, password);
        return;
      }
      throw new Error("Firebase is not configured for login.");
    },
    [auth]
  );

  const signup = useCallback(
    async (email: string, password: string) => {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("hc_skip_dashboard_redirect", "1");
      }
      if (auth) {
        await createUserWithEmailAndPassword(auth, email, password);
        await signOut(auth);
        return;
      }
      throw new Error("Firebase is not configured for sign up.");
    },
    [auth]
  );

  const logout = useCallback(async () => {
    if (auth) await signOut(auth);
  }, [auth]);

  const loginWithGoogle = useCallback(async () => {
    console.log("loginWithGoogle", auth);
    if (!auth) throw new Error("Firebase is not configured.");
    const provider = new GoogleAuthProvider();
    console.log("loginWithGoogle provider", provider);
    const result = await signInWithPopup(auth, provider);
    console.log("loginWithGoogle", result);
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        firebaseReady,
        login,
        signup,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth needs AuthProvider");
  return ctx;
}

export function useIsSignedIn() {
  const { user } = useAuth();
  return !!user;
}
