import React, { createContext, useContext, useState, useCallback } from 'react';
import { Snackbar } from '@/app/components/Snackbar';
import { ConfirmDialog } from '@/app/components/ConfirmDialog';

interface SnackbarOptions {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

interface NotificationContextType {
  showSnackbar: (options: SnackbarOptions) => void;
  showConfirm: (options: ConfirmOptions) => Promise<boolean>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [snackbar, setSnackbar] = useState<SnackbarOptions & { show: boolean }>({
    show: false,
    message: '',
    type: 'info',
    duration: 4000,
  });

  const [confirm, setConfirm] = useState<{
    show: boolean;
    options: ConfirmOptions;
    resolve: ((value: boolean) => void) | null;
  }>({
    show: false,
    options: { message: '' },
    resolve: null,
  });

  const showSnackbar = useCallback((options: SnackbarOptions) => {
    setSnackbar({
      show: true,
      message: options.message,
      type: options.type || 'info',
      duration: options.duration || 4000,
    });
  }, []);

  const showConfirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirm({
        show: true,
        options,
        resolve,
      });
    });
  }, []);

  const handleSnackbarClose = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, show: false }));
  }, []);

  const handleConfirmResponse = useCallback((response: boolean) => {
    if (confirm.resolve) {
      confirm.resolve(response);
    }
    setConfirm({
      show: false,
      options: { message: '' },
      resolve: null,
    });
  }, [confirm.resolve]);

  return (
    <NotificationContext.Provider value={{ showSnackbar, showConfirm }}>
      {children}
      <Snackbar
        show={snackbar.show}
        message={snackbar.message}
        type={snackbar.type}
        duration={snackbar.duration}
        onClose={handleSnackbarClose}
      />
      <ConfirmDialog
        show={confirm.show}
        title={confirm.options.title}
        message={confirm.options.message}
        confirmText={confirm.options.confirmText}
        cancelText={confirm.options.cancelText}
        type={confirm.options.type}
        onConfirm={() => handleConfirmResponse(true)}
        onCancel={() => handleConfirmResponse(false)}
      />
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
}
