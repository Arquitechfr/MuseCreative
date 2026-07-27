import { createContext, useContext, useState, ReactNode } from "react";
import AuthModal, { AuthModalMode } from "../components/auth/AuthModal";

interface AuthModalContextType {
  isOpen: boolean;
  openAuthModal: (mode?: AuthModalMode, title?: string) => void;
  closeAuthModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthModalMode>("login");
  const [title, setTitle] = useState<string | undefined>(undefined);

  const openAuthModal = (m: AuthModalMode = "login", t?: string) => {
    setMode(m);
    setTitle(t);
    setIsOpen(true);
  };

  const closeAuthModal = () => {
    setIsOpen(false);
    setTitle(undefined);
  };

  return (
    <AuthModalContext.Provider value={{ isOpen, openAuthModal, closeAuthModal }}>
      {children}
      <AuthModal isOpen={isOpen} initialMode={mode} onClose={closeAuthModal} title={title} />
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error("useAuthModal must be used within AuthModalProvider");
  return ctx;
}
