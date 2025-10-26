import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-6">🔍</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Card Not Found
        </h1>
        <p className="text-gray-600 mb-8 max-w-md">
          The eProfile you're looking for doesn't exist or has been made
          private.
        </p>
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Homepage
          </Link>
          <div>
            <Link
              href="/auth/signup"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Create your own eProfile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
