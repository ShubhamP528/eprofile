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
        "animate-spin rounded-full border-2 border-gray-300 border-t-blue-600",
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
      <p className="text-gray-600 text-sm sm:text-base mt-3 animate-pulse">
        {text || message || "Loading..."}
      </p>
    );
  };

  const BrandLogo = () => (
    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
      <svg
        className="w-7 h-7 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v10a1 1 0 01-1 1H8a1 1 0 01-1-1V4m0 0H5a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1h-2"
        />
      </svg>
    </div>
  );

  if (variant === "fullscreen") {
    return (
      <div
        className={cn(
          "fixed inset-0 bg-gray-50 z-50 safe-area-top safe-area-bottom animate-pulse",
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Loading content"
      >
        {/* Full screen shimmer layout */}
        <div className="h-full flex flex-col">
          {/* Header shimmer */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                <div className="w-24 h-6 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-6 bg-gray-200 rounded"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Main content shimmer */}
          <div className="flex-1 flex">
            {/* Sidebar shimmer (desktop) */}
            <div className="hidden lg:block w-64 bg-white border-r border-gray-200 p-6">
              <div className="w-20 h-6 bg-gray-200 rounded mb-6"></div>
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-gray-200 rounded"></div>
                    <div className="w-16 h-4 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content area shimmer */}
            <div className="flex-1 p-6 lg:p-8">
              <div className="max-w-7xl mx-auto">
                {/* Page title */}
                <div className="w-48 h-8 bg-gray-200 rounded mb-8"></div>

                {/* Content cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-lg border border-gray-200 p-6"
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                        <div className="flex-1">
                          <div className="w-24 h-4 bg-gray-200 rounded mb-2"></div>
                          <div className="w-16 h-3 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="w-full h-4 bg-gray-200 rounded"></div>
                        <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                        <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                      </div>
                      <div className="flex justify-between items-center mt-6">
                        <div className="w-16 h-6 bg-gray-200 rounded"></div>
                        <div className="w-20 h-8 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
          "bg-white rounded-lg shadow-sm border p-4 sm:p-6 animate-pulse",
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
