import type { Dispatch, SetStateAction } from "react";

//interface for user's data(to be used at signup route)
export interface UserData {
  uid: string;
  email: string | null;
  username: string;
  balance: number;
  /** total expenses stored in Firestore */
  expense?: number;
  createdAt: Date;
  role: string;
}

//interface for useAuth hook
export interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  error: string | null;
}

//interface for transactions list
export interface searchFilters {
  search: string;
  category: string;
  range: string;
}

//interface for income and expense dialogs
export interface DialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

//interface for transactions
export interface transactionsProps {
  transactions: any[];
  setTransactions: Dispatch<SetStateAction<any[]>>;
  delete: (transactionID: string) => Promise<void>;
}

//interface for signup and signin routes
export interface FormValue {
  amount: number;
  category: string;
  date: Date;
  description: string;
}

//interface for budget dialog
export interface BudgetFormValue {
  amount: number;
  category: string;
  date: Date;
}

