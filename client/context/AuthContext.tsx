import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";

export type PlanDetails = {
  eventType: string;
  date: string;
  location: string;
  budget?: string;
};

type AuthContextValue = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  planDetails: PlanDetails | null;
  setPlanDetails: (details: PlanDetails | null) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AUTH_STORAGE_KEY = "eventia.auth";

export function AuthProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return window.localStorage.getItem(AUTH_STORAGE_KEY) === "true";
  });
  const [planDetails, setPlanDetails] = useState<PlanDetails | null>(null);

  useEffect(() => {
    window.localStorage.setItem(AUTH_STORAGE_KEY, isAuthenticated ? "true" : "false");
  }, [isAuthenticated]);

  const login = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const value = useMemo<AuthContextValue>(
    () => ({ isAuthenticated, login, logout, planDetails, setPlanDetails }),
    [isAuthenticated, planDetails],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
