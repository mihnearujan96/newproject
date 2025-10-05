import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

export type PlanDetails = {
  eventType: string;
  date: string;
  location: string;
  budget?: string;
};

type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  city?: string;
  yearOfBirth?: number | string;
};

type AuthContextValue = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (profile: UserProfile & { password: string }) => Promise<void>;
  logout: () => void;
  planDetails: PlanDetails | null;
  setPlanDetails: (details: PlanDetails | null) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AUTH_STORAGE_KEY = "eventia.auth";

export function AuthProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.localStorage.getItem(AUTH_STORAGE_KEY) === "true";
  });
  const [planDetails, setPlanDetails] = useState<PlanDetails | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(
      AUTH_STORAGE_KEY,
      isAuthenticated ? "true" : "false",
    );
  }, [isAuthenticated]);

  const login = async (_email: string, _password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setIsAuthenticated(true);
  };

  const register = async (profile: UserProfile & { password: string }) => {
    // In a real app, POST to an API. Here we persist a demo profile in localStorage
    if (typeof window !== "undefined") {
      window.localStorage.setItem("eventia.user", JSON.stringify(profile));
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setPlanDetails(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("eventia.user");
    }
  };

  const value: AuthContextValue = {
    isAuthenticated,
    login,
    register,
    logout,
    planDetails,
    setPlanDetails,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
