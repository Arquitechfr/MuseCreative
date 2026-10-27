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
import AntiqueMarbleMusePresence from "./components/AntiqueMarbleMusePresence";

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
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1715] flex flex-col selection:bg-[#C5A876]/20 selection:text-[#1A1715] relative overflow-x-hidden stone-paper-grain">
      {/* Atmosphère : lumière de musée diffuse + Muse en marbre en bas-relief */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        <div className="absolute -top-[15%] left-[10%] w-[65vw] h-[50vw] max-w-[800px] max-h-[600px] rounded-full bg-gradient-to-b from-[#F5EFE3]/50 to-[#EAE3D4]/20 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[55vw] h-[50vw] max-w-[700px] max-h-[550px] rounded-full bg-gradient-to-tl from-[#F4EFE6]/40 to-transparent blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full border border-[#B89A62]/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full border border-[#B89A62]/3" />
        <AntiqueMarbleMusePresence />
      </div>

      <ScrollToTop />
      <Header />

      <main className="flex-grow py-8 relative z-10">
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
