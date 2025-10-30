"use client";

interface CardData {
  title: string;
  subtitle?: string;
  bio?: string;
  phone?: string;
  email?: string;
  address?: string;
  profileImage?: string;
  coverImage?: string;
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
  services?: Array<{
    id: string;
    title: string;
    description?: string;
    price?: string;
    isFeatured: boolean;
    order: number;
  }>;
  galleryItems?: Array<{
    id: string;
    type: "IMAGE" | "VIDEO" | "DOCUMENT";
    url: string;
    title?: string;
    order: number;
  }>;
  testimonials?: Array<{
    id: string;
    customerName: string;
    content: string;
    rating: number;
    order: number;
  }>;
}

interface Template8Props {
  data: CardData;
  isPreview?: boolean;
}

export default function Template8({ data, isPreview = false }: Template8Props) {
  return (
    <div
      className={`relative overflow-hidden bg-gray-900 ${
        isPreview
          ? "w-full rounded-lg shadow-xl aspect-3/4"
          : "w-full mx-auto rounded-2xl shadow-2xl border border-gray-700"
      }`}
      style={
        isPreview
          ? { minHeight: "400px", height: "auto" }
          : { minHeight: "400px", height: "auto" }
      }
    >
      {/* Tech Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 grid-rows-8 h-full">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="border border-cyan-400/20"></div>
          ))}
        </div>
      </div>

      {/* Glowing Elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
      <div className="absolute top-8 right-8 w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
      <div className="absolute bottom-8 left-4 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
      <div className="absolute bottom-4 left-8 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header Section */}
        <div
          className={`${
            isPreview ? "p-4" : "p-8"
          } text-center border-b border-gray-700/50`}
        >
          {/* Profile with Tech Border */}
          <div className="mx-auto mb-4 relative">
            <div className="w-20 h-20 border-2 border-cyan-400 rounded-lg p-1 bg-gray-800">
              {data.profileImage ? (
                <img
                  src={data.profileImage}
                  alt={data.title}
                  className="w-full h-full rounded object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-600 rounded flex items-center justify-center">
                  <span
                    className={`font-bold text-white ${
                      isPreview ? "text-lg" : "text-2xl"
                    }`}
                  >
                    {data.title.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            {/* Corner accents */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-cyan-400"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-cyan-400"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-cyan-400"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-cyan-400"></div>
          </div>

          {/* Name with Tech Font */}
          <h1
            className={`font-bold text-white mb-2 tracking-wider ${
              isPreview ? "text-lg" : "text-3xl"
            }`}
            style={{ fontFamily: "monospace" }}
          >
            {data.title.toUpperCase()}
          </h1>

          {/* Subtitle */}
          {data.subtitle && (
            <p
              className={`text-cyan-400 font-medium mb-4 ${
                isPreview ? "text-sm" : "text-lg"
              }`}
            >
              &gt; {data.subtitle}
            </p>
          )}

          {/* Bio - only in full view */}
          {data.bio && !isPreview && (
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-4">
              <p className="text-gray-300 text-sm leading-relaxed font-mono">
                // {data.bio}
              </p>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className={`flex-1 ${isPreview ? "p-4" : "p-8"}`}>
          <div className="space-y-3">
            {data.phone && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-cyan-400/50 transition-colors duration-200">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-mono uppercase tracking-wider">
                      CALL_FUNCTION()
                    </p>
                    <p
                      className={`text-white font-mono ${
                        isPreview ? "text-sm" : "text-base"
                      }`}
                    >
                      {data.phone}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {data.email && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-cyan-400/50 transition-colors duration-200">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-400 text-xs font-mono uppercase tracking-wider">
                      SEND_EMAIL()
                    </p>
                    <p
                      className={`text-white font-mono break-all ${
                        isPreview ? "text-xs" : "text-sm"
                      }`}
                    >
                      {data.email}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {data.address && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-cyan-400/50 transition-colors duration-200">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-mono uppercase tracking-wider">
                      GET_LOCATION()
                    </p>
                    <p
                      className={`text-white font-mono leading-tight ${
                        isPreview ? "text-xs" : "text-sm"
                      }`}
                    >
                      {data.address}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Services Section - Full view only */}
        {!isPreview && data.services && data.services.length > 0 && (
          <div className="px-8 pb-8 border-t border-gray-700/50 pt-6">
            <h3 className="text-cyan-400 font-bold text-lg mb-4 flex items-center font-mono">
              <span className="text-gray-500 mr-2">//</span>
              SERVICES.ARRAY
            </h3>
            <div className="space-y-3">
              {data.services.slice(0, 3).map((service, index) => (
                <div
                  key={index}
                  className="bg-gray-800/30 border border-gray-700 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-base mb-2 font-mono">
                        [{index}] {service.title}
                      </h4>
                      {service.description && (
                        <p className="text-gray-400 text-sm font-mono">
                          // {service.description}
                        </p>
                      )}
                    </div>
                    {service.price && (
                      <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-gray-900 px-3 py-1 rounded font-bold ml-3 text-sm">
                        {service.price}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons - Full view only */}
        {!isPreview && (
          <div className="px-8 pb-8 space-y-3">
            {data.phone && (
              <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-gray-900 py-4 px-6 rounded-lg font-bold hover:from-cyan-500 hover:to-blue-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg font-mono">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>EXECUTE_CALL()</span>
              </button>
            )}

            {data.email && (
              <button className="w-full bg-gray-800 text-cyan-400 py-4 px-6 rounded-lg font-bold hover:bg-gray-700 transition-all duration-200 border border-cyan-400/50 flex items-center justify-center space-x-2 font-mono">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>SEND_MESSAGE()</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
