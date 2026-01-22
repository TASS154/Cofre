import { AppState, AppStateData } from '@/types'

const STORAGE_KEYS = {
  ACCESS_GRANTED: 'accessGranted',
  FILE1_SOLVED: 'file1Solved',
  FILE2_SOLVED: 'file2Solved',
  FILE3_SOLVED: 'file3Solved',
  CURRENT_VIEW: 'currentView',
} as const

const DEFAULT_STATE: AppStateData = {
  accessGranted: false,
  file1Solved: false,
  file2Solved: false,
  file3Solved: false,
  currentView: 'LOCK',
}

function getFromStorage(key: string): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(key)
}

function setToStorage(key: string, value: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, value)
}

export function getInitialState(): AppStateData {
  if (typeof window === 'undefined') return DEFAULT_STATE

  const accessGranted = getFromStorage(STORAGE_KEYS.ACCESS_GRANTED) === 'true'
  const file1Solved = getFromStorage(STORAGE_KEYS.FILE1_SOLVED) === 'true'
  const file2Solved = getFromStorage(STORAGE_KEYS.FILE2_SOLVED) === 'true'
  const file3Solved = getFromStorage(STORAGE_KEYS.FILE3_SOLVED) === 'true'
  const currentView = (getFromStorage(STORAGE_KEYS.CURRENT_VIEW) || 'LOCK') as AppState

  return {
    accessGranted,
    file1Solved,
    file2Solved,
    file3Solved,
    currentView,
  }
}

export function updateState(updates: Partial<AppStateData>): AppStateData {
  const currentState = getInitialState()
  const newState = { ...currentState, ...updates }

  if (updates.accessGranted !== undefined) {
    setToStorage(STORAGE_KEYS.ACCESS_GRANTED, String(updates.accessGranted))
  }
  if (updates.file1Solved !== undefined) {
    setToStorage(STORAGE_KEYS.FILE1_SOLVED, String(updates.file1Solved))
  }
  if (updates.file2Solved !== undefined) {
    setToStorage(STORAGE_KEYS.FILE2_SOLVED, String(updates.file2Solved))
  }
  if (updates.file3Solved !== undefined) {
    setToStorage(STORAGE_KEYS.FILE3_SOLVED, String(updates.file3Solved))
  }
  if (updates.currentView !== undefined) {
    setToStorage(STORAGE_KEYS.CURRENT_VIEW, updates.currentView)
  }

  return newState
}

/**
 * Reseta todo o estado, limpando o localStorage
 */
export function resetState(): AppStateData {
  if (typeof window === 'undefined') return DEFAULT_STATE

  // Remove todas as chaves do localStorage
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key)
  })

  return DEFAULT_STATE
}

