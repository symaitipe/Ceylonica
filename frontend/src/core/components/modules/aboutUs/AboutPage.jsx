import React, { useState } from "react";

const team = [
  {
    name: "Arjun Perera",
    role: "Founder & CEO",
    bio: "Born in Kandy, Arjun built Ceylonica to share Sri Lanka's finest exports with the world.",
    avatar: "AP",
  },
  {
    name: "Nimali Fernando",
    role: "Head of Sourcing",
    bio: "With 12 years in artisan trade, Nimali personally vets every supplier on the platform.",
    avatar: "NF",
  },
  {
    name: "Ravi Wickramasinghe",
    role: "Chief Technology Officer",
    bio: "Ravi leads our engineering team, building the infrastructure that powers Ceylonica.",
    avatar: "RW",
  },
  {
    name: "Dilini Jayawardena",
    role: "Head of Customer Experience",
    bio: "Dilini ensures every customer interaction reflects the warmth and hospitality of Sri Lanka.",
    avatar: "DJ",
  },
];

const awards = [
  {
    year: "2024",
    title: "Best E-Commerce Platform",
    body: "Sri Lanka Digital Commerce Awards",
  },
  {
    year: "2023",
    title: "Top Export Enabler",
    body: "Ceylon Chamber of Commerce",
  },
  {
    year: "2023",
    title: "Startup of the Year",
    body: "SLASSCOM Innovation Awards",
  },
  {
    year: "2022",
    title: "Best Cultural Brand",
    body: "South Asia Retail Summit",
  },
];

