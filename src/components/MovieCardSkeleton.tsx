export default function MovieCardSkeleton() {
    return (
        <div className='flex flex-col gap-2 bg-card rounded-2xl overflow-hidden max-w-xs animate-pulse'>
            <div className='aspect-2/3 w-full bg-bg-elevated' />
            <div className='flex flex-col gap-3 p-4'>
                <div className='h-4 w-3/4 rounded bg-bg-elevated' />
                <div className='h-4 w-1/3 rounded bg-bg-elevated' />
                <div className='h-7 w-16 rounded-full bg-bg-elevated' />
            </div>
        </div>
    );
}
