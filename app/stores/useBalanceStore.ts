import { create } from 'zustand';
import { getFirestore, doc, updateDoc, increment } from 'firebase/firestore';

interface BalanceState {
  balance: number;
  expense: number;
  increase: (by: number, userId: string) => Promise<void>;
  decrease: (by: number, userId: string) => Promise<void>;
  setBalance: (newBalance: number) => void; // para sincronizar desde Auth
  setExpense: (newExpense: number) => void; // para sincronizar desde Auth
}

export const useBalanceStore = create<BalanceState>()(
    (set) => ({
      balance: 0,
      expense: 0,
      
      increase: async (by, userId) => {
        set((state) => ({balance: state.balance + by}));
        try {
          const db = getFirestore();
          const userRef = doc(db, 'users', userId);
          await updateDoc(userRef, {
            balance: increment(by)
          });
        } catch(error) {
          set((state) => ({balance: state.balance - by}));
          console.error('Error updating balance in firestore', error);
        }
      },

      decrease: async (by, userId) => {
   
        set((state) => ({ 
          balance: state.balance - by,
          expense: state.expense + by
        }));
        
      
        try {
          const db = getFirestore();
          const userRef = doc(db, 'users', userId);
          await updateDoc(userRef, {
            balance: increment(-by),
            expense: increment(by)
             
          });
        } catch (error) {
          set((state) => ({ 
            balance: state.balance + by,
            expense: state.expense - by 
          }));
        }
      },

      setBalance: (newBalance) => set({ balance: newBalance }),
      setExpense: (newExpense) => set({ expense: newExpense }),
    }),
  );
