import { create } from 'zustand'

export interface Notification {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration: number
}

interface NotificationStore {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
}

export const notificationStore = create<NotificationStore>(set => ({
  notifications: [],
  addNotification: notification => {
    const id = Date.now().toString()
    set(state => ({
      notifications: [...state.notifications, { ...notification, id }],
    }))
    setTimeout(
      () =>
        set(state => ({
          notifications: state.notifications.filter(n => n.id !== id),
        })),
      notification.duration
    )
  },
  removeNotification: id =>
    set(state => ({
      notifications: state.notifications.filter(n => n.id !== id),
    })),
}))
