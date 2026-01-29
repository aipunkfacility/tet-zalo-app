import React from 'react';
import smallButtonImg from '../../assets/small_button.webp';

interface SmallButtonProps {
    onClick: () => void;
    icon?: React.ElementType;
    label?: string;
    large?: boolean;
}

export const SmallButton = ({ onClick, icon: Icon, label, large }: SmallButtonProps) => (
    <button
        onClick={onClick}
        className={`relative ${large ? 'w-24 h-24' : 'w-16 h-16'} active:scale-95 transition-transform focus:outline-none z-50`}
    >
        <img src={smallButtonImg} alt="button" className="absolute inset-0 w-full h-full object-contain drop-shadow-lg" />
        <div className="absolute inset-0 flex items-center justify-center pb-2">
            {Icon && <Icon className="text-[#FFD700] w-7 h-7" strokeWidth={3} />}
            {label && <span className={`text-[#FFD700] font-black ${large ? 'text-2xl pt-1' : 'text-lg'}`}>{label}</span>}
        </div>
    </button>
);
