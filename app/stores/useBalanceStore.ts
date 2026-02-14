import { create } from 'zustand';
import { getFirestore, doc, updateDoc, increment } from 'firebase/firestore';

interface BalanceState {
  balance: number;
  increase: (by: number, userId: string) => Promise<void>;
  decrease: (by: number, userId: string) => Promise<void>;
  setBalance: (newBalance: number) => void; // para sincronizar desde Auth
}

export const useBalanceStore = create<BalanceState>((set, get) => ({
  balance: 0,
  increase: async (by, userId) => {
    // Optimistic update: actualiza localmente primero
    set((state) => ({ balance: state.balance + by }));
    try {
      const db = getFirestore();
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        balance: increment(by) // Usa increment para evitar race conditions
      });
    } catch (error) {
      // Si falla, revertir el cambio local (o manejarlo según tu lógica)
      set((state) => ({ balance: state.balance - by }));
      console.error('Error actualizando balance en Firestore:', error);
    }
  },
  decrease: async (by, userId) => {
    set((state) => ({ balance: state.balance - by }));
    try {
      const db = getFirestore();
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        balance: increment(-by)
      });
    } catch (error) {
      set((state) => ({ balance: state.balance + by }));
      console.error('Error actualizando balance en Firestore:', error);
    }
  },
  setBalance: (newBalance) => set({ balance: newBalance })
}));