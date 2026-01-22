import React from 'react'

interface FileIconProps {
  solved?: boolean
  highlighted?: boolean
  onClick?: () => void
  label: string
}

export default function FileIcon({ 
  solved = false, 
  highlighted = false,
  onClick,
  label 
}: FileIconProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex flex-col items-center justify-center
        p-6 rounded-xl transition-all duration-300
        ${highlighted 
          ? 'bg-romantic-gold/20 border-2 border-romantic-gold shadow-lg' 
          : 'bg-romantic-beige border-2 border-romantic-pink-light'
        }
        ${solved 
          ? 'opacity-75' 
          : 'hover:bg-romantic-pink-light hover:shadow-md cursor-pointer'
        }
        ${!onClick ? 'cursor-default' : ''}
      `}
      disabled={!onClick}
    >
      <svg
        className={`w-12 h-12 mb-2 ${solved ? 'text-green-600' : 'text-romantic-pink-dark'}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {solved ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        )}
      </svg>
      <span className={`text-sm font-medium ${solved ? 'text-green-600' : 'text-gray-700'}`}>
        {label}
      </span>
      {solved && (
        <span className="absolute top-2 right-2 text-green-600 text-lg">✓</span>
      )}
    </button>
  )
}

