import React, { createContext, useContext, useEffect, useState } from 'react';
import { get, set } from 'idb-keyval';

export interface HistoryItem {
    id: string;
    timestamp: number;
    imageData: string; // Base64
    prompt?: string;
}

interface HistoryContextType {
    history: HistoryItem[];
    isLoading: boolean;
    addToHistory: (imageData: string, prompt?: string) => Promise<void>;
    removeFromHistory: (id: string) => Promise<void>;
    clearHistory: () => Promise<void>;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

const STORAGE_KEY = 'zmp-tet-history';

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load history on mount
    useEffect(() => {
        const loadHistory = async () => {
            try {
                const stored = await get<HistoryItem[]>(STORAGE_KEY);
                if (stored) {
                    // Sort by newest first
                    setHistory(stored.sort((a, b) => b.timestamp - a.timestamp));
                }
            } catch (error) {
                console.error('Failed to load history:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadHistory();
    }, []);

    const addToHistory = async (imageData: string, prompt?: string) => {
        const newItem: HistoryItem = {
            id: Date.now().toString(36) + Math.random().toString(36).substring(2),
            timestamp: Date.now(),
            imageData,
            prompt,
        };

        const updatedHistory = [newItem, ...history];
        setHistory(updatedHistory);

        // Async save to IDB
        try {
            await set(STORAGE_KEY, updatedHistory);
        } catch (error) {
            console.error('Failed to save history item:', error);
        }
    };

    const removeFromHistory = async (id: string) => {
        const updatedHistory = history.filter(item => item.id !== id);
        setHistory(updatedHistory);
        try {
            await set(STORAGE_KEY, updatedHistory);
        } catch (error) {
            console.error('Failed to remove history item:', error);
        }
    };

    const clearHistory = async () => {
        setHistory([]);
        try {
            await set(STORAGE_KEY, []);
        } catch (error) {
            console.error('Failed to clear history:', error);
        }
    };

    return (
        <HistoryContext.Provider value={{ history, isLoading, addToHistory, removeFromHistory, clearHistory }}>
            {children}
        </HistoryContext.Provider>
    );
};

export const useHistory = () => {
    const context = useContext(HistoryContext);
    if (!context) {
        throw new Error('useHistory must be used within a HistoryProvider');
    }
    return context;
};
