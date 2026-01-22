export type AppState = 'LOCK' | 'SAFE' | 'FILE_1' | 'FILE_2' | 'FILE_3' | 'OPEN_SAFE' | 'FUTURE_FILE'

export interface AppStateData {
  accessGranted: boolean
  file1Solved: boolean
  file2Solved: boolean
  file3Solved: boolean
  currentView: AppState
}

