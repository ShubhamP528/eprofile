"use client";

// Simple class name utility
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

interface LoadingProps {
  variant?: "fullscreen" | "inline" | "button" | "card" | "spinner";
  size?: "sm" | "md" | "lg" | "xl";
  message?: string;
  className?: string;
  showMessage?: boolean;
}

export default function Loading({
  variant = "inline",
  size = "md",
  message,
  className,
  showMessage = true,
}: LoadingProps) {
  const spinnerSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  const Spinner = ({ className: spinnerClassName }: { className?: string }) => (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-slate-200 border-t-indigo-600",
        spinnerSizes[size],
        spinnerClassName
      )}
      role="status"
      aria-label="Loading"
    />
  );

  const LoadingMessage = ({ text }: { text?: string }) => {
    if (!showMessage && !text) return null;

    return (
      <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mt-3 animate-pulse">
        {text || message || "Loading..."}
      </p>
    );
  };

  const BrandLogo = () => (
    <div className="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center mb-4 shadow-md shadow-indigo-500/10">
      <svg
        className="w-7 h-7 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.2}
          d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v10a1 1 0 01-1 1H8a1 1 0 01-1-1V4m0 0H5a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1h-2"
        />
      </svg>
    </div>
  );

  if (variant === "fullscreen") {
    return (
      <div
        className={cn(
          "fixed inset-0 bg-slate-50/80 backdrop-blur-md z-50 flex flex-col items-center justify-center safe-area-top safe-area-bottom",
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Loading content"
      >
        {/* Glow effect in background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        {/* Animated Brand Logo Container */}
        <div className="relative flex flex-col items-center z-10 select-none">
          {/* Logo icon */}
          <div className="w-16 h-16 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-4 animate-pulse">
            <svg
              className="w-9 h-9 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.2}
                d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v10a1 1 0 01-1 1H8a1 1 0 01-1-1V4m0 0H5a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1h-2"
              />
            </svg>
          </div>

          {/* Brand Name */}
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-slate-900 to-indigo-950 bg-clip-text text-transparent mb-1">
            eProfile
          </h2>

          {showMessage && (
            <p className="text-slate-500 text-xs mt-3 font-semibold uppercase tracking-wider animate-pulse">
              {message || "Loading content..."}
            </p>
          )}

          {/* Loading dot strip */}
          <div className="flex items-center gap-1.5 mt-5">
            <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "button") {
    return (
      <div
        className={cn("flex items-center justify-center space-x-2", className)}
        role="status"
        aria-label="Loading"
      >
        <Spinner />
        {showMessage && message && <span className="text-sm">{message}</span>}
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div
        className={cn(
          "bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6 animate-pulse",
          className
        )}
        role="status"
        aria-label="Loading content"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
          <div className="flex justify-center pt-2">
            <Spinner />
          </div>
          {showMessage && (
            <LoadingMessage text={message || "Loading content..."} />
          )}
        </div>
      </div>
    );
  }

  if (variant === "spinner") {
    return (
      <div
        className={cn("flex justify-center", className)}
        role="status"
        aria-label="Loading"
      >
        <Spinner />
      </div>
    );
  }

  // Default inline variant
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-8 px-4",
        className
      )}
      role="status"
      aria-label="Loading content"
    >
      <Spinner />
      <LoadingMessage />
    </div>
  );
}

// Utility function for creating loading states
export function createLoadingState(
  isLoading: boolean,
  content: React.ReactNode,
  loadingProps?: LoadingProps
) {
  if (isLoading) {
    return <Loading {...loadingProps} />;
  }
  return content;
}

// Higher-order component for adding loading states
export function withLoading<T extends object>(
  Component: React.ComponentType<T>,
  loadingProps?: LoadingProps
) {
  return function LoadingWrapper(props: T & { isLoading?: boolean }) {
    const { isLoading, ...componentProps } = props;

    if (isLoading) {
      return <Loading {...loadingProps} />;
    }

    return <Component {...(componentProps as T)} />;
  };
}
