import React from "react";

const Footer = () => {
  return (
    <footer
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="bg-[#1A1209] text-[#FAF6EE]/60 border-t border-[#C9A84C]/20"
    >
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-3">
          <h3
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-[#C9A84C] text-xl font-bold tracking-widest uppercase"
          >
            Ceylonica
          </h3>
          <p className="text-sm leading-relaxed">
            Your trusted e-commerce platform for the finest goods from Sri
            Lanka.
          </p>
          <div className="flex gap-3 mt-2">
            {/* Social placeholders */}
            {["f", "in", "tw"].map((s) => (
              <div
                key={s}
                className="w-8 h-8 rounded-full border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] text-xs hover:bg-[#C9A84C]/10 cursor-pointer transition-colors"
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3">
          <h4 className="text-[#FAF6EE] text-sm font-semibold uppercase tracking-widest">
            Quick Links
          </h4>
          <div className="w-8 h-0.5 bg-[#C9A84C] mb-1" />
          {[
            ["/", "Home"],
            ["/products", "Products"],
            ["/about", "About Us"],
            ["/contact", "Contact"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="text-sm hover:text-[#C9A84C] transition-colors w-fit"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <h4 className="text-[#FAF6EE] text-sm font-semibold uppercase tracking-widest">
            Contact Us
          </h4>
          <div className="w-8 h-0.5 bg-[#C9A84C] mb-1" />
          <div className="flex items-center gap-2 text-sm">
            <svg
              className="w-4 h-4 text-[#C9A84C] shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            support@ceylonica.com
          </div>
          <div className="flex items-center gap-2 text-sm">
            <svg
              className="w-4 h-4 text-[#C9A84C] shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            +94 11 234 5678
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#C9A84C]/10 py-5 text-center text-xs text-[#FAF6EE]/30">
        © 2026 Ceylonica. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
