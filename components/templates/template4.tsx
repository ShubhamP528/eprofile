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

interface Template4Props {
  data: CardData;
  isPreview?: boolean;
}

export default function Template4({ data, isPreview = false }: Template4Props) {
  return (
    <div
      className={`bg-white ${
        isPreview
          ? "max-w-sm mx-auto rounded-none shadow-sm border border-gray-200"
          : "w-full mx-auto rounded-2xl shadow-2xl border border-gray-200"
      }`}
      style={isPreview ? {} : { minHeight: "650px", height: "auto" }}
    >
      {/* Header Section - Minimalist */}
      <div
        className={`text-center border-b border-gray-100 ${
          isPreview ? "px-8 py-8" : "px-10 py-12"
        }`}
      >
        {/* Profile Image - Simple Circle */}
        <div
          className={`mx-auto rounded-full bg-gray-100 flex items-center justify-center overflow-hidden ${
            isPreview ? "w-16 h-16 mb-6" : "w-24 h-24 mb-10"
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
              className="w-8 h-8 text-gray-400"
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

        {/* Name and Title - Clean Typography */}
        <h1
          className={`font-light text-gray-900 tracking-wide ${
            isPreview ? "text-2xl mb-2" : "text-4xl mb-4"
          }`}
        >
          {data.title}
        </h1>
        {data.subtitle && (
          <p
            className={`text-gray-500 font-normal tracking-wider uppercase ${
              isPreview ? "text-sm" : "text-lg"
            }`}
          >
            {data.subtitle}
          </p>
        )}
      </div>

      {/* Content Section */}
      <div className={`${isPreview ? "px-8 py-6" : "px-10 py-10"}`}>
        {/* Bio - Simple Quote */}
        {data.bio && (
          <div className={`text-center ${isPreview ? "mb-8" : "mb-12"}`}>
            <p
              className={`text-gray-600 leading-relaxed font-light italic ${
                isPreview ? "text-sm" : "text-lg"
              }`}
            >
              {data.bio}
            </p>
          </div>
        )}

        {/* Contact Information - Clean List */}
        <div className="space-y-4 mb-8">
          {data.phone && (
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">
                Phone
              </span>
              <span className="text-gray-700 font-light">{data.phone}</span>
            </div>
          )}

          {data.email && (
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">
                Email
              </span>
              <span className="text-gray-700 font-light">{data.email}</span>
            </div>
          )}

          {data.address && (
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">
                Location
              </span>
              <span className="text-gray-700 font-light text-right text-sm">
                {data.address}
              </span>
            </div>
          )}
        </div>

        {/* Services - Minimal Cards */}
        {data.services && data.services.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm text-gray-400 uppercase tracking-widest font-medium mb-4 text-center">
              Services
            </h3>
            <div className="space-y-4">
              {data.services.slice(0, 3).map((service, index) => (
                <div
                  key={index}
                  className="text-center py-3 border-b border-gray-50 last:border-b-0"
                >
                  <h4 className="font-light text-gray-900 mb-1">
                    {service.title}
                  </h4>
                  {service.description && (
                    <p className="text-xs text-gray-500 mb-2">
                      {service.description}
                    </p>
                  )}
                  {service.price && (
                    <span className="text-xs text-gray-700 font-medium">
                      {service.price}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons - Minimal Style */}
        {!isPreview && (
          <div className="space-y-3">
            {data.phone && (
              <button className="w-full py-3 px-4 border border-gray-300 text-gray-700 font-light text-sm uppercase tracking-widest hover:bg-gray-50 transition-colors duration-200">
                Call
              </button>
            )}
            {data.email && (
              <button className="w-full py-3 px-4 bg-gray-900 text-white font-light text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors duration-200">
                Email
              </button>
            )}
          </div>
        )}
      </div>

      {/* Footer - Simple Line */}
      <div className="px-8 py-4 border-t border-gray-100">
        <div className="w-12 h-px bg-gray-300 mx-auto"></div>
      </div>
    </div>
  );
}
