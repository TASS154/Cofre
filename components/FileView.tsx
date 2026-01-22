'use client'

import { useState, useMemo } from 'react'
import { poems } from '@/data/poems'
import { highlightedWords } from '@/data/config'
import { normalizeString } from '@/lib/a1z26'
import Button from './UI/Button'
import Input from './UI/Input'
import SafeIcon from './UI/SafeIcon'

interface FileViewProps {
  fileId: 1 | 2 | 3
  onBack: () => void
  onSolve: () => void
}

export default function FileView({ fileId, onBack, onSolve }: FileViewProps) {
  const fileKey = `file${fileId}` as 'file1' | 'file2' | 'file3'
  const poem = poems[fileKey]
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Renderiza o poema com palavras destacadas em rosa (FILE_1)
  const renderHighlightedPoem = useMemo(() => {
    if (fileId !== 1) return null

    const words = highlightedWords.file1
    
    // Se não houver palavras configuradas, renderiza normalmente (sem destacar números)
    if (words.length === 0) {
      return <p className="whitespace-pre-line font-serif">{poem.content}</p>
    }

    // Normaliza as palavras de configuração
    const normalizedWords = words.map(w => normalizeString(w))
    
    // Divide o texto em palavras preservando espaços e quebras de linha
    const regex = /(\s+|\n+)/
    const parts = poem.content.split(regex)
    
    return (
      <p className="whitespace-pre-line font-serif">
        {parts.map((part, index) => {
          // Se for espaço ou quebra de linha, retorna como está
          if (regex.test(part)) {
            return <span key={index}>{part}</span>
          }
          
          // Remove pontuação para comparação
          const cleanPart = part.replace(/[.,!?;:()\[\]{}'"]/g, '')
          const normalizedPart = normalizeString(cleanPart)
          const shouldHighlight = normalizedWords.some(word => 
            normalizedPart === word || normalizedPart.includes(word) || word.includes(normalizedPart)
          )
          
          if (shouldHighlight && cleanPart.length > 0) {
            return (
              <span key={index} className="text-romantic-pink-dark font-semibold bg-romantic-pink-light/30 px-1 rounded">
                {part}
              </span>
            )
          }
          return <span key={index}>{part}</span>
        })}
      </p>
    )
  }, [fileId, poem.content])

  // Renderiza o poema para acróstico (FILE_3) - sem destacar primeira letra
  const renderAcrosticPoem = useMemo(() => {
    if (fileId !== 3) return null

    return <p className="whitespace-pre-line font-serif">{poem.content}</p>
  }, [fileId, poem.content])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    setTimeout(() => {
      // Normaliza a resposta do usuário e a esperada
      let normalizedAnswer = normalizeString(answer)
      let normalizedExpected = normalizeString(poem.answer)
      
      // Para datas, aceita variações de formato (/, -, espaços) e zeros à esquerda
      if (fileId === 1 || fileId === 3) {
        // Remove separadores comuns de data para comparação
        normalizedAnswer = normalizedAnswer.replace(/[\/\-\s]/g, '')
        normalizedExpected = normalizedExpected.replace(/[\/\-\s]/g, '')
        
        // Remove zeros à esquerda de números (ex: 07 vira 7, 2009 permanece 2009)
        // Isso permite aceitar tanto "10/07/2009" quanto "10/7/2009"
        normalizedAnswer = normalizedAnswer.replace(/\b0+(\d+)\b/g, '$1')
        normalizedExpected = normalizedExpected.replace(/\b0+(\d+)\b/g, '$1')
      }
      
      // Para o arquivo 2, aceita "sempre" ou "para sempre" ou "sempre ou para sempre"
      if (fileId === 2) {
        // Respostas aceitas (normalizadas)
        const acceptedAnswers = [
          'sempre ou para sempre',
          'sempre',
          'para sempre',
        ]
        
        // Verifica se a resposta normalizada do usuário corresponde a alguma resposta aceita
        const isCorrect = acceptedAnswers.some(accepted => {
          const normalizedAccepted = normalizeString(accepted)
          // Comparação exata ou se a resposta contém a aceita (ex: "sempre ou para sempre" contém "sempre")
          return normalizedAnswer === normalizedAccepted || 
                 (normalizedAnswer.includes(normalizedAccepted) && normalizedAccepted.length >= 6)
        })
        
        if (isCorrect) {
          onSolve()
          return
        }
      } else {
        // Para outros arquivos, comparação exata após normalização
        if (normalizedAnswer === normalizedExpected) {
          onSolve()
          return
        }
      }
      
      setError('Ainda não, amor. Vamos mais uma vez.')
      setIsSubmitting(false)
    }, 300)
  }

  const getInstructions = () => {
    switch (fileId) {
      case 1:
        return 'Mal posso contar o numero de vezes que me apaixonei por você:'
      case 2:
        return 'Um amor pode ser feito de repetições'
      case 3:
        return 'A vida é feita de começos'
      default:
        return ''
    }
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

      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 animate-fade-in relative z-10">
        <div className="mb-6">
          <h1 className="text-2xl font-display text-gray-800 mb-2">
            Arquivo {fileId}
          </h1>
          <p className="text-sm text-gray-600 mb-4">{getInstructions()}</p>
        </div>

        <div className="bg-romantic-beige/50 rounded-lg p-6 mb-6 min-h-[200px]">
          {fileId === 1 && renderHighlightedPoem}
          {fileId === 2 && <p className="whitespace-pre-line font-serif">{poem.content}</p>}
          {fileId === 3 && renderAcrosticPoem}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="flex gap-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onBack}
              className="flex-1"
            >
              Voltar ao Cofre
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              disabled={isSubmitting || !answer.trim()}
            >
              {isSubmitting ? 'Verificando...' : 'Resolver'}
            </Button>
          </div>
        </form>

        {error && (
          <p className="mt-4 text-center text-sm text-romantic-pink-dark">
            💕 Continua tentando, mor, você está no caminho certo!
          </p>
        )}
      </div>
    </div>
  )
}

