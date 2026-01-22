import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  children: React.ReactNode
}

export default function Button({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-romantic-pink-medium text-white hover:bg-romantic-pink-dark focus:ring-romantic-pink-medium shadow-md hover:shadow-lg',
    secondary: 'bg-romantic-beige text-gray-800 hover:bg-romantic-cream focus:ring-romantic-beige border border-romantic-pink-light',
    ghost: 'bg-transparent text-romantic-pink-dark hover:bg-romantic-pink-light focus:ring-romantic-pink-light',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

