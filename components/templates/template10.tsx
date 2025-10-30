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

interface Template10Props {
  data: CardData;
  isPreview?: boolean;
}

export default function Template10({
  data,
  isPreview = false,
}: Template10Props) {
  return (
    <div
      className={`relative overflow-hidden bg-white ${
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
      {/* Travel-inspired Background Pattern */}
      <div className="absolute inset-0 bg-linear-to-br from-teal-50 via-cyan-50 to-blue-50"></div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-teal-200/30 to-transparent rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-linear-to-tr from-cyan-200/30 to-transparent rounded-tr-full"></div>

      {/* Floating Travel Icons */}
      <div className="absolute top-6 right-6 text-teal-300 opacity-60">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
        </svg>
      </div>
      <div className="absolute bottom-8 right-8 text-cyan-300 opacity-60">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header Section */}
        <div className={`${isPreview ? "p-4" : "p-8"} text-center`}>
          {/* Profile Section */}
          <div className="relative inline-block mb-4">
            <div className="w-20 h-20 mx-auto bg-white rounded-full shadow-lg border-4 border-teal-200 flex items-center justify-center">
              {data.profileImage ? (
                <img
                  src={data.profileImage}
                  alt={data.title}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 bg-linear-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
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
            {/* Travel Badge */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center shadow-md">
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          </div>

          {/* Name */}
          <h1
            className={`font-bold text-gray-800 mb-2 ${
              isPreview ? "text-lg" : "text-3xl"
            }`}
          >
            {data.title}
          </h1>

          {/* Subtitle with Travel Theme */}
          {data.subtitle && (
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
              <p
                className={`text-teal-600 font-medium ${
                  isPreview ? "text-sm" : "text-lg"
                }`}
              >
                {data.subtitle}
              </p>
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            </div>
          )}

          {/* Bio - only in full view */}
          {data.bio && !isPreview && (
            <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto mb-6 bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-teal-100">
              {data.bio}
            </p>
          )}
        </div>

        {/* Contact Cards with Travel Theme */}
        <div className={`flex-1 ${isPreview ? "px-4 pb-4" : "px-8 pb-8"}`}>
          <div className="grid gap-3">
            {data.phone && (
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-teal-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-linear-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-md">
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
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Phone
                    </p>
                    <p
                      className={`text-gray-800 font-semibold ${
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
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-teal-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-linear-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-md">
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
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Email
                    </p>
                    <p
                      className={`text-gray-800 font-semibold truncate ${
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
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-teal-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-linear-to-br from-teal-400 to-teal-500 rounded-full flex items-center justify-center shadow-md shrink-0">
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
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Location
                    </p>
                    <p
                      className={`text-gray-800 font-semibold leading-tight ${
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
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-orange-400 rounded-full mr-3"></div>
              <h3 className="text-gray-800 font-bold text-lg">Services</h3>
            </div>
            <div className="grid gap-3">
              {data.services.slice(0, 3).map((service, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-teal-100 shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-base mb-2">
                        {service.title}
                      </h4>
                      {service.description && (
                        <p className="text-gray-600 text-sm">
                          {service.description}
                        </p>
                      )}
                    </div>
                    {service.price && (
                      <span className="bg-linear-to-r from-orange-400 to-orange-500 text-white px-3 py-1 rounded-full font-bold ml-3 text-sm shadow-md">
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
                <button className="w-full bg-linear-to-r from-teal-500 to-cyan-500 text-white py-4 px-6 rounded-xl font-bold hover:from-teal-600 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg">
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
                  <span>CONNECT NOW</span>
                </button>
              )}

              {data.email && (
                <button className="w-full bg-white/80 backdrop-blur-sm text-teal-600 py-4 px-6 rounded-xl font-bold hover:bg-white transition-all duration-200 border-2 border-teal-200 flex items-center justify-center space-x-2 shadow-md">
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
                  <span>SEND MESSAGE</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
