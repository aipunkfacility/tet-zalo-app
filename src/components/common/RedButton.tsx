import React from 'react';
import redButtonImg from '../../assets/red_button.webp';

interface RedButtonProps {
    onClick: () => void;
    label: string;
}

export const RedButton = ({ onClick, label }: RedButtonProps) => (
    <button onClick={onClick} className="relative w-80 h-28 active:scale-95 transition-transform focus:outline-none z-50">
        <img src={redButtonImg} alt={label} className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl" />
        <span className="absolute inset-0 flex items-center justify-center text-white font-black text-3xl uppercase pt-1 drop-shadow-lg pb-3">
            {label}
        </span>
    </button>
);
