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

interface Template2Props {
  data: CardData;
  isPreview?: boolean;
}

export default function Template2({ data, isPreview = false }: Template2Props) {
  return (
    <div
      className={`bg-white overflow-hidden ${
        isPreview
          ? "max-w-sm mx-auto rounded-2xl shadow-xl"
          : "w-full mx-auto rounded-2xl shadow-2xl border border-gray-200"
      }`}
      style={isPreview ? {} : { minHeight: "700px", height: "auto" }}
    >
      {/* Cover Image or Gradient */}
      <div
        className={`bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 relative ${
          isPreview ? "h-32" : "h-48"
        }`}
      >
        {data.coverImage && (
          <img
            src={data.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        )}

        {/* Profile Image - Overlapping */}
        <div
          className={`absolute left-6 ${
            isPreview ? "-bottom-12" : "-bottom-16"
          }`}
        >
          <div
            className={`rounded-full bg-white p-1 shadow-lg ${
              isPreview ? "w-24 h-24" : "w-32 h-32"
            }`}
          >
            <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {data.profileImage ? (
                <img
                  src={data.profileImage}
                  alt={data.title}
                  className="w-full h-full object-cover rounded-full"
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
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className={`${isPreview ? "pt-16 px-6 pb-6" : "pt-20 px-8 pb-8"}`}>
        {/* Name and Title */}
        <div className={`${isPreview ? "mb-4" : "mb-8"}`}>
          <h1
            className={`font-bold text-gray-900 ${
              isPreview ? "text-2xl mb-1" : "text-4xl mb-3"
            }`}
          >
            {data.title}
          </h1>
          {data.subtitle && (
            <p
              className={`text-purple-600 font-medium ${
                isPreview ? "text-base" : "text-xl"
              }`}
            >
              {data.subtitle}
            </p>
          )}
        </div>

        {/* Bio */}
        {data.bio && (
          <div className={`${isPreview ? "mb-6" : "mb-10"}`}>
            <p
              className={`text-gray-600 leading-relaxed ${
                isPreview ? "text-sm" : "text-lg"
              }`}
            >
              {data.bio}
            </p>
          </div>
        )}

        {/* Contact Cards */}
        <div
          className={`grid grid-cols-1 mb-6 ${isPreview ? "gap-3" : "gap-5"}`}
        >
          {data.phone && (
            <div
              className={`bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100 ${
                isPreview ? "p-4" : "p-6"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isPreview ? "w-10 h-10" : "w-14 h-14"
                  }`}
                >
                  <svg
                    className={`text-white ${
                      isPreview ? "w-5 h-5" : "w-7 h-7"
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
                    className={`text-purple-600 font-medium ${
                      isPreview ? "text-xs" : "text-sm"
                    }`}
                  >
                    PHONE
                  </p>
                  <p
                    className={`text-gray-900 font-medium ${
                      isPreview ? "text-base" : "text-lg"
                    }`}
                  >
                    {data.phone}
                  </p>
                </div>
              </div>
            </div>
          )}

          {data.email && (
            <div
              className={`bg-gradient-to-r from-pink-50 to-red-50 rounded-xl border border-pink-100 ${
                isPreview ? "p-4" : "p-6"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isPreview ? "w-10 h-10" : "w-14 h-14"
                  }`}
                >
                  <svg
                    className={`text-white ${
                      isPreview ? "w-5 h-5" : "w-7 h-7"
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
                    className={`text-pink-600 font-medium ${
                      isPreview ? "text-xs" : "text-sm"
                    }`}
                  >
                    EMAIL
                  </p>
                  <p
                    className={`text-gray-900 font-medium ${
                      isPreview ? "text-base" : "text-lg"
                    }`}
                  >
                    {data.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {data.address && (
            <div
              className={`bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-100 ${
                isPreview ? "p-4" : "p-6"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isPreview ? "w-10 h-10" : "w-14 h-14"
                  }`}
                >
                  <svg
                    className={`text-white ${
                      isPreview ? "w-5 h-5" : "w-7 h-7"
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
                    className={`text-red-600 font-medium ${
                      isPreview ? "text-xs" : "text-sm"
                    }`}
                  >
                    LOCATION
                  </p>
                  <p
                    className={`text-gray-900 font-medium ${
                      isPreview ? "text-sm" : "text-lg"
                    }`}
                  >
                    {data.address}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Services */}
        {data.services && data.services.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">What I Do</h3>
            <div className="space-y-3">
              {data.services.slice(0, 3).map((service, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {service.title}
                      </h4>
                      {service.description && (
                        <p className="text-sm text-gray-600">
                          {service.description}
                        </p>
                      )}
                    </div>
                    {service.price && (
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold ml-3">
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
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg">
                📞 Call Now
              </button>
            )}
            {data.email && (
              <button className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-pink-600 hover:to-red-600 transition-all duration-200 shadow-lg">
                ✉️ Send Email
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