const AboutPage = () => {
  const [activeSection, setActiveSection] = useState("story");

  const tabs = [
    { key: "story", label: "Our Story" },
    { key: "awards", label: "Awards" },
    { key: "team", label: "Our Team" },
  ];

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="bg-[#FAF6EE] min-h-screen"
    >
      {/* Hero */}
      <section className="relative bg-[#1A1209] text-[#FAF6EE] overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 30% 50%, #C9A84C, transparent 60%), radial-gradient(circle at 80% 20%, #6B4423, transparent 40%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 py-24 text-center flex flex-col items-center gap-5">
          <span className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.3em] border border-[#C9A84C]/40 px-4 py-1.5 rounded-full">
            About Us
          </span>
          <h1
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-5xl md:text-6xl font-bold leading-tight"
          >
            Rooted in <span className="text-[#C9A84C]">Ceylon</span>
          </h1>
          <p className="text-[#FAF6EE]/60 text-lg max-w-2xl leading-relaxed">
            We bring the soul of Sri Lanka to your doorstep — from hand-rolled
            cinnamon and single-estate teas to handcrafted batik and artisan
            spices.
          </p>
        </div>
      </section>

      <div className="h-1 bg-gradient-to-r from-[#C9A84C]/0 via-[#C9A84C] to-[#C9A84C]/0" />

      {/* Tabs */}
      <div className="sticky top-16 z-40 bg-[#FAF6EE] border-b border-[#1A1209]/10">
        <div className="max-w-4xl mx-auto px-6 flex gap-0">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`px-6 py-4 text-sm font-semibold border-b-2 transition-all duration-200 -mb-px
                ${
                  activeSection === key
                    ? "text-[#C9A84C] border-[#C9A84C]"
                    : "text-[#1A1209]/40 border-transparent hover:text-[#1A1209]/70"
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* ── Our Story ── */}
        {activeSection === "story" && (
          <div className="flex flex-col gap-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="flex flex-col gap-5">
                <span className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest">
                  Who We Are
                </span>
                <h2
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-3xl font-bold text-[#1A1209] leading-snug"
                >
                  A Marketplace Born from Island Pride
                </h2>
                <p className="text-[#1A1209]/60 leading-relaxed text-sm">
                  Founded in 2021 in Colombo, Ceylonica was born from a simple
                  belief — that Sri Lanka's extraordinary natural wealth and
                  artisan heritage deserved a global stage. We started with a
                  handful of spice growers in Kandy and a small team of
                  passionate locals.
                </p>
                <p className="text-[#1A1209]/60 leading-relaxed text-sm">
                  Today, we work with over 200 verified suppliers across the
                  island, from cinnamon farmers in Matale to gem cutters in
                  Ratnapura, bringing authentically Sri Lankan goods to
                  customers worldwide.
                </p>
              </div>
              <div className="bg-[#1A1209] rounded-2xl p-8 flex flex-col gap-6">
                {[
                  { value: "200+", label: "Verified Suppliers" },
                  { value: "15,000+", label: "Happy Customers" },
                  { value: "40+", label: "Product Categories" },
                  { value: "28", label: "Countries Shipped To" },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between border-b border-[#FAF6EE]/10 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="text-[#FAF6EE]/50 text-sm">{label}</span>
                    <span
                      style={{ fontFamily: "'Playfair Display', serif" }}
                      className="text-[#C9A84C] text-2xl font-bold"
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* What we sell */}
            <div>
              <span className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest">
                What We Offer
              </span>
              <h2
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-3xl font-bold text-[#1A1209] mt-2 mb-8"
              >
                The Finest of the Island
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  {
                    icon: "🌿",
                    title: "Spices & Herbs",
                    desc: "True Ceylon cinnamon, cardamom, cloves, pepper, and turmeric sourced directly from farmers.",
                  },
                ].map(({ icon, title, desc }) => (
                  <div
                    key={title}
                    className="bg-white rounded-2xl p-6 border border-[#1A1209]/5 shadow-sm flex gap-4"
                  >
                    <span className="text-3xl shrink-0">{icon}</span>
                    <div>
                      <h4
                        style={{ fontFamily: "'Playfair Display', serif" }}
                        className="font-bold text-[#1A1209] mb-1"
                      >
                        {title}
                      </h4>
                      <p className="text-[#1A1209]/50 text-sm leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Awards ── */}
        {activeSection === "awards" && (
          <div className="flex flex-col gap-8">
            <div>
              <span className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest">
                Recognition
              </span>
              <h2
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-3xl font-bold text-[#1A1209] mt-2 mb-2"
              >
                Awards & Achievements
              </h2>
              <p className="text-[#1A1209]/50 text-sm">
                Recognised by leading industry bodies for excellence in digital
                commerce and cultural preservation.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {awards.map(({ year, title, body }) => (
                <div
                  key={title}
                  className="bg-white rounded-2xl p-6 border border-[#1A1209]/5 shadow-sm flex gap-5 items-start"
                >
                  <div className="shrink-0 w-14 h-14 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center">
                    <span className="text-[#C9A84C] font-bold text-sm">
                      {year}
                    </span>
                  </div>
                  <div>
                    <h4
                      style={{ fontFamily: "'Playfair Display', serif" }}
                      className="font-bold text-[#1A1209] text-base mb-1"
                    >
                      {title}
                    </h4>
                    <p className="text-[#1A1209]/40 text-xs uppercase tracking-wide">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Team ── */}
        {activeSection === "team" && (
          <div className="flex flex-col gap-8">
            <div>
              <span className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest">
                The People
              </span>
              <h2
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-3xl font-bold text-[#1A1209] mt-2 mb-2"
              >
                Meet Our Team
              </h2>
              <p className="text-[#1A1209]/50 text-sm">
                A passionate group of Sri Lankans dedicated to sharing the best
                of their homeland.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {team.map(({ name, role, bio, avatar }) => (
                <div
                  key={name}
                  className="bg-white rounded-2xl p-6 border border-[#1A1209]/5 shadow-sm flex gap-5 items-start"
                >
                  <div className="shrink-0 w-14 h-14 rounded-full bg-[#1A1209] flex items-center justify-center">
                    <span className="text-[#C9A84C] font-bold text-sm">
                      {avatar}
                    </span>
                  </div>
                  <div>
                    <h4
                      style={{ fontFamily: "'Playfair Display', serif" }}
                      className="font-bold text-[#1A1209] text-base"
                    >
                      {name}
                    </h4>
                    <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-wide mb-2">
                      {role}
                    </p>
                    <p className="text-[#1A1209]/50 text-sm leading-relaxed">
                      {bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutPage;
