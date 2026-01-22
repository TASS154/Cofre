'use client'

import { longText } from '@/data/longText'
import Button from './UI/Button'
import SafeIcon from './UI/SafeIcon'

interface OpenSafeViewProps {
  onViewFutureFile: () => void
  onBackToSafe: () => void
}

export default function OpenSafeView({ onViewFutureFile, onBackToSafe }: OpenSafeViewProps) {
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

      <div className="max-w-3xl w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 animate-fade-in relative z-10">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-romantic-gold/20 rounded-full mb-4">
            <svg
              className="w-16 h-16 text-romantic-gold"
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
            Cofre Aberto
          </h1>
        </div>

        {/* Texto curto inicial */}
        <div className="bg-romantic-beige/50 rounded-lg p-6 mb-6">
          <div className="prose prose-lg max-w-none text-gray-700 font-serif">
            <p className="mb-4">
              Parabéns! Você desbloqueou o cofre e descobriu todos os segredos guardados aqui.
            </p>
            <p className="mb-4">
              Cada arquivo que você resolveu era uma peça de um quebra-cabeça maior, uma história
              que se desenrola através do tempo e do espaço.
            </p>
            <p className="mb-4">
              Este cofre guarda memórias, promessas e sonhos. Cada palavra, cada verso, cada pista
              que você seguiu te trouxe até aqui, até este momento especial.
            </p>
          </div>
        </div>

        {/* Texto longo com scroll */}
        <div className="bg-romantic-beige/50 rounded-lg p-6 mb-6">
          <div className="max-h-96 overflow-y-auto pr-4">
            <div className="prose prose-lg max-w-none text-gray-700 font-serif whitespace-pre-line">
              {longText.split('\n').map((paragraph, index) => {
                if (!paragraph.trim()) return <br key={index} />
                return (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                )
              })}
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="secondary" onClick={onBackToSafe} className="flex-1 sm:flex-none">
            Voltar aos Arquivos
          </Button>
          <Button variant="primary" onClick={onViewFutureFile} className="flex-1 sm:flex-none">
            Ver Arquivo Futuro
          </Button>
        </div>
      </div>
    </div>
  )
}

