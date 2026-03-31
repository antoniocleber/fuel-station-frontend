import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { notificationStore } from '@/stores/notificationStore'

describe('notificationStore', () => {
  it('adds a notification', () => {
    const { result } = renderHook(() => notificationStore())
    act(() => {
      result.current.addNotification({ message: 'Test', type: 'success', duration: 3000 })
    })
    expect(result.current.notifications).toHaveLength(1)
    expect(result.current.notifications[0].message).toBe('Test')
  })

  it('removes a notification', () => {
    const { result } = renderHook(() => notificationStore())
    act(() => {
      result.current.addNotification({ message: 'Test', type: 'info', duration: 3000 })
    })
    const id = result.current.notifications[0].id
    act(() => {
      result.current.removeNotification(id)
    })
    expect(result.current.notifications.find(n => n.id === id)).toBeUndefined()
  })
})
