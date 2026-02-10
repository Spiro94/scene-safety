import React from 'react';

export type ButtonProps = React.PropsWithChildren<{
    type?: 'primary' | 'secondary' | 'ghost';
}>

export default function Button({ type = 'primary', children }: ButtonProps) {
    let c = '';

    switch (type) {
        case 'primary':
            c = 'bg-accent-teal text-black'
            break;
        case 'secondary':
            c = 'bg-bg-elevated text-primary'
            break;
        case 'ghost':
            c = 'text-secondary'
            break;
    }


    return (
        <button className={`inline-flex items-center gap-3 px-6 py-3 text-sm font-medium rounded-xl ${c} cursor-pointer`}>{children}</button>
    )
}
