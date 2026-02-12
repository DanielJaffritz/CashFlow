import {create} from 'zustand';

interface balanceState {
    balance:number;
    increase: (by: number) => void
    decrease: (by: number) => void
}

export const useBalanceStore = create<balanceState>((set) =>({
    balance: 0,
    increase: (by) => set((state) => ({balance: state.balance + by})),
    decrease: (by) => set((state) => ({balance: state.balance - by})),
}))