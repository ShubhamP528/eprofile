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

interface Template7Props {
  data: CardData;
  isPreview?: boolean;
}

export default function Template7({ data, isPreview = false }: Template7Props) {
  return (
    <div
      className={`relative overflow-hidden ${
        isPreview
          ? "w-full rounded-lg shadow-xl aspect-3/4"
          : "w-full mx-auto rounded-2xl shadow-2xl border border-gray-200"
      }`}
      style={
        isPreview
          ? { minHeight: "400px", height: "auto" }
          : { minHeight: "400px", height: "auto" }
      }
    >
      {/* Artistic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600"></div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-400 rounded-full opacity-20 -translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-green-400 rounded-full opacity-30 translate-x-12 translate-y-12"></div>
      <div className="absolute top-1/4 right-4 w-16 h-16 bg-orange-400 rounded-full opacity-25"></div>
      <div className="absolute bottom-1/4 left-4 w-12 h-12 bg-cyan-400 rounded-full opacity-30"></div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header Section */}
        <div className={`${isPreview ? "p-4" : "p-8"} text-center`}>
          {/* Profile with Artistic Border */}
          <div className="mx-auto mb-4 relative">
            <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full p-1">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                {data.profileImage ? (
                  <img
                    src={data.profileImage}
                    alt={data.title}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span
                      className={`font-bold text-white ${
                        isPreview ? "text-xl" : "text-3xl"
                      }`}
                    >
                      {data.title.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
            </div>
            {/* Floating dots */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full"></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-green-400 rounded-full"></div>
          </div>

          {/* Name with Creative Typography */}
          <h1
            className={`font-extrabold text-white mb-2 tracking-wide ${
              isPreview ? "text-lg" : "text-3xl"
            }`}
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
          >
            {data.title}
          </h1>

          {/* Subtitle */}
          {data.subtitle && (
            <p
              className={`text-white font-medium mb-4 ${
                isPreview ? "text-sm" : "text-lg"
              }`}
              style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
            >
              {data.subtitle}
            </p>
          )}

          {/* Bio - only in full view */}
          {data.bio && !isPreview && (
            <p className="text-white text-sm leading-relaxed max-w-md mx-auto mb-6 opacity-90">
              {data.bio}
            </p>
          )}
        </div>

        {/* Contact Cards with Creative Design */}
        <div className={`flex-1 ${isPreview ? "px-4 pb-4" : "px-8 pb-8"}`}>
          <div className="space-y-3">
            {data.phone && (
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30 transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
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
                    <p className="text-white/70 text-xs uppercase tracking-wider font-semibold">
                      Call Me
                    </p>
                    <p
                      className={`text-white font-bold ${
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
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30 transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
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
                    <p className="text-white/70 text-xs uppercase tracking-wider font-semibold">
                      Email Me
                    </p>
                    <p
                      className={`text-white font-bold break-all ${
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
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30 transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center shadow-lg shrink-0">
                    <svg
                      className="w-6 h-6 text-white"
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
                    <p className="text-white/70 text-xs uppercase tracking-wider font-semibold">
                      Find Me
                    </p>
                    <p
                      className={`text-white font-bold leading-tight ${
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
          <div className="px-8 pb-8">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3 animate-pulse"></div>
              Creative Services
            </h3>
            <div className="space-y-3">
              {data.services.slice(0, 3).map((service, index) => (
                <div
                  key={index}
                  className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-base mb-2">
                        {service.title}
                      </h4>
                      {service.description && (
                        <p className="text-white/80 text-sm">
                          {service.description}
                        </p>
                      )}
                    </div>
                    {service.price && (
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-3 py-1 rounded-full font-bold ml-3 text-sm shadow-lg">
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
              <button className="w-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white py-4 px-6 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
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
                <span>LET'S CONNECT</span>
              </button>
            )}

            {data.email && (
              <button className="w-full bg-white/20 backdrop-blur-md text-white py-4 px-6 rounded-2xl font-bold hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center justify-center space-x-2">
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
                <span>DROP A LINE</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
