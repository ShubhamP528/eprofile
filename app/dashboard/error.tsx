'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to console
    console.error('Dashboard Error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 shadow-lg text-center">
        <div className="w-16 h-16 bg-red-50 border border-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600 text-2xl">
          ⚠️
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Something went wrong!</h2>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          {error.message || 'An unexpected client-side error occurred in the dashboard.'}
        </p>
        {error.stack && (
          <pre className="text-left bg-slate-100 p-4 rounded-xl text-xs overflow-x-auto text-slate-700 max-h-40 mb-6 font-mono whitespace-pre-wrap">
            {error.stack}
          </pre>
        )}
        <div className="flex gap-4">
          <button
            onClick={() => reset()}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            Try again
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-700 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  )
}
