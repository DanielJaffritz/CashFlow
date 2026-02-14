import type { Dispatch, SetStateAction } from "react";

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
    date:string;
    description:string;
    file: File | null;
}
