import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  className?: string;
}

export const Button = ({
  children,
  variant = 'primary',
  className,
  ...props
}: ButtonProps) => {
  const baseStyles =
    'rounded-xl px-6 py-3 font-semibold transition-colors duration-200 block leading-5';

  const variants = {
    primary: ' bg-primary text-white hover:bg-primary-dark',
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
