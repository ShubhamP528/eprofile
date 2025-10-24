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

interface Template5Props {
  data: CardData;
  isPreview?: boolean;
}

export default function Template5({ data, isPreview = false }: Template5Props) {
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
      {/* Geometric Pattern Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-r from-emerald-500 to-teal-600"></div>
        <div className="absolute top-1/3 left-0 w-full h-1/3 bg-gradient-to-r from-teal-600 to-cyan-600"></div>
        <div className="absolute top-2/3 left-0 w-full h-1/3 bg-gradient-to-r from-cyan-600 to-blue-600"></div>
      </div>

      {/* Diagonal Overlay */}
      <div
        className="absolute inset-0 bg-white"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 60%, 0 80%)",
        }}
      ></div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-12 h-12 border-4 border-emerald-500 rounded-full opacity-20"></div>
      <div className="absolute bottom-8 right-8 w-6 h-6 bg-teal-500 rounded-full opacity-30"></div>
      <div className="absolute top-1/2 left-4 w-3 h-3 bg-cyan-500 rotate-45"></div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header Section */}
        <div className={`${isPreview ? "p-4" : "p-8"} flex-1`}>
          {/* Profile Image */}
          {data.profileImage && (
            <div className="mb-6 flex justify-center">
              <img
                src={data.profileImage}
                alt={data.title}
                className={`rounded-full object-cover border-4 border-emerald-200 ${
                  isPreview ? "w-16 h-16" : "w-24 h-24"
                }`}
              />
            </div>
          )}

          {/* Name and Title */}
          <div className="mb-6">
            <h1
              className={`font-bold text-gray-900 leading-tight mb-2 text-center ${
                isPreview ? "text-xl" : "text-4xl"
              }`}
            >
              {data.title}
            </h1>
            {data.subtitle && (
              <div className="flex items-center">
                <div className="w-8 h-0.5 bg-emerald-500 mr-3"></div>
                <p
                  className={`text-gray-600 font-medium ${
                    isPreview ? "text-sm" : "text-lg"
                  }`}
                >
                  {data.subtitle}
                </p>
              </div>
            )}
          </div>

          {/* Bio - only in full view */}
          {data.bio && !isPreview && (
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed text-base max-w-lg">
                {data.bio}
              </p>
            </div>
          )}

          {/* Contact Information */}
          <div className="space-y-4">
            {data.phone && (
              <div className="flex items-center group">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-emerald-200 transition-colors">
                  <svg
                    className="w-6 h-6 text-emerald-600"
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
                  <p className="text-gray-500 text-sm font-medium">Phone</p>
                  <p
                    className={`text-gray-900 font-semibold ${
                      isPreview ? "text-sm" : "text-base"
                    }`}
                  >
                    {data.phone}
                  </p>
                </div>
              </div>
            )}

            {data.email && (
              <div className="flex items-center group">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-teal-200 transition-colors">
                  <svg
                    className="w-6 h-6 text-teal-600"
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
                  <p className="text-gray-500 text-sm font-medium">Email</p>
                  <p
                    className={`text-gray-900 font-semibold break-all ${
                      isPreview ? "text-xs" : "text-sm"
                    }`}
                  >
                    {data.email}
                  </p>
                </div>
              </div>
            )}

            {data.address && (
              <div className="flex items-start group">
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-cyan-200 transition-colors shrink-0">
                  <svg
                    className="w-6 h-6 text-cyan-600"
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
                  <p className="text-gray-500 text-sm font-medium">Address</p>
                  <p
                    className={`text-gray-900 font-semibold leading-tight ${
                      isPreview ? "text-xs" : "text-sm"
                    }`}
                  >
                    {data.address}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Gradient Section */}
        <div className="relative">
          {/* Services Section - Full view only */}
          {!isPreview && data.services && data.services.length > 0 && (
            <div className="px-8 py-6 bg-gradient-to-r from-emerald-50 to-teal-50">
              <h3 className="text-gray-900 font-bold text-lg mb-4 flex items-center">
                <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                Services
              </h3>
              <div className="grid gap-4">
                {data.services.slice(0, 3).map((service, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-base mb-2">
                          {service.title}
                        </h4>
                        {service.description && (
                          <p className="text-gray-600 text-sm">
                            {service.description}
                          </p>
                        )}
                      </div>
                      {service.price && (
                        <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1 rounded-full font-bold ml-3 text-sm">
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
            <div className="px-8 py-6 bg-gradient-to-r from-teal-600 to-cyan-600">
              <div className="grid grid-cols-1 gap-3">
                {data.phone && (
                  <button className="w-full bg-white text-teal-700 py-3 px-6 rounded-lg font-bold hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center space-x-2 shadow-lg">
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
    </div>
  );
}
