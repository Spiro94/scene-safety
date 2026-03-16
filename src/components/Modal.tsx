import React from 'react'

export type Props = React.PropsWithChildren<{
    className?: string;
    ref?: React.Ref<HTMLDialogElement>;
    onClose?: () => void;
}>

export default function Modal({ className, ref, onClose, children }: Props) {
    return (
        <dialog className={className} ref={ref} onClose={onClose}>
            {children}
        </dialog>
    )
}
