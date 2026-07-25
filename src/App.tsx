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

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#D55C66]/30 border-t-[#D55C66] rounded-full animate-spin" />
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
    <div className="min-h-screen bg-gradient-to-br from-[#FFF0E6] via-[#FFC5B5] to-[#FFA095] text-[#2d1b15] flex flex-col selection:bg-[#F4C2C2]/30 selection:text-[#5c1d24] relative overflow-x-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] rounded-full bg-[#FBC8A6]/30" />
        <div className="absolute top-[20%] right-[-10%] w-[55vw] h-[55vw] max-w-[450px] max-h-[450px] rounded-full bg-[#F7D6D6]/30" />
        <div className="absolute bottom-[-10%] right-[10%] w-[50vw] h-[50vw] max-w-[400px] max-h-[400px] rounded-full bg-[#F7D6D6]/25" />
      </div>

      <ScrollToTop />
      <Header />

      <main className="flex-grow py-6 relative">
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
