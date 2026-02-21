import type { Dispatch, SetStateAction } from "react";

export interface UserData {
  uid: string;
  email: string | null;
  username: string;
  balance:number;
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
    amount:number;
    category:string;
    date: string;
    description:string;
    file: File | null;
}
