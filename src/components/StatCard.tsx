
export type Props = {
    value: string;
    description: string;
    valueColor?: string;
}

export default function StatCard({ value, description, valueColor = 'text-accent-teal' }: Props) {
    return (
        <div className='flex flex-col flex-1 gap-2 p-5 bg-card rounded-2xl'>
            <div className={`text-3xl font-bold ${valueColor}`}>{value}</div>
            <div className='text-sm text-secondary'>{description}</div>
        </div>
    )
}
