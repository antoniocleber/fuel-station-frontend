import { useCallback } from 'react'
import { notificationStore } from '@/stores/notificationStore'

export type NotificationType = 'success' | 'error' | 'info' | 'warning'

export const useNotification = () => {
  const addNotification = notificationStore(state => state.addNotification)

  const showNotification = useCallback(
    (message: string, type: NotificationType = 'info', duration = 3000) => {
      addNotification({ message, type, duration })
    },
    [addNotification]
  )

  return { showNotification }
}
