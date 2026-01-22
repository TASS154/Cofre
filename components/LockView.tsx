'use client'

import { useState } from 'react'
import { validateA1Z26Answer } from '@/lib/a1z26'
import Button from './UI/Button'
import Input from './UI/Input'
import SafeIcon from './UI/SafeIcon'

interface LockViewProps {
  onUnlock: () => void
}

export default function LockView({ onUnlock }: LockViewProps) {
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    // Pequeno delay para melhor UX
    setTimeout(() => {
      if (validateA1Z26Answer(answer)) {
        onUnlock()
      } else {
        setError('Essa não é a resposta correta. Tente novamente.')
        setIsSubmitting(false)
      }
    }, 300)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-romantic-cream via-romantic-beige to-romantic-pink-light p-4 relative overflow-hidden">
      {/* Ícone grande ao fundo */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <SafeIcon size="large" opacity={0.1} className="text-romantic-pink-dark" />
      </div>
      
      {/* Ícone pequeno no canto */}
      <div className="absolute top-4 right-4 z-0">
        <SafeIcon size="small" opacity={0.2} className="text-romantic-pink-dark" />
      </div>

      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 animate-fade-in relative z-10">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-romantic-pink-light rounded-full mb-4">
            <svg
              className="w-12 h-12 text-romantic-pink-dark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-display text-gray-800 mb-2">
            Cofre Secreto
          </h1>
          <p className="text-gray-600">
            Decodifique a mensagem A1Z26 para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-4 text-center">
              A = 1, B = 2, C = 3... Z = 26
            </p>
            <Input
              type="text"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value)
                setError('')
              }}
              placeholder="Digite sua resposta..."
              error={error}
              disabled={isSubmitting}
              autoFocus
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isSubmitting || !answer.trim()}
          >
            {isSubmitting ? 'Verificando...' : 'Abrir Cofre'}
          </Button>
        </form>

        {error && (
          <p className="mt-4 text-center text-sm text-romantic-pink-dark">
            💕 Não desista, você consegue!
          </p>
        )}
      </div>
    </div>
  )
}

