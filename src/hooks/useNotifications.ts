// Custom hook that combines useNotification with helper functions
import { useNotification } from '../contexts/NotificationContext';
import { createNotificationHelpers } from '../utils/notifications';

export function useNotifications() {
  const api = useNotification();
  const helpers = createNotificationHelpers(api);

  return {
    ...api,
    ...helpers,
  };
}
