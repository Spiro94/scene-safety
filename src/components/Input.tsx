import { Eye, EyeOff } from 'lucide-react';
import { useState, type Ref } from 'react'

export type InputProps = React.PropsWithChildren<{
    placeholder?: string;
    prefixIcon?: React.ReactNode;
    multiline?: boolean;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    name?: string;
    ref?: Ref<HTMLInputElement>;
    maxLength?: number;
    inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
    type?: React.HTMLInputTypeAttribute;
    disabled?: boolean;
    className?: string;
}>


export default function Input({
    placeholder,
    prefixIcon,
    multiline = false,
    value,
    onChange,
    onBlur,
    name,
    ref,
    maxLength,
    inputMode = 'text',
    type,
    disabled = false,
    className = '',
}: InputProps) {

    const [viewPassword, setViewPassword] = useState(false);

    if (type === 'submit') {
        return (
            <button
                type="submit"
                disabled={disabled}
                className={`inline-flex w-full items-center justify-center gap-3 px-6 py-3 text-sm font-medium rounded-xl ${disabled ? 'bg-accent-teal-muted text-muted cursor-not-allowed opacity-60' : 'bg-accent-teal text-black cursor-pointer'} ${className}`}
            >
                <span>{value ?? 'Submit'}</span>
                {prefixIcon}
            </button>
        )
    }

    return (
        <div className={`inline-flex gap-3 items-center bg-input px-4 py-4 text-muted rounded-xl text-sm ${className}`}>
            {prefixIcon && <div className=''>{prefixIcon}</div>}
            {multiline ? (
                <textarea className="flex-1 border-0 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 placeholder:text-muted text-primary"
                    placeholder={placeholder} value={value} onChange={onChange} maxLength={maxLength} disabled={disabled}></textarea>
            ) : (
                <input
                    ref={ref}
                    name={name}
                    className="flex-1 border-0 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 placeholder:text-muted text-primary"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    maxLength={maxLength}
                    inputMode={inputMode}
                    disabled={disabled}
                    type={type === 'password' && viewPassword ? 'text' : type}
                ></input>
            )}
            {type == 'password' ? viewPassword ? <button type='button' onClick={() => setViewPassword(false)}><EyeOff size={16}></EyeOff></button> : <button type='button' onClick={() => setViewPassword(true)}><Eye size={16}></Eye></button> : null}
        </div>
    )
}
