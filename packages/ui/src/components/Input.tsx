'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const inputVariants = cva(
    // Base styles - Clean, borderless aesthetic
    [
        'flex w-full transition-all duration-200',
        'bg-surface text-surface-foreground',
        'placeholder:text-muted-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    ],
    {
        variants: {
            variant: {
                default: [
                    'shadow-sm',
                    'hover:shadow-md focus:shadow-md',
                ],
                ghost: [
                    'bg-transparent',
                    'hover:bg-surface',
                ],
                bordered: [
                    'border border-border',
                    'focus:border-ring',
                ],
            },
            inputSize: {
                sm: 'h-8 px-3 text-sm rounded-md',
                md: 'h-10 px-4 text-sm rounded-lg',
                lg: 'h-12 px-4 text-base rounded-lg',
            },
        },
        defaultVariants: {
            variant: 'default',
            inputSize: 'md',
        },
    }
);

export interface InputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
    error?: string;
    label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant, inputSize, error, label, id, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

        return (
            <div className="space-y-1.5">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="text-sm font-medium text-foreground"
                    >
                        {label}
                    </label>
                )}
                <input
                    id={inputId}
                    className={cn(
                        inputVariants({ variant, inputSize }),
                        error && 'ring-2 ring-destructive ring-offset-2',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="text-sm text-destructive animate-fade-in">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export { Input, inputVariants };
