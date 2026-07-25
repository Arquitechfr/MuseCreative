import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { GeneratedIdea } from "../types";

export interface FavoriteItem extends GeneratedIdea {
  id: string;
  etape: string;
  createdAt: number;
}

export async function addFavorite(uid: string, idea: GeneratedIdea, etape: string): Promise<string> {
  const docRef = await addDoc(collection(db, "users", uid, "favorites"), {
    idee: idea.idee,
    originalIdee: idea.originalIdee,
    accroche: idea.accroche,
    structure: idea.structure,
    pourquoi_ca_marche: idea.pourquoi_ca_marche,
    etape,
    createdAt: Date.now(),
  });
  return docRef.id;
}

export async function removeFavorite(uid: string, favoriteId: string): Promise<void> {
  await deleteDoc(doc(db, "users", uid, "favorites", favoriteId));
}

export async function getFavorites(uid: string): Promise<FavoriteItem[]> {
  const q = query(collection(db, "users", uid, "favorites"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as FavoriteItem[];
}

export function subscribeToFavorites(uid: string, callback: (favorites: FavoriteItem[]) => void): () => void {
  const q = query(collection(db, "users", uid, "favorites"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as FavoriteItem[]);
  });
}

export async function isFavorite(uid: string, ideaIdee: string): Promise<boolean> {
  const q = query(collection(db, "users", uid, "favorites"), where("originalIdee", "==", ideaIdee));
  const snap = await getDocs(q);
  return !snap.empty;
}
