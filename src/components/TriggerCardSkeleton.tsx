export default function TriggerCardSkeleton() {
  return (
    <div className='flex flex-col gap-4 bg-card border-border border rounded-2xl p-5 animate-pulse'>
      <div className='h-5 w-40 rounded-md bg-input' />
      <div className='h-4 w-full rounded-md bg-input' />
      <div className='h-4 w-3/4 rounded-md bg-input' />
      <div className='h-4 w-36 rounded-md bg-input' />
    </div>
  );
}
