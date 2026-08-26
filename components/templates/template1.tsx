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
          ? "w-full rounded-2xl shadow-xl aspect-3/4"
          : "w-full mx-auto rounded-3xl shadow-2xl border border-white/10"
      }`}
      style={{ minHeight: "400px", height: "auto" }}
    >
      {/* Premium Rich Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-indigo-950 to-purple-950"></div>
      
      {/* Decorative Blob Glows */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header Section */}
        <div className={`${isPreview ? "p-4" : "p-8"} text-center`}>
          {/* Profile Circle with Double Border Glow */}
          <div className="mx-auto mb-4 w-20 h-20 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-full flex items-center justify-center p-0.5 shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all duration-300">
            <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center overflow-hidden">
              {data.profileImage ? (
                <img
                  src={data.profileImage}
                  alt={data.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                  <span className="font-extrabold text-white text-xl uppercase tracking-wider">
                    {data.title ? data.title.charAt(0) : "U"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Name */}
          <h1 className="font-extrabold text-white text-xl mb-1 tracking-tight leading-tight">
            {data.title || "Your Name"}
          </h1>

          {/* Subtitle */}
          {data.subtitle && (
            <p className="text-indigo-200/90 text-xs font-semibold uppercase tracking-wider mb-3">
              {data.subtitle}
            </p>
          )}

          {/* Bio */}
          {data.bio && !isPreview && (
            <p className="text-slate-300 text-xs leading-relaxed max-w-sm mx-auto mb-5 px-2">
              {data.bio}
            </p>
          )}
        </div>

        {/* Contact Info List */}
        <div className={`flex-1 ${isPreview ? "px-4 pb-4" : "px-8 pb-6"}`}>
          <div className="grid gap-2.5">
            {data.phone && (
              <div className="bg-white/[0.04] backdrop-blur-md rounded-xl p-3 border border-white/[0.08] hover:bg-white/[0.08] transition-all">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-slate-200 font-medium text-xs truncate">
                    {data.phone}
                  </span>
                </div>
              </div>
            )}

            {data.email && (
              <div className="bg-white/[0.04] backdrop-blur-md rounded-xl p-3 border border-white/[0.08] hover:bg-white/[0.08] transition-all">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-rose-500/10 text-rose-400 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-slate-200 font-medium text-xs truncate">
                    {data.email}
                  </span>
                </div>
              </div>
            )}

            {data.address && (
              <div className="bg-white/[0.04] backdrop-blur-md rounded-xl p-3 border border-white/[0.08] hover:bg-white/[0.08] transition-all">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-indigo-500/10 text-indigo-400 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-slate-200 font-medium text-xs leading-tight">
                    {data.address}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Services Showcase */}
        {!isPreview && data.services && data.services.length > 0 && (
          <div className="px-8 pb-6">
            <h3 className="text-indigo-200 text-xs font-bold uppercase tracking-wider mb-3 flex items-center">
              <span className="w-1.5 h-1.5 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full mr-2"></span>
              Services
            </h3>
            <div className="grid gap-2.5">
              {data.services.slice(0, 3).map((service, index) => (
                <div
                  key={index}
                  className="bg-white/[0.02] backdrop-blur-md rounded-xl p-3.5 border border-white/[0.06] hover:bg-white/[0.05] transition-all"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-100 text-xs mb-1 truncate">
                        {service.title}
                      </h4>
                      {service.description && (
                        <p className="text-slate-400 text-[11px] line-clamp-2">
                          {service.description}
                        </p>
                      )}
                    </div>
                    {service.price && (
                      <span className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-2 py-0.5 rounded-md font-bold text-[10px] shrink-0">
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
          <div className="px-8 pb-6">
            <div className="flex flex-wrap justify-center gap-2.5">
              {data.socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] rounded-xl flex items-center justify-center text-slate-300 hover:text-white hover:scale-110 transition-all duration-200"
                  title={link.platform}
                >
                  <span className="text-[10px] font-bold uppercase">{link.platform.substring(0, 2)}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {!isPreview && (
          <div className="px-8 pb-8 mt-auto">
            <div className="grid grid-cols-2 gap-3">
              {data.phone && (
                <a
                  href={`tel:${data.phone}`}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 px-4 rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/10 hover:shadow-emerald-600/20 hover:-translate-y-0.5 transition-all text-center flex items-center justify-center space-x-2"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>CALL</span>
                </a>
              )}

              {data.email && (
                <a
                  href={`mailto:${data.email}`}
                  className="bg-white/[0.06] hover:bg-white/[0.1] text-white py-2.5 px-4 rounded-xl font-bold text-xs border border-white/[0.08] hover:-translate-y-0.5 transition-all text-center flex items-center justify-center space-x-2"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>EMAIL</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
