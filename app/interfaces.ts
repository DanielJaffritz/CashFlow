import type { Dispatch, SetStateAction } from "react";

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

export interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  error: string | null;
}
export interface searchFilters {
  search: string;
  category: string;
  range: string;
}

export interface DialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface FormValue {
  amount: number;
  category: string;
  date: string;
  description: string;
}

export interface BudgetFormValue {
  amount: number;
  category: string;
  date: Date;
}

