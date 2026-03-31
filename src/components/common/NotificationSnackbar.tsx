import { Snackbar, Alert } from '@mui/material'
import { notificationStore } from '@/stores/notificationStore'

export default function NotificationSnackbar() {
  const { notifications, removeNotification } = notificationStore()

  return (
    <>
      {notifications.map((notification, index) => (
        <Snackbar
          key={notification.id}
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          sx={{ bottom: `${(index + 1) * 70}px !important` }}
          onClose={() => removeNotification(notification.id)}
        >
          <Alert
            severity={notification.type}
            variant="filled"
            onClose={() => removeNotification(notification.id)}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  )
}
