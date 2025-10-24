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

interface Template3Props {
  data: CardData;
  isPreview?: boolean;
}

export default function Template3({ data, isPreview = false }: Template3Props) {
  return (
    <div
      className={`bg-gray-900 text-white overflow-hidden ${
        isPreview
          ? "max-w-sm mx-auto rounded-lg shadow-2xl"
          : "w-full mx-auto rounded-2xl shadow-2xl border border-gray-700"
      }`}
      style={isPreview ? {} : { minHeight: "700px", height: "auto" }}
    >
      {/* Header Section */}
      <div
        className={`bg-gradient-to-r from-gray-800 to-gray-900 text-center border-b border-gray-700 ${
          isPreview ? "px-6 py-8" : "px-8 py-12"
        }`}
      >
        {/* Profile Image */}
        <div
          className={`mx-auto rounded-full bg-gray-700 flex items-center justify-center overflow-hidden ring-4 ring-yellow-400 ${
            isPreview ? "w-20 h-20 mb-4" : "w-32 h-32 mb-8"
          }`}
        >
          {data.profileImage ? (
            <img
              src={data.profileImage}
              alt={data.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <svg
              className="w-10 h-10 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>

        {/* Name and Title */}
        <h1
          className={`font-bold text-white ${
            isPreview ? "text-xl mb-1" : "text-4xl mb-4"
          }`}
        >
          {data.title}
        </h1>
        {data.subtitle && (
          <p
            className={`text-yellow-400 font-medium uppercase tracking-wide ${
              isPreview ? "text-sm" : "text-xl"
            }`}
          >
            {data.subtitle}
          </p>
        )}
      </div>

      {/* Content Section */}
      <div className={`${isPreview ? "p-6" : "p-8"}`}>
        {/* Bio */}
        {data.bio && (
          <div className={`${isPreview ? "mb-6" : "mb-10"}`}>
            <div className="border-l-4 border-yellow-400 pl-4">
              <p
                className={`text-gray-300 leading-relaxed italic ${
                  isPreview ? "text-sm" : "text-lg"
                }`}
              >
                "{data.bio}"
              </p>
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className={`mb-6 ${isPreview ? "space-y-4" : "space-y-6"}`}>
          {data.phone && (
            <div
              className={`flex items-center space-x-4 bg-gray-800 rounded-lg border border-gray-700 ${
                isPreview ? "p-3" : "p-5"
              }`}
            >
              <div
                className={`bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isPreview ? "w-8 h-8" : "w-12 h-12"
                }`}
              >
                <svg
                  className={`text-gray-900 ${
                    isPreview ? "w-4 h-4" : "w-6 h-6"
                  }`}
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
                <p
                  className={`text-yellow-400 font-medium uppercase tracking-wide ${
                    isPreview ? "text-xs" : "text-sm"
                  }`}
                >
                  Phone
                </p>
                <p
                  className={`text-white font-medium ${
                    isPreview ? "text-base" : "text-lg"
                  }`}
                >
                  {data.phone}
                </p>
              </div>
            </div>
          )}

          {data.email && (
            <div
              className={`flex items-center space-x-4 bg-gray-800 rounded-lg border border-gray-700 ${
                isPreview ? "p-3" : "p-5"
              }`}
            >
              <div
                className={`bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isPreview ? "w-8 h-8" : "w-12 h-12"
                }`}
              >
                <svg
                  className={`text-gray-900 ${
                    isPreview ? "w-4 h-4" : "w-6 h-6"
                  }`}
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
              <div>
                <p
                  className={`text-yellow-400 font-medium uppercase tracking-wide ${
                    isPreview ? "text-xs" : "text-sm"
                  }`}
                >
                  Email
                </p>
                <p
                  className={`text-white font-medium ${
                    isPreview ? "text-base" : "text-lg"
                  }`}
                >
                  {data.email}
                </p>
              </div>
            </div>
          )}

          {data.address && (
            <div
              className={`flex items-center space-x-4 bg-gray-800 rounded-lg border border-gray-700 ${
                isPreview ? "p-3" : "p-5"
              }`}
            >
              <div
                className={`bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isPreview ? "w-8 h-8" : "w-12 h-12"
                }`}
              >
                <svg
                  className={`text-gray-900 ${
                    isPreview ? "w-4 h-4" : "w-6 h-6"
                  }`}
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
                <p
                  className={`text-yellow-400 font-medium uppercase tracking-wide ${
                    isPreview ? "text-xs" : "text-sm"
                  }`}
                >
                  Location
                </p>
                <p
                  className={`text-white font-medium ${
                    isPreview ? "text-sm" : "text-lg"
                  }`}
                >
                  {data.address}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Services */}
        {data.services && data.services.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
              EXPERTISE
            </h3>
            <div className="space-y-3">
              {data.services.slice(0, 3).map((service, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">
                        {service.title}
                      </h4>
                      {service.description && (
                        <p className="text-sm text-gray-400">
                          {service.description}
                        </p>
                      )}
                    </div>
                    {service.price && (
                      <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold ml-3">
                        {service.price}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {!isPreview && (
          <div className="space-y-3">
            {data.phone && (
              <button className="w-full bg-yellow-400 text-gray-900 py-3 px-4 rounded-lg font-bold hover:bg-yellow-300 transition-colors duration-200 flex items-center justify-center space-x-2">
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
              <button className="w-full bg-gray-700 text-white py-3 px-4 rounded-lg font-bold hover:bg-gray-600 transition-colors duration-200 border border-gray-600 flex items-center justify-center space-x-2">
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
        )}
      </div>
    </div>
  );
}
