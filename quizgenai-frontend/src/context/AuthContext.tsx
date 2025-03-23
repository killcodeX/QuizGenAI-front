"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Import js-cookie

interface AuthContextType {
  user: any;
  token: string | null;
  login: (token: string, userData: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = Cookies.get("token"); // Fetch from cookies
    const storedUser = localStorage.getItem("user");

    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (token: string, userData: any) => {
    setToken(token);
    setUser(userData);

    // Store in localStorage (for client-side access)
    localStorage.setItem("user", JSON.stringify(userData));

    // Store in HTTP cookies (for middleware access)
    Cookies.set("token", token, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("user");

    // Remove from cookies
    Cookies.remove("token");

    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
