import React from 'react';
import clsx from 'clsx';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  variant = 'primary',
  className,
  ...props
}: ButtonProps) => {
  const baseStyles =
    'rounded-xl px-6 py-3 font-semibold transition-colors duration-200';

  const variants = {
    primary: 'width-69 bg-primary text-white hover:bg-primary-dark',
    secondary: 'width-39 bg-primary text-white hover:bg-primary-dark',
    outline: 'border border-primary text-gray-900 hover:bg-primary-dark',
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
