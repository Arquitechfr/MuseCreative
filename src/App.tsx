import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeFlow from "./pages/HomeFlow";
import DashboardPage from "./pages/DashboardPage";
import FavoritesPage from "./pages/FavoritesPage";
import SettingsPage from "./pages/SettingsPage";
import LegalNoticePage from "./pages/LegalNoticePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ScrollToTop from "./components/ScrollToTop";
import GoldDust from "./components/olympe/GoldDust";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#B89A62]/30 border-t-[#8F7242] rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,#FFFDF8_0%,#FAF8F5_60%)] text-[#1A1715] flex flex-col selection:bg-[#C5A876]/20 selection:text-[#1A1715] relative overflow-x-hidden">
      <GoldDust />

      <ScrollToTop />
      <Header />

      <main className="flex-grow py-8 relative z-[2]">
        <Routes>
          <Route path="/" element={<HomeFlow />} />
          <Route path="/mon-espace" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/mes-favoris" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
          <Route path="/parametres" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="/mentions-legales" element={<LegalNoticePage />} />
          <Route path="/politique-de-confidentialite" element={<PrivacyPolicyPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
