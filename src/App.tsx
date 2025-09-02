import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Navigation } from '@/components/Navigation';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';
import { SalespersonDashboard } from '@/components/dashboard/SalespersonDashboard';
import { PurchaseDashboard } from '@/components/dashboard/PurchaseDashboard';
import { VendorDashboard } from '@/components/dashboard/VendorDashboard';
import { Profile } from '@/components/Profile';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function DashboardRoute() {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case 'salesperson':
      return <SalespersonDashboard />;
    case 'purchase':
      return <PurchaseDashboard />;
    case 'vendor':
      return <VendorDashboard />;
    default:
      return <SalespersonDashboard />;
  }
}

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/login" element={
            user ? <Navigate to="/dashboard" replace /> : <LoginForm />
          } />
          <Route path="/signup" element={
            user ? <Navigate to="/dashboard" replace /> : <SignupForm />
          } />
          <Route path="/" element={
            <ProtectedRoute>
              <Navigation />
              <div className="container mx-auto px-4 py-8">
                <Navigate to="/dashboard" replace />
              </div>
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Navigation />
              <div className="container mx-auto px-4 py-8">
                <DashboardRoute />
              </div>
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute>
              <Navigation />
              <div className="container mx-auto px-4 py-8">
                <DashboardRoute />
              </div>
            </ProtectedRoute>
          } />
          <Route path="/reports" element={
            <ProtectedRoute>
              <Navigation />
              <div className="container mx-auto px-4 py-8">
                <DashboardRoute />
              </div>
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Navigation />
              <div className="container mx-auto px-4 py-8">
                <Profile />
              </div>
            </ProtectedRoute>
          } />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;