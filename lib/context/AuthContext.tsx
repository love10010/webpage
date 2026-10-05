"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter, usePathname } from "next/navigation";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "farmer" | "admin";
  farmName?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (data: RegisterData) => Promise<{ error?: string }>;
  logout: () => void;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  farmName: string;
}

const AUTH_KEY = "mango_portal_user";
const ACCOUNTS_KEY = "mango_portal_accounts";

interface StoredAccount {
  email: string;
  passwordHash: string;
  user: User;
}

const getStoredAccounts = (): StoredAccount[] => {
  const stored = localStorage.getItem(ACCOUNTS_KEY);
  if (!stored) return [];

  const parsed: unknown = JSON.parse(stored);
  return Array.isArray(parsed) ? (parsed as StoredAccount[]) : [];
};

const hashPassword = async (password: string): Promise<string> => {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(password)
  );
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => ({ error: "Sign-in is not available." }),
  register: async () => ({ error: "Registration is not available." }),
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUTH_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as User;
        if (parsed.id !== "usr_001" && parsed.name !== "Rajesh Patil") {
          setUser(parsed);
        } else {
          localStorage.removeItem(AUTH_KEY);
        }
      }
    } catch {
      localStorage.removeItem(AUTH_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Redirect logic: unauthenticated → /login; authenticated on auth routes → /
  useEffect(() => {
    if (isLoading) return;
    const isAuthRoute = pathname === "/login" || pathname === "/register";
    if (!user && !isAuthRoute) {
      router.replace("/login");
    } else if (user && isAuthRoute) {
      router.replace("/");
    }
  }, [user, isLoading, pathname, router]);

  const login = useCallback(async (email: string, password: string) => {
    if (!email.trim() || !password) {
      return { error: "Please enter your email and password." };
    }
    const normalizedEmail = email.trim().toLowerCase();
    const account = getStoredAccounts().find(
      (savedAccount) => savedAccount.email === normalizedEmail
    );
    if (!account) {
      return { error: "No account found with that email. Create an account first." };
    }
    if (account.passwordHash !== await hashPassword(password)) {
      return { error: "Incorrect email or password." };
    }
    setUser(account.user);
    localStorage.setItem(AUTH_KEY, JSON.stringify(account.user));
    router.push("/");
    return {};
  }, [router]);

  const register = useCallback(async (data: RegisterData) => {
    if (!data.name.trim() || !data.email.trim() || !data.password || !data.phone.trim()) {
      return { error: "All fields are required." };
    }
    if (data.password.length < 6) {
      return { error: "Password must be at least 6 characters." };
    }
    const normalizedEmail = data.email.trim().toLowerCase();
    const accounts = getStoredAccounts();
    if (accounts.some((account) => account.email === normalizedEmail)) {
      return { error: "An account with this email already exists. Sign in instead." };
    }
    const newUser: User = {
      id: `preview_${Date.now()}`,
      name: data.name.trim(),
      email: normalizedEmail,
      phone: data.phone.trim(),
      role: "farmer",
      farmName: data.farmName.trim(),
    };
    accounts.push({
      email: normalizedEmail,
      passwordHash: await hashPassword(data.password),
      user: newUser,
    });
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    setUser(newUser);
    localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
    router.push("/");
    return {};
  }, [router]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
