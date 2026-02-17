import React from 'react'
import Input, { type InputProps } from './Input'

export type LabeledInputProps = InputProps & {
    label: React.ReactNode;
    labelRight?: React.ReactNode;
    className?: string;
    labelClassName?: string;
}

export default function LabeledInput({
    label,
    labelRight,
    className = '',
    labelClassName,
    ...inputProps
}: LabeledInputProps) {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <div className="flex items-center justify-between">
                <label className={`text-secondary font-medium text-sm text-left ${labelClassName ?? ''}`}>{label}</label>
                {labelRight}
            </div>
            <Input {...inputProps} />
        </div>
    )
}
