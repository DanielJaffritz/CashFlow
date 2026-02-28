import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useBalanceStore } from '~/stores/useBalanceStore';
import type { AuthContextType, UserData } from '~/interfaces';



const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // Obtener datos adicionales del usuario desde Firestore
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userIdDoc = await getDoc(userDocRef);

          if (userIdDoc.exists()) {
            const userData = userIdDoc.data();
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              username: userData.username,
              balance: userData.balance,
              createdAt: userData.createdAt?.toDate?.() || new Date(),
              role: userData.role,
            });
            // sync zustand store with Firestore values (balance + expense)
            useBalanceStore.getState().setBalance(userData.balance || 0);
            // userData might not contain expense if document was created
            if (typeof userData.expense === 'number') {
              useBalanceStore.getState().setExpense(userData.expense);
            }
          }
        } else {
          setUser(null);
        }
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar usuario');
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
}
