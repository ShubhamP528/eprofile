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

interface Template9Props {
  data: CardData;
  isPreview?: boolean;
}

export default function Template9({ data, isPreview = false }: Template9Props) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-b from-amber-50 to-orange-50 ${
        isPreview
          ? "w-full rounded-lg shadow-xl aspect-3/4"
          : "w-full mx-auto rounded-2xl shadow-2xl border border-amber-200"
      }`}
      style={
        isPreview
          ? { minHeight: "400px", height: "auto" }
          : { minHeight: "400px", height: "auto" }
      }
    >
      {/* Decorative Border Pattern */}
      <div className="absolute inset-0 border-8 border-amber-200/30 rounded-2xl"></div>
      <div className="absolute inset-2 border-2 border-amber-300/20 rounded-xl"></div>

      {/* Ornamental Elements */}
      <div className="absolute top-4 left-4 w-8 h-8 border-2 border-amber-400/30 rounded-full"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-2 border-amber-400/30 rounded-full"></div>
      <div className="absolute bottom-4 left-4 w-6 h-6 border-2 border-amber-400/30 rounded-full"></div>
      <div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-amber-400/30 rounded-full"></div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header Section */}
        <div className={`${isPreview ? "p-6" : "p-8"} text-center`}>
          {/* Elegant Profile Frame */}
          <div className="mx-auto mb-6 relative">
            <div className="w-24 h-24 border-4 border-amber-300 rounded-full p-1 bg-white shadow-lg">
              {data.profileImage ? (
                <img
                  src={data.profileImage}
                  alt={data.title}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span
                    className={`font-serif font-bold text-white ${
                      isPreview ? "text-xl" : "text-3xl"
                    }`}
                  >
                    {data.title.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            {/* Decorative corners */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-amber-400"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-amber-400"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-amber-400"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-amber-400"></div>
          </div>

          {/* Elegant Typography */}
          <h1
            className={`font-serif font-bold text-amber-900 mb-3 ${
              isPreview ? "text-xl" : "text-4xl"
            }`}
          >
            {data.title}
          </h1>

          {/* Decorative Line */}
          <div className="flex items-center justify-center mb-3">
            <div className="w-8 h-px bg-amber-400"></div>
            <div className="w-2 h-2 bg-amber-400 rounded-full mx-2"></div>
            <div className="w-8 h-px bg-amber-400"></div>
          </div>

          {/* Subtitle */}
          {data.subtitle && (
            <p
              className={`text-amber-700 font-medium italic mb-4 ${
                isPreview ? "text-sm" : "text-lg"
              }`}
            >
              {data.subtitle}
            </p>
          )}

          {/* Bio - only in full view */}
          {data.bio && !isPreview && (
            <div className="bg-white/60 border border-amber-200 rounded-lg p-4 mb-4">
              <p className="text-amber-800 text-sm leading-relaxed italic">
                "{data.bio}"
              </p>
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div className={`flex-1 ${isPreview ? "px-6 pb-6" : "px-8 pb-8"}`}>
          <div className="space-y-4">
            {data.phone && (
              <div className="bg-white/80 border border-amber-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
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
                    <p className="text-amber-600 text-xs uppercase tracking-wider font-semibold">
                      Telephone
                    </p>
                    <p
                      className={`text-amber-900 font-semibold ${
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
              <div className="bg-white/80 border border-amber-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-md">
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
                    <p className="text-amber-600 text-xs uppercase tracking-wider font-semibold">
                      Electronic Mail
                    </p>
                    <p
                      className={`text-amber-900 font-semibold break-all ${
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
              <div className="bg-white/80 border border-amber-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-md shrink-0">
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
                    <p className="text-amber-600 text-xs uppercase tracking-wider font-semibold">
                      Address
                    </p>
                    <p
                      className={`text-amber-900 font-semibold leading-tight ${
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
          <div className="px-8 pb-8 border-t border-amber-200 pt-6">
            <div className="text-center mb-6">
              <h3 className="text-amber-900 font-serif font-bold text-xl mb-2">
                Professional Services
              </h3>
              <div className="flex items-center justify-center">
                <div className="w-12 h-px bg-amber-400"></div>
                <div className="w-3 h-3 bg-amber-400 rounded-full mx-2"></div>
                <div className="w-12 h-px bg-amber-400"></div>
              </div>
            </div>
            <div className="space-y-4">
              {data.services.slice(0, 3).map((service, index) => (
                <div
                  key={index}
                  className="bg-white/60 border border-amber-200 rounded-lg p-4 shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-serif font-bold text-amber-900 text-base mb-2">
                        {service.title}
                      </h4>
                      {service.description && (
                        <p className="text-amber-700 text-sm italic">
                          {service.description}
                        </p>
                      )}
                    </div>
                    {service.price && (
                      <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold ml-3 text-sm shadow-md">
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
          <div className="px-8 pb-8 space-y-4">
            {data.phone && (
              <button className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white py-4 px-6 rounded-lg font-bold hover:from-amber-500 hover:to-orange-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg">
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
                <span>CONTACT ME</span>
              </button>
            )}

            {data.email && (
              <button className="w-full bg-white text-amber-900 py-4 px-6 rounded-lg font-bold hover:bg-amber-50 transition-all duration-200 border-2 border-amber-400 flex items-center justify-center space-x-2 shadow-md">
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
                <span>SEND CORRESPONDENCE</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
