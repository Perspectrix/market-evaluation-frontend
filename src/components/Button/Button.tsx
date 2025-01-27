
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary';
    className?: string;
}

const Button = ({
                    children,
                    onClick,
                    className = '',
                    disabled = false,
                    type = 'button',
                    variant = 'primary',
                    ...props
                }: ButtonProps) => {
    const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants = {
        primary: 'bg-gray-300 hover:bg-gray-400 text-gray-700 focus:ring-gray-500',
        secondary: 'bg-sky-100 hover:bg-sky-200 text-gray-700 focus:ring-sky-500'
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${className} ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;