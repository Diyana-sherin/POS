
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { AuthProvider } from './presentation/context/AuthContext';
import { LoginPage } from './presentation/pages/LoginPage';
import { RegisterPage } from './presentation/pages/RegisterPage';
import { AdminDashboardPage } from './presentation/pages/AdminDashboardPage';
import { EmployeeDashboardPage } from './presentation/pages/EmployeeDashboard';
import { ProtectedRoute } from './presentation/component/auth/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes - Admin Only */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />

            {/* Protected Routes - Employee Only */}
            <Route
              path="/employee/dashboard"
              element={
                <ProtectedRoute allowedRoles={['employee']}>
                  <EmployeeDashboardPage />
                </ProtectedRoute>
              }
            />

            {/* Default Redirect to /login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Unauthorized Page */}
            <Route
              path="/unauthorized"
              element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                      Unauthorized Access
                    </h1>
                    <p className="text-gray-600">
                      You don't have permission to access this page.
                    </p>
                  </div>
                </div>
              }
            />

            {/* 404 - Not Found */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                      Page Not Found
                    </h1>
                    <p className="text-gray-600">
                      The page you're looking for doesn't exist.
                    </p>
                  </div>
                </div>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
