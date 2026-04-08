'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    addToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastIdCounter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((message: string, type: ToastType = 'success') => {
        const id = ++toastIdCounter;
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto-dismiss after 3 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    const removeToast = useCallback((id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const iconMap = {
        success: <CheckCircle size={18} className="text-brand-green shrink-0" />,
        error: <XCircle size={18} className="text-brand-terracotta shrink-0" />,
        info: <Info size={18} className="text-brand-gold shrink-0" />,
    };

    const bgMap = {
        success: 'bg-brand-ivory border-brand-green/20',
        error: 'bg-brand-ivory border-brand-terracotta/20',
        info: 'bg-brand-ivory border-brand-gold/20',
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}

            {/* Toast Container — fixed top-right */}
            <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2 pointer-events-none w-[340px] max-w-[calc(100vw-2rem)]">
                <AnimatePresence mode="popLayout">
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 80, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 80, scale: 0.95 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className={`pointer-events-auto flex items-start gap-3 px-4 py-3.5 border shadow-lg ${bgMap[toast.type]}`}
                        >
                            {iconMap[toast.type]}
                            <p className="flex-1 text-[13px] font-medium text-brand-text leading-snug font-sans">
                                {toast.message}
                            </p>
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="text-brand-muted hover:text-brand-text transition-colors shrink-0 mt-0.5"
                            >
                                <X size={14} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within ToastProvider');
    return context;
}
