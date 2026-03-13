import InputMask from '@react-input/mask/InputMask';
import type { ReactElement } from 'react';

type Props = {
    value: string;
    onChange: (e: string) => void;
    prefixIcon?: ReactElement;
}

export default function TimestampInput({ value, onChange, prefixIcon }: Props) {
    return (
        <div className={`inline-flex gap-3 items-center bg-input px-4 py-4 text-muted rounded-xl text-sm`}>
            {prefixIcon && <div className=''>{prefixIcon}</div>}
            <InputMask
                mask="__:__:__"
                replacement={{ _: /\d/ }}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="HH:MM:SS"
                className="flex-1 border-0 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 placeholder:text-muted text-primary"
            />
        </div>
    )
}
