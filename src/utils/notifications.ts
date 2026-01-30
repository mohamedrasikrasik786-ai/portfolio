// Helper functions to use notifications easily throughout the app
// Import the useNotification hook and use these wrappers

export interface NotificationAPI {
  showSnackbar: (options: {
    message: string;
    type?: 'success' | 'error' | 'info' | 'warning';
    duration?: number;
  }) => void;
  showConfirm: (options: {
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'warning' | 'info';
  }) => Promise<boolean>;
}

// Convenience functions for common notification patterns
export function createNotificationHelpers(api: NotificationAPI) {
  return {
    // Success message
    success: (message: string, duration?: number) => {
      api.showSnackbar({ message, type: 'success', duration });
    },

    // Error message
    error: (message: string, duration?: number) => {
      api.showSnackbar({ message, type: 'error', duration });
    },

    // Info message
    info: (message: string, duration?: number) => {
      api.showSnackbar({ message, type: 'info', duration });
    },

    // Warning message
    warning: (message: string, duration?: number) => {
      api.showSnackbar({ message, type: 'warning', duration });
    },

    // Confirm dialog for dangerous actions (delete, etc.)
    confirmDelete: async (itemName?: string) => {
      return api.showConfirm({
        title: 'Confirm Delete',
        message: itemName 
          ? `Are you sure you want to delete "${itemName}"? This action cannot be undone.`
          : 'Are you sure you want to delete this? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
        type: 'danger',
      });
    },

    // Confirm dialog for general actions
    confirm: async (message: string, title?: string) => {
      return api.showConfirm({
        title: title || 'Confirm',
        message,
        confirmText: 'Confirm',
        cancelText: 'Cancel',
        type: 'info',
      });
    },

    // Warning confirmation
    confirmWarning: async (message: string, title?: string) => {
      return api.showConfirm({
        title: title || 'Warning',
        message,
        confirmText: 'Continue',
        cancelText: 'Cancel',
        type: 'warning',
      });
    },
  };
}
