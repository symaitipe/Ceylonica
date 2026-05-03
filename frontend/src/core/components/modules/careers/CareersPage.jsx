import React from "react";

const openings = [
  {
    title: "Senior Frontend Engineer",
    type: "Full-time",
    location: "Colombo / Remote",
    dept: "Engineering",
  },
  {
    title: "Supplier Relations Manager",
    type: "Full-time",
    location: "Kandy",
    dept: "Operations",
  },
  {
    title: "Content & Social Media Lead",
    type: "Full-time",
    location: "Colombo",
    dept: "Marketing",
  },
  {
    title: "UX / Product Designer",
    type: "Contract",
    location: "Remote",
    dept: "Design",
  },
];

const CareersPage = () => {
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
            Careers
          </span>
          <h1
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-5xl md:text-6xl font-bold leading-tight"
          >
            Grow with <span className="text-[#C9A84C]">Ceylonica</span>
          </h1>
          <p className="text-[#FAF6EE]/60 text-lg max-w-2xl leading-relaxed">
            We're a small team with big ambitions. If you're passionate about
            Sri Lankan culture, e-commerce, or technology — we'd love to hear
            from you.
          </p>
        </div>
      </section>

      <div className="h-1 bg-gradient-to-r from-[#C9A84C]/0 via-[#C9A84C] to-[#C9A84C]/0" />

      <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col gap-12">
        {/* Why join us */}
        <div>
          <span className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest">
            Why Ceylonica
          </span>
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-3xl font-bold text-[#1A1209] mt-2 mb-8"
          >
            A Place to Do Your Best Work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                icon: "🌴",
                title: "Mission-Driven",
                desc: "Work on something that preserves culture and supports local communities across Sri Lanka.",
              },
              {
                icon: "🚀",
                title: "Fast-Moving",
                desc: "Small team, big impact. Your work ships quickly and makes a real difference every day.",
              },
              {
                icon: "🌍",
                title: "Remote Friendly",
                desc: "Most roles are remote or hybrid. We care about results, not where you sit.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 border border-[#1A1209]/5 shadow-sm flex flex-col gap-3"
              >
                <span className="text-3xl">{icon}</span>
                <h4
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="font-bold text-[#1A1209]"
                >
                  {title}
                </h4>
                <p className="text-[#1A1209]/50 text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Roles */}
        <div>
          <span className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest">
            Open Positions
          </span>
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-3xl font-bold text-[#1A1209] mt-2 mb-8"
          >
            Current Openings
          </h2>
          <div className="flex flex-col gap-4">
            {openings.map(({ title, type, location, dept }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 border border-[#1A1209]/5 shadow-sm
                           flex items-center justify-between gap-4
                           hover:border-[#C9A84C]/40 transition-colors group"
              >
                <div className="flex flex-col gap-1">
                  <h4
                    style={{ fontFamily: "'Playfair Display', serif" }}
                    className="font-bold text-[#1A1209] text-base"
                  >
                    {title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-[#1A1209]/40">
                    <span className="bg-[#C9A84C]/10 text-[#C9A84C] font-semibold px-2 py-0.5 rounded-full">
                      {dept}
                    </span>
                    <span>·</span>
                    <span>{location}</span>
                    <span>·</span>
                    <span>{type}</span>
                  </div>
                </div>
                <button
                  className="shrink-0 bg-[#1A1209] text-[#FAF6EE] text-xs font-semibold
                                   px-5 py-2.5 rounded-full hover:bg-[#C9A84C] hover:text-[#1A1209]
                                   transition-all duration-200"
                >
                  Apply
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Open Application */}
        <div className="bg-[#1A1209] rounded-2xl p-10 text-center flex flex-col items-center gap-5">
          <h3
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-2xl font-bold text-[#FAF6EE]"
          >
            Don't see your role?
          </h3>
          <p className="text-[#FAF6EE]/50 text-sm max-w-md leading-relaxed">
            We're always looking for talented people. Send us your CV and tell
            us how you'd contribute to Ceylonica.
          </p>
          <a
            href="mailto:careers@ceylonica.com"
            className="bg-[#C9A84C] text-[#1A1209] font-semibold px-8 py-3 rounded-full
                       hover:bg-[#e0bc5a] transition-colors text-sm"
          >
            Send Open Application
          </a>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
