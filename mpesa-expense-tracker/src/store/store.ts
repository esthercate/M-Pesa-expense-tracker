import { create } from 'zustand';
import { SummaryEntry, TransactionEntry } from '@/types/mpesa';

interface AppState { 
  pdfFile: File | null;
  summary: SummaryEntry[];
  transactions: TransactionEntry[];
  error: string;
  setPdfFile: (pdfFile: File | null) => void;
  setSummary: (summary: SummaryEntry[]) => void;
  setTransactions: (transactions: TransactionEntry[]) => void;
  setError: (error: string) => void;
}

export const useStore = create<AppState>((set) => ({
  summary: [],
  transactions: [],
  pdfFile: null,
  error: '',
  setPdfFile: (pdfFile) => set({ pdfFile }),
  setSummary: (summary) => set({ summary }),
  setTransactions: (transactions) => set({ transactions }),
  setError: (error) => set({ error }),
}));