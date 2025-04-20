import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useUserStore } from '../userStore'

describe('userStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with empty state', () => {
    const store = useUserStore()
    expect(store.name).toBe('')
    expect(store.email).toBe('')
    expect(store.isLogged).toBe(false)
  })

  describe('actions', () => {
    it('logs in a user', () => {
      const store = useUserStore()
      store.login('Harry Potter', 'harry@hogwarts.com')

      expect(store.name).toBe('Harry Potter')
      expect(store.email).toBe('harry@hogwarts.com')
      expect(store.isLogged).toBe(true)
    })

    it('logs out a user', () => {
      const store = useUserStore()
      store.login('Hermione Granger', 'hermione@hogwarts.com')
      store.logout()

      expect(store.name).toBe('')
      expect(store.email).toBe('')
      expect(store.isLogged).toBe(false)
    })
  })
})
