import React from 'react'

export type InputProps = React.PropsWithChildren<{
    placeholder: string;
    prefixIcon?: React.ReactNode;
    multiline?: boolean;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    maxLength?: number;
    inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
}>


export default function Input({ placeholder, prefixIcon, multiline = false, value, onChange, maxLength, inputMode }: InputProps) {
    return (
        <div className='inline-flex gap-3 items-center bg-input px-4 py-4 text-muted rounded-xl text-sm'>
            {prefixIcon && <div className=''>{prefixIcon}</div>}
            {multiline ? (
                <textarea className="flex-1 border-0 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0"
                    placeholder={placeholder} value={value} onChange={onChange}></textarea>
            ) : (
                <input
                    className="flex-1 border-0 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    maxLength={maxLength}
                    inputMode={inputMode}
                ></input>
            )}
        </div>
    )
}
