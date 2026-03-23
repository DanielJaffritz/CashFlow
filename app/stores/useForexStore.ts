import { persist } from 'zustand/middleware'
import { create } from 'zustand';
import { forexApiKey, forexApiUrl } from '~/config/forex';

interface ForexState {
  data: {};
  principal: {};
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;

}

//store for saving change rates of the day
export const useForexStore = create<ForexState>()(
  persist(
    (set, get) => ({
      data: {},
      principal: {},
      loading: false,
      error: null,
      fetchData: async () => {
        if (Object.keys(get().data).length !== 0) return;
        set({ loading: true, error: null });
        try {
          const response = await fetch(`${forexApiUrl}${forexApiKey}/latest/USD`)
          const result = await response.json();
          const conversion = result.conversion_rates;
          const mainThree = { "USD/EUR": conversion.EUR, "USD/GBP": conversion.GBP, "USD/CNY": conversion.CNY }
          set({ data: conversion, principal: mainThree, loading: false })
        } catch (error) {
          set({ error: 'failed to fetch data', loading: false });
        }
      }
    }),
    { name: 'user-storage' }
  )
)
