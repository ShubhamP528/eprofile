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

interface Template4Props {
  data: CardData;
  isPreview?: boolean;
}

export default function Template4({ data, isPreview = false }: Template4Props) {
  return (
    <div
      className={`bg-white transition-all duration-300 ${
        isPreview
          ? "w-full rounded-2xl shadow-xl aspect-3/4"
          : "w-full mx-auto rounded-3xl shadow-2xl border border-slate-100"
      }`}
      style={{ minHeight: "400px", height: "auto" }}
    >
      {/* Header Section - Minimalist */}
      <div
        className={`text-center border-b border-slate-50 ${
          isPreview ? "px-6 py-6" : "px-6 sm:px-10 py-8 sm:py-10"
        }`}
      >
        {/* Profile Image - Clean Circle with Light Shadow */}
        <div
          className={`mx-auto rounded-full bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center overflow-hidden hover:scale-105 transition-transform duration-300 ${
            isPreview ? "w-16 h-16 mb-4" : "w-24 h-24 mb-6"
          }`}
        >
          {data.profileImage ? (
            <img
              src={data.profileImage}
              alt={data.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-slate-50 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-slate-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Name and Title - Clean Typography */}
        <h1
          className={`font-extrabold text-slate-900 tracking-tight leading-none mb-2 break-words ${
            isPreview ? "text-lg" : "text-2xl sm:text-3xl"
          }`}
        >
          {data.title || "Your Name"}
        </h1>
        {data.subtitle && (
          <p
            className={`text-indigo-600 font-bold uppercase tracking-wider text-[10px] ${
              isPreview ? "mb-1" : "mb-3"
            }`}
          >
            {data.subtitle}
          </p>
        )}

        {/* Bio */}
        {data.bio && !isPreview && (
          <p className="text-slate-500 text-xs leading-relaxed max-w-sm mx-auto mt-2 font-normal">
            {data.bio}
          </p>
        )}
      </div>

      {/* Content Section */}
      <div className={`${isPreview ? "px-6 py-6" : "px-6 sm:px-10 py-8"}`}>
        {/* Contact Information - Clean List */}
        <div className="space-y-3 mb-6">
          {data.phone && (
            <div className="flex items-center justify-between gap-3 py-2.5 border-b border-slate-50">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold shrink-0">
                Phone
              </span>
              <span className="text-slate-700 font-semibold text-xs truncate min-w-0 flex-1 text-right">{data.phone}</span>
            </div>
          )}

          {data.email && (
            <div className="flex items-center justify-between gap-3 py-2.5 border-b border-slate-50">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold shrink-0">
                Email
              </span>
              <span className="text-slate-700 font-semibold text-xs truncate min-w-0 flex-1 text-right">{data.email}</span>
            </div>
          )}

          {data.address && (
            <div className="flex items-center justify-between gap-3 py-2.5 border-b border-slate-50">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold shrink-0">
                Location
              </span>
              <span className="text-slate-700 font-semibold text-xs text-right truncate min-w-0 flex-1">
                {data.address}
              </span>
            </div>
          )}
        </div>

        {/* Services - Minimal Cards */}
        {data.services && data.services.length > 0 && (
          <div className="mb-6">
            <h3 className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-3">
              Services
            </h3>
            <div className="space-y-3">
              {data.services.slice(0, 3).map((service, index) => (
                <div
                  key={index}
                  className="py-3 px-4 border border-slate-100 rounded-xl hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-slate-900 text-xs truncate">
                        {service.title}
                      </h4>
                      {service.description && (
                        <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                          {service.description}
                        </p>
                      )}
                    </div>
                    {service.price && (
                      <span className="text-[10px] font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                        {service.price}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Social Links */}
        {!isPreview && data.socialLinks && data.socialLinks.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              {data.socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:text-slate-900 hover:border-slate-400 hover:scale-105 transition-all shadow-xs"
                  title={link.platform}
                >
                  <span className="text-[10px] font-bold uppercase">{link.platform.substring(0, 2)}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons - Minimal Style */}
        {!isPreview && (
          <div className="grid grid-cols-2 gap-3 mt-4">
            {data.phone && (
              <a
                href={`tel:${data.phone}`}
                className="w-full py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider hover:bg-slate-50 hover:border-slate-300 transition-all text-center flex items-center justify-center min-h-11"
              >
                Call
              </a>
            )}
            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-all text-center flex items-center justify-center min-h-11"
              >
                Email
              </a>
            )}
          </div>
        )}
      </div>

      {/* Footer - Simple Line */}
      <div className="px-8 py-4 border-t border-slate-50 mt-auto">
        <div className="w-12 h-px bg-slate-200 mx-auto"></div>
      </div>
    </div>
  );
}
