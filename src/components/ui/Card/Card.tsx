import React from 'react';
import { Button } from '../Button/Button';

type CardProps = {
  image: string;
  title: string;
  subtitle: string;
  price: string;
};

export const Card = ({ image, title, subtitle, price }: CardProps) => {
  return (
    <div className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
      <img src={image} alt={title} className="h-48 w-full object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-400 text-sm">{subtitle}</p>
        <p className="mt-2 font-bold text-gray-900">{price}</p>
        <div className="mt-auto pt-4">
          <Button variant="primary" className="w-full">
            Read more
          </Button>
        </div>
      </div>
    </div>
  );
};
