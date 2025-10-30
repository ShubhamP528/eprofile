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

interface Template6Props {
  data: CardData;
  isPreview?: boolean;
}

export default function Template6({ data, isPreview = false }: Template6Props) {
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
      {/* Header Section with Navy Background */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className={`${isPreview ? "p-4" : "p-8"} text-center`}>
          {/* Profile Image */}
          <div className="mx-auto mb-4 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
            {data.profileImage ? (
              <img
                src={data.profileImage}
                alt={data.title}
                className="w-18 h-18 rounded-full object-cover"
              />
            ) : (
              <div className="w-18 h-18 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
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
            className={`font-bold mb-2 ${isPreview ? "text-lg" : "text-3xl"}`}
          >
            {data.title}
          </h1>

          {/* Subtitle */}
          {data.subtitle && (
            <p
              className={`text-slate-300 font-medium ${
                isPreview ? "text-sm" : "text-lg"
              }`}
            >
              {data.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className={`${isPreview ? "p-4" : "p-8"} bg-gray-50`}>
        {/* Bio */}
        {data.bio && !isPreview && (
          <div className="mb-6 text-center">
            <p className="text-gray-700 leading-relaxed">{data.bio}</p>
          </div>
        )}

        {/* Contact Information */}
        <div className="space-y-3 mb-6">
          {data.phone && (
            <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-600">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
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
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Phone
                </p>
                <p
                  className={`font-semibold text-gray-900 ${
                    isPreview ? "text-sm" : "text-base"
                  }`}
                >
                  {data.phone}
                </p>
              </div>
            </div>
          )}

          {data.email && (
            <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-600">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
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
                  className={`font-semibold text-gray-900 break-all ${
                    isPreview ? "text-xs" : "text-sm"
                  }`}
                >
                  {data.email}
                </p>
              </div>
            </div>
          )}

          {data.address && (
            <div className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-600">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center shrink-0">
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
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Location
                </p>
                <p
                  className={`font-semibold text-gray-900 leading-tight ${
                    isPreview ? "text-xs" : "text-sm"
                  }`}
                >
                  {data.address}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Services Section - Full view only */}
        {!isPreview && data.services && data.services.length > 0 && (
          <div className="mb-6">
            <h3 className="text-slate-800 font-bold text-lg mb-4 flex items-center">
              <div className="w-1 h-6 bg-blue-600 rounded mr-3"></div>
              Professional Services
            </h3>
            <div className="grid gap-3">
              {data.services.slice(0, 3).map((service, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800 text-base mb-2">
                        {service.title}
                      </h4>
                      {service.description && (
                        <p className="text-gray-600 text-sm">
                          {service.description}
                        </p>
                      )}
                    </div>
                    {service.price && (
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold ml-3 text-sm">
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
          <div className="space-y-3">
            {data.phone && (
              <button className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-bold hover:bg-blue-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg">
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
                <span>CONTACT NOW</span>
              </button>
            )}

            {data.email && (
              <button className="w-full bg-white text-slate-800 py-4 px-6 rounded-lg font-bold hover:bg-gray-50 transition-all duration-200 border-2 border-slate-800 flex items-center justify-center space-x-2">
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
        )}
      </div>
    </div>
  );
}
