'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const buttonVariants = cva(
    // Base styles - Borderless, clean aesthetic
    [
        'inline-flex items-center justify-center gap-2',
        'font-medium transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        'active:scale-[0.98]',
    ],
    {
        variants: {
            variant: {
                primary: [
                    'bg-primary text-primary-foreground',
                    'hover:bg-primary/90',
                    'shadow-sm hover:shadow-md',
                ],
                secondary: [
                    'bg-secondary text-secondary-foreground',
                    'hover:bg-secondary/80',
                ],
                ghost: [
                    'bg-transparent',
                    'hover:bg-accent hover:text-accent-foreground',
                ],
                destructive: [
                    'bg-destructive text-destructive-foreground',
                    'hover:bg-destructive/90',
                ],
                outline: [
                    'border border-border bg-transparent',
                    'hover:bg-accent hover:text-accent-foreground',
                ],
                link: [
                    'text-primary underline-offset-4',
                    'hover:underline',
                ],
            },
            size: {
                sm: 'h-8 px-3 text-sm rounded-md',
                md: 'h-10 px-4 text-sm rounded-lg',
                lg: 'h-12 px-6 text-base rounded-lg',
                icon: 'h-10 w-10 rounded-lg',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    }
);

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, isLoading, disabled, children, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <svg
                        className="h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                ) : null}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
