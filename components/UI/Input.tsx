import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ 
  label, 
  error, 
  className = '', 
  ...props 
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-3 rounded-lg border-2 
          transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-offset-2
          ${error 
            ? 'border-red-300 focus:ring-red-300' 
            : 'border-romantic-pink-light focus:ring-romantic-pink-medium focus:border-romantic-pink-medium'
          }
          bg-white text-gray-800
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-red-500 animate-fade-in">{error}</p>
      )}
    </div>
  )
}

