type LoadingTransitionProps = {
  message?: string;
  fullScreen?: boolean;
  className?: string;
};

export default function LoadingTransition({
  message = 'Loading...',
  fullScreen = false,
  className = '',
}: LoadingTransitionProps) {
  const containerClass = fullScreen
    ? 'min-h-screen w-full flex items-center justify-center px-6 py-10'
    : 'w-full flex items-center justify-center py-8';

  return (
    <div className={`${containerClass} ${className}`}>
      <div
        role="status"
        aria-live="polite"
        className="inline-flex flex-col items-center gap-3 text-center transition-opacity duration-200 ease-out"
      >
        <div
          aria-hidden="true"
          className="h-8 w-8 rounded-full border-2 border-accent-teal-muted border-t-accent-teal animate-spin"
        />
        <p className="text-primary text-sm">{message}</p>
      </div>
    </div>
  );
}
