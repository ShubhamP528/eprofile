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

interface Template1Props {
  data: CardData;
  isPreview?: boolean;
}

export default function Template1({ data, isPreview = false }: Template1Props) {
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
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800"></div>

      {/* Floating Elements */}
      <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-sm"></div>
      <div className="absolute bottom-8 left-6 w-8 h-8 bg-white/20 rounded-full"></div>
      <div className="absolute top-1/3 right-8 w-4 h-4 bg-yellow-400 rounded-full"></div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header Section */}
        <div className={`${isPreview ? "p-4" : "p-8"} text-center`}>
          {/* Profile Circle */}
          <div className="mx-auto mb-4 w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
            {data.profileImage ? (
              <img
                src={data.profileImage}
                alt={data.title}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
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

          {/* Name */}
          <h1
            className={`font-bold text-white mb-2 ${
              isPreview ? "text-lg" : "text-3xl"
            }`}
          >
            {data.title}
          </h1>

          {/* Subtitle */}
          {data.subtitle && (
            <p
              className={`text-blue-100 font-medium mb-4 ${
                isPreview ? "text-sm" : "text-lg"
              }`}
            >
              {data.subtitle}
            </p>
          )}

          {/* Bio - only in full view */}
          {data.bio && !isPreview && (
            <p className="text-blue-100 text-sm leading-relaxed max-w-md mx-auto mb-6">
              {data.bio}
            </p>
          )}
        </div>

        {/* Contact Cards */}
        <div className={`flex-1 ${isPreview ? "px-4 pb-4" : "px-8 pb-8"}`}>
          <div className="grid gap-3">
            {data.phone && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
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
                  <span
                    className={`text-white font-medium ${
                      isPreview ? "text-sm" : "text-base"
                    }`}
                  >
                    {data.phone}
                  </span>
                </div>
              </div>
            )}

            {data.email && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
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
                  <span
                    className={`text-white font-medium break-all ${
                      isPreview ? "text-xs" : "text-sm"
                    }`}
                  >
                    {data.email}
                  </span>
                </div>
              </div>
            )}

            {data.address && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shrink-0">
                    <svg
                      className="w-4 h-4 text-white"
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
                  <span
                    className={`text-white font-medium leading-tight ${
                      isPreview ? "text-xs" : "text-sm"
                    }`}
                  >
                    {data.address}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Services Section - Full view only */}
        {!isPreview && data.services && data.services.length > 0 && (
          <div className="px-8 pb-8">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
              Services
            </h3>
            <div className="grid gap-3">
              {data.services.slice(0, 3).map((service, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-base mb-2">
                        {service.title}
                      </h4>
                      {service.description && (
                        <p className="text-blue-100 text-sm">
                          {service.description}
                        </p>
                      )}
                    </div>
                    {service.price && (
                      <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full font-bold ml-3 text-sm">
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
          <div className="px-8 pb-8">
            <div className="grid grid-cols-1 gap-3">
              {data.phone && (
                <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-bold hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg">
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
                  <span>CALL NOW</span>
                </button>
              )}

              {data.email && (
                <button className="w-full bg-white/20 backdrop-blur-sm text-white py-3 px-6 rounded-lg font-bold hover:bg-white/30 transition-all duration-200 border border-white/30 flex items-center justify-center space-x-2">
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
                  <span>SEND EMAIL</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
