import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VendorSetup from "./pages/VendorSetup";
import AccountDashboard from "./pages/AccountDashboard";
import Packages from "./pages/Packages";
import VendorDetails from "./pages/VendorDetails";
import { MainLayout } from "./layouts/MainLayout";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Confirmation from "./pages/Confirmation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
            <Route
              path="/"
              element={
                <MainLayout>
                  <Index />
                </MainLayout>
              }
            />
            <Route
              path="/login"
              element={
                <MainLayout>
                  <Login />
                </MainLayout>
              }
            />
            <Route
              path="/register"
              element={
                <MainLayout>
                  <Register />
                </MainLayout>
              }
            />
            <Route
              path="/vendor/setup"
              element={
                <MainLayout>
                  <VendorSetup />
                </MainLayout>
              }
            />
            <Route
              path="/vendor/dashboard"
              element={
                <MainLayout>
                  <AccountDashboard />
                </MainLayout>
              }
            />
            <Route
              path="/account"
              element={
                <MainLayout>
                  <AccountDashboard />
                </MainLayout>
              }
            />
            <Route
              path="/packages"
              element={
                <MainLayout>
                  <Packages />
                </MainLayout>
              }
            />
            <Route
              path="/vendor/:slug"
              element={
                <MainLayout>
                  <VendorDetails />
                </MainLayout>
              }
            />
            <Route
              path="/confirmation"
              element={
                <MainLayout>
                  <Confirmation />
                </MainLayout>
              }
            />
            <Route
              path="*"
              element={
                <MainLayout>
                  <NotFound />
                </MainLayout>
              }
            />
          </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
