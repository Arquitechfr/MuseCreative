import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  deleteUser,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  query,
  getDocs,
} from "firebase/firestore";
import { auth, googleProvider, db } from "../firebase";

export interface UserProfile {
  uid: string;
  prenom: string;
  email: string;
  consent: boolean;
  provider: "password" | "google";
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
  signUp: (email: string, password: string, prenom: string, consent: boolean) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            setProfile(userDoc.data() as UserProfile);
          } else {
            const newProfile: UserProfile = {
              uid: firebaseUser.uid,
              prenom: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "",
              email: firebaseUser.email || "",
              consent: false,
              provider: "google",
            };
            await setDoc(doc(db, "users", firebaseUser.uid), newProfile);
            setProfile(newProfile);
          }
        } catch (err) {
          console.error("Error loading user profile:", err);
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, prenom: string, consent: boolean) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName: prenom });

    const newProfile: UserProfile = {
      uid: credential.user.uid,
      prenom,
      email,
      consent,
      provider: "password",
    };
    await setDoc(doc(db, "users", credential.user.uid), newProfile);
    setProfile(newProfile);
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    const credential = await signInWithPopup(auth, googleProvider);
    const userDoc = await getDoc(doc(db, "users", credential.user.uid));
    if (!userDoc.exists()) {
      const newProfile: UserProfile = {
        uid: credential.user.uid,
        prenom: credential.user.displayName || credential.user.email?.split("@")[0] || "",
        email: credential.user.email || "",
        consent: false,
        provider: "google",
      };
      await setDoc(doc(db, "users", credential.user.uid), newProfile);
      setProfile(newProfile);
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const deleteAccount = async () => {
    if (!auth.currentUser) return;

    const uid = auth.currentUser.uid;

    const favoritesQuery = query(collection(db, "users", uid, "favorites"));
    const favoritesSnap = await getDocs(favoritesQuery);
    const deletePromises = favoritesSnap.docs.map((d) => deleteDoc(d.ref));
    await Promise.all(deletePromises);

    await deleteDoc(doc(db, "users", uid));

    await deleteUser(auth.currentUser);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isAuthenticated: !!user,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
        resetPassword,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
