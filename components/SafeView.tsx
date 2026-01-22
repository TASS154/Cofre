'use client'

import FileIcon from './UI/FileIcon'
import Button from './UI/Button'
import SafeIcon from './UI/SafeIcon'

interface SafeViewProps {
  file1Solved: boolean
  file2Solved: boolean
  file3Solved: boolean
  onFileClick: (fileId: 1 | 2 | 3) => void
  onOpenSafe: () => void
}

export default function SafeView({
  file1Solved,
  file2Solved,
  file3Solved,
  onFileClick,
  onOpenSafe,
}: SafeViewProps) {
  const allSolved = file1Solved && file2Solved && file3Solved

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

      <div className="max-w-4xl w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 animate-fade-in relative z-10">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-romantic-pink-light rounded-full mb-4">
            <svg
              className="w-16 h-16 text-romantic-pink-dark"
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
            Cofre Fechado
          </h1>
          <p className="text-gray-600">
            Resolva os três arquivos para desbloquear o cofre
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <FileIcon
            label="Arquivo 1"
            solved={file1Solved}
            onClick={() => onFileClick(1)}
          />
          <FileIcon
            label="Arquivo 2"
            solved={file2Solved}
            onClick={() => onFileClick(2)}
          />
          <FileIcon
            label="Arquivo 3"
            solved={file3Solved}
            highlighted={true}
            onClick={() => onFileClick(3)}
          />
        </div>

        <div className="text-center">
          <Button
            variant="primary"
            onClick={onOpenSafe}
            disabled={!allSolved}
            className={`
              ${!allSolved ? 'opacity-50 cursor-not-allowed' : ''}
              transition-all duration-300
            `}
          >
            {allSolved ? 'Abrir Cofre' : 'Resolva todos os arquivos primeiro'}
          </Button>
        </div>

        {!allSolved && (
          <p className="mt-4 text-center text-sm text-gray-500">
            {[file1Solved, file2Solved, file3Solved].filter(Boolean).length} de 3 arquivos resolvidos
          </p>
        )}
      </div>
    </div>
  )
}

