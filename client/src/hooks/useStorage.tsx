import { useState, useEffect } from 'react'

function useStorage<T>({
  key,
  initValue,
  initFunc,
  storageObject,
}: {
  key: string
  initValue?: T
  initFunc?: () => T
  storageObject: Storage
}) {
  const [value, setValue] = useState<T>(() => {
    const jsonString = storageObject.getItem(key)
    if (jsonString != null) return JSON.parse(jsonString)

    return initFunc?.() || initValue
  })

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key)

    return storageObject.setItem(key, JSON.stringify(value))
  }, [key, value, storageObject])

  return [value, setValue] as const
}

export function useLocalStorage<T>({
  key,
  initValue,
  initFunc,
}: {
  key: string
  initValue?: T
  initFunc?: () => T
}) {
  return useStorage({
    key,
    initValue,
    initFunc,
    storageObject: window.localStorage,
  })
}

export function useSessionStorage<T>({
  key,
  initValue,
  initFunc,
}: {
  key: string
  initValue?: T
  initFunc?: () => T
}) {
  return useStorage({
    key,
    initValue,
    initFunc,
    storageObject: window.sessionStorage,
  })
}
