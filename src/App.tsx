import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import { AuthProvider } from "./components/auth/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Lazy load routes for better performance
const LoginPage = lazy(() => import("./routes/login"));
const SignupPage = lazy(() => import("./routes/signup"));
const ForgotPasswordPage = lazy(() => import("./routes/forgot-password"));
const ResetPasswordPage = lazy(() => import("./routes/reset-password"));
const ProfilePage = lazy(() => import("./routes/profile"));
const DashboardPage = lazy(() => import("./routes/dashboard"));
const RafflesPage = lazy(() => import("./routes/raffles"));
const RaffleDetailPage = lazy(() => import("./routes/raffle-detail"));
const RewardsPage = lazy(() => import("./routes/rewards"));
const AdminPage = lazy(() => import("./routes/admin"));
const PaymentMethodsPage = lazy(() => import("./routes/payment-methods"));

function App() {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <p>Loading...</p>
          </div>
        }
      >
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rewards"
              element={
                <ProtectedRoute>
                  <RewardsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment-methods"
              element={
                <ProtectedRoute>
                  <PaymentMethodsPage />
                </ProtectedRoute>
              }
            />
            <Route path="/raffles" element={<RafflesPage />} />
            <Route path="/raffle/:id" element={<RaffleDetailPage />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
