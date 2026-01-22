'use client'

import { useState, useEffect } from 'react'
import { futureText } from '@/data/futureText'
import Button from './UI/Button'
import SafeIcon from './UI/SafeIcon'

interface FutureFileViewProps {
  onBack: () => void
}

export default function FutureFileView({ onBack }: FutureFileViewProps) {
  const [isUnlocked, setIsUnlocked] = useState(false)

  useEffect(() => {
    // Verifica se a data atual é 24/12/2029 ou depois
    const today = new Date()
    const unlockDate = new Date('2029-12-24')
    
    // Compara apenas a data (ignora hora)
    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const unlockDateOnly = new Date(unlockDate.getFullYear(), unlockDate.getMonth(), unlockDate.getDate())
    
    setIsUnlocked(todayDateOnly >= unlockDateOnly)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-romantic-cream via-romantic-beige to-romantic-pink-light p-4 relative overflow-hidden">
      {/* Ícone grande ao fundo */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <SafeIcon size="large" opacity={0.1} className="text-romantic-gold" />
      </div>
      
      {/* Ícone pequeno no canto */}
      <div className="absolute top-4 right-4 z-0">
        <SafeIcon size="small" opacity={0.2} className="text-romantic-gold" />
      </div>

      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 animate-fade-in relative z-10">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-romantic-gold/20 rounded-full mb-4">
            <svg
              className="w-12 h-12 text-romantic-gold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div className="mb-2">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              isUnlocked 
                ? 'bg-green-200 text-green-800' 
                : 'bg-romantic-gold/30 text-romantic-gold'
            }`}>
              {isUnlocked ? 'Liberado' : 'Planejado'}
            </span>
          </div>
          <h1 className="text-3xl font-display text-gray-800 mb-2">
            Arquivo Futuro
          </h1>
          <p className="text-gray-600">24 de dezembro de 2029</p>
        </div>

        <div className="bg-romantic-beige/50 rounded-lg p-6 mb-6 min-h-[200px]">
          {isUnlocked ? (
            // Texto liberado - com scroll se necessário
            <div className="max-h-96 overflow-y-auto pr-4">
              <div className="prose prose-lg max-w-none text-gray-700 font-serif whitespace-pre-line">
                {futureText.split('\n').map((paragraph, index) => {
                  if (!paragraph.trim()) return <br key={index} />
                  return (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  )
                })}
              </div>
            </div>
          ) : (
            // Mensagem de "planejado"
            <div className="flex items-center justify-center">
              <div className="text-center">
                <p className="text-lg text-gray-700 font-serif italic mb-4">
                  Este arquivo ainda não foi escrito.
                </p>
                <p className="text-gray-600 font-serif">
                  Ele aguarda no futuro, como uma promessa que ainda não se realizou,
                  um sonho que ainda não foi sonhado, uma história que ainda não foi contada.
                </p>
                <p className="text-romantic-pink-dark font-semibold mt-4">
                  O que ele guardará? Apenas o tempo dirá...
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <Button variant="ghost" onClick={onBack}>
            Voltar ao Cofre
          </Button>
        </div>
      </div>
    </div>
  )
}

