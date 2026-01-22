'use client'

import { useState, useEffect } from 'react'
import { AppState, AppStateData } from '@/types'
import { getInitialState, updateState, resetState } from '@/lib/state'
import LockView from '@/components/LockView'
import SafeView from '@/components/SafeView'
import FileView from '@/components/FileView'
import OpenSafeView from '@/components/OpenSafeView'
import FutureFileView from '@/components/FutureFileView'

export default function Home() {
  const [state, setState] = useState<AppStateData | null>(null)

  useEffect(() => {
    // Carrega estado inicial do localStorage
    const initialState = getInitialState()
    setState(initialState)

    // Listener de teclado para reset (Ctrl+Shift+R)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'R') {
        e.preventDefault()
        handleReset()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleStateUpdate = (updates: Partial<AppStateData>) => {
    const newState = updateState(updates)
    setState(newState)
  }

  const handleUnlock = () => {
    handleStateUpdate({
      accessGranted: true,
      currentView: 'SAFE',
    })
  }

  const handleFileClick = (fileId: 1 | 2 | 3) => {
    handleStateUpdate({
      currentView: `FILE_${fileId}` as AppState,
    })
  }

  const handleFileSolve = (fileId: 1 | 2 | 3) => {
    if (fileId === 1) {
      handleStateUpdate({
        file1Solved: true,
        currentView: 'SAFE',
      })
    } else if (fileId === 2) {
      handleStateUpdate({
        file2Solved: true,
        currentView: 'SAFE',
      })
    } else {
      handleStateUpdate({
        file3Solved: true,
        currentView: 'SAFE',
      })
    }
  }

  const handleOpenSafe = () => {
    if (state?.file1Solved && state?.file2Solved && state?.file3Solved) {
      handleStateUpdate({
        currentView: 'OPEN_SAFE',
      })
    }
  }

  const handleViewFutureFile = () => {
    handleStateUpdate({
      currentView: 'FUTURE_FILE',
    })
  }

  const handleBackToSafe = () => {
    handleStateUpdate({
      currentView: 'SAFE',
    })
  }

  const handleBackToOpenSafe = () => {
    handleStateUpdate({
      currentView: 'OPEN_SAFE',
    })
  }

  const handleReset = () => {
    const resetStateData = resetState()
    setState(resetStateData)
    
    // Feedback visual simples (pode ser melhorado com toast)
    alert('Progresso resetado! A página será recarregada.')
    window.location.reload()
  }

  // Loading state
  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-romantic-cream via-romantic-beige to-romantic-pink-light">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-romantic-pink-dark mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  // Renderiza a view correspondente ao estado atual
  switch (state.currentView) {
    case 'LOCK':
      return <LockView onUnlock={handleUnlock} />

    case 'SAFE':
      return (
        <SafeView
          file1Solved={state.file1Solved}
          file2Solved={state.file2Solved}
          file3Solved={state.file3Solved}
          onFileClick={handleFileClick}
          onOpenSafe={handleOpenSafe}
        />
      )

    case 'FILE_1':
      return (
        <FileView
          fileId={1}
          onBack={handleBackToSafe}
          onSolve={() => handleFileSolve(1)}
        />
      )

    case 'FILE_2':
      return (
        <FileView
          fileId={2}
          onBack={handleBackToSafe}
          onSolve={() => handleFileSolve(2)}
        />
      )

    case 'FILE_3':
      return (
        <FileView
          fileId={3}
          onBack={handleBackToSafe}
          onSolve={() => handleFileSolve(3)}
        />
      )

    case 'OPEN_SAFE':
      return (
        <OpenSafeView 
          onViewFutureFile={handleViewFutureFile}
          onBackToSafe={handleBackToSafe}
        />
      )

    case 'FUTURE_FILE':
      return <FutureFileView onBack={handleBackToOpenSafe} />

    default:
      return <LockView onUnlock={handleUnlock} />
  }
}

