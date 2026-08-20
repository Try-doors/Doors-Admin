import { useEffect, useState } from 'react'

/**
 * Same contract as useState, but reads/writes the value to localStorage so it
 * survives page reloads. Safe for SSR: the initial render (server and first
 * client paint) always uses `initialValue` to avoid a hydration mismatch;
 * the persisted value (if any) is applied in an effect right after mount.
 */
export function usePersistedState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(initialValue)
  const [hydrated, setHydrated] = useState(false)
  const storageKey = `doors-admin:v1:${key}`

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey)
      if (stored !== null) setState(JSON.parse(stored))
    } catch {
      // corrupted or inaccessible storage — fall back to initialValue
    }
    setHydrated(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(state))
    } catch {
      // storage full or unavailable — persistence is best-effort
    }
  }, [storageKey, state, hydrated])

  return [state, setState] as const
}
