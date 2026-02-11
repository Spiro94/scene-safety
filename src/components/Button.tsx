import React from 'react';

export type ButtonProps = React.PropsWithChildren<{
    type?: 'primary' | 'secondary' | 'ghost';
    onClick?: () => void;
    disabled?: boolean;
}>

export default function Button({ type = 'primary', onClick, disabled = false, children }: ButtonProps) {
    let c = '';
    const interactive = disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer';

    switch (type) {
        case 'primary':
            c = disabled ? 'bg-accent-teal-muted text-muted' : 'bg-accent-teal text-black'
            break;
        case 'secondary':
            c = disabled ? 'bg-input text-muted' : 'bg-bg-elevated text-primary'
            break;
        case 'ghost':
            c = disabled ? 'text-muted' : 'text-secondary'
            break;
    }


    return (
        <button disabled={disabled} onClick={onClick} className={`inline-flex items-center gap-3 px-6 py-3 text-sm font-medium rounded-xl ${c} ${interactive}`}>{children}</button>
    )
}
