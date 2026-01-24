'use client';

import {
    forwardRef,
    type HTMLAttributes,
    useEffect,
    useCallback,
} from 'react';
import { X } from 'lucide-react';
import { cn } from '../utils/cn';
import { Button } from './Button';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    showCloseButton?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-[90vw]',
};

const Modal = forwardRef<HTMLDivElement, ModalProps>(
    (
        {
            className,
            isOpen,
            onClose,
            title,
            description,
            showCloseButton = true,
            size = 'md',
            children,
            ...props
        },
        ref
    ) => {
        // Handle escape key
        const handleEscape = useCallback(
            (e: KeyboardEvent) => {
                if (e.key === 'Escape') onClose();
            },
            [onClose]
        );

        useEffect(() => {
            if (isOpen) {
                document.addEventListener('keydown', handleEscape);
                document.body.style.overflow = 'hidden';
            }
            return () => {
                document.removeEventListener('keydown', handleEscape);
                document.body.style.overflow = '';
            };
        }, [isOpen, handleEscape]);

        if (!isOpen) return null;

        return (
            <>
                {/* Backdrop */}
                <div
                    className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
                    onClick={onClose}
                    aria-hidden="true"
                />

                {/* Modal */}
                <div
                    ref={ref}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={title ? 'modal-title' : undefined}
                    aria-describedby={description ? 'modal-description' : undefined}
                    className={cn(
                        'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
                        'w-full p-6',
                        'bg-surface text-surface-foreground',
                        'rounded-2xl shadow-2xl border-none',
                        sizeClasses[size],
                        className
                    )}
                    {...props}
                >
                    {/* Header */}
                    {(title || showCloseButton) && (
                        <div className="flex items-start justify-between mb-4">
                            <div className="space-y-1">
                                {title && (
                                    <h2
                                        id="modal-title"
                                        className="text-lg font-semibold leading-none"
                                    >
                                        {title}
                                    </h2>
                                )}
                                {description && (
                                    <p
                                        id="modal-description"
                                        className="text-sm text-muted-foreground"
                                    >
                                        {description}
                                    </p>
                                )}
                            </div>
                            {showCloseButton && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={onClose}
                                    aria-label="Close modal"
                                    className="-mt-1 -mr-1"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    )}

                    {/* Content */}
                    <div>{children}</div>
                </div>
            </>
        );
    }
);

Modal.displayName = 'Modal';

// Modal Footer helper
const ModalFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('flex justify-end gap-3 mt-6', className)}
            {...props}
        />
    )
);
ModalFooter.displayName = 'ModalFooter';

export { Modal, ModalFooter };
