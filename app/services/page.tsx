import WaiverCheckLink from '../components/WaiverCheckLink';

export const metadata = {
  title: 'Cryotherapy Services & Pricing | North Phoenix, AZ',
  description: 'Mobile cryotherapy services in North Phoenix, New River, Anthem, and Cave Creek, AZ. Spot treatment, athlete recovery, equine performance packages, and barn day rates. We come to you.',
};

const travelNote = 'A travel fee of $1/mile applies for locations beyond 85086. This fee may be waived for multi-horse appointments — ask when booking.';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#020c1b] pt-8 sm:pt-16 pb-20 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-red-500 text-xs font-bold tracking-[0.2em] uppercase mb-3">Mobile Cryotherapy</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Services & Pricing</h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We come to you — whether you&apos;re a weekend warrior, competitive athlete, or managing a barn full of performance horses.
          </p>
        </div>

        {/* Human Services */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-white">Human Cryotherapy</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Spot Cryo */}
            <div className="bg-[#071428] border border-slate-700/50 rounded-2xl p-6 hover:border-red-500/30 transition-colors">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-white font-bold text-lg leading-snug">Spot Cryotherapy</h3>
                <div className="text-right flex-shrink-0">
                  <span className="text-red-500 font-black text-xl">$35</span>
                  <p className="text-slate-500 text-xs">+$15 / additional area</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Targeted cold therapy applied directly to a specific area of pain, inflammation, or injury. Perfect for a sore shoulder, tight IT band, or any isolated trouble spot.
              </p>
            </div>

            {/* Athlete Recovery */}
            <div className="bg-[#071428] border border-slate-700/50 rounded-2xl p-6 hover:border-red-500/30 transition-colors">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-white font-bold text-lg leading-snug">Athlete Recovery Cryotherapy</h3>
                <div className="text-right flex-shrink-0">
                  <span className="text-red-500 font-black text-xl">$75</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                A full-body recovery protocol covering 4–5 major treatment areas in approximately 5–7 minutes. Ideal after competition, hard training blocks, or a tough week.
              </p>
            </div>
          </div>
        </section>

        {/* Equine Services */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center flex-shrink-0">
              {/* Horse icon (shield) */}
              <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-white">Equine Cryotherapy</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {/* Equine Spot */}
            <div className="bg-[#071428] border border-slate-700/50 rounded-2xl p-6 hover:border-red-500/30 transition-colors">
              <h3 className="text-white font-bold text-base mb-3">Equine Spot Cryotherapy</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Targeted treatment for tendons, ligaments, hocks, and soft-tissue structures. Priced by the number of areas treated.
              </p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-slate-300">
                  <span>1 Area</span><span className="font-bold text-red-500">$45</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>2 Areas</span><span className="font-bold text-red-500">$60</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>3 Areas</span><span className="font-bold text-red-500">$75</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Full Leg</span><span className="font-bold text-red-500">$90</span>
                </div>
                <p className="text-slate-500 text-xs pt-1">+$20 / additional area</p>
              </div>
            </div>

            {/* Performance / Show Prep */}
            <div className="bg-[#071428] border border-slate-700/50 rounded-2xl p-6 hover:border-red-500/30 transition-colors">
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="text-white font-bold text-base leading-snug">Performance / Show Prep</h3>
                <span className="text-red-500 font-black text-xl flex-shrink-0">$95</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Comprehensive pre-competition treatment covering 6–8 key points per horse. Approximately 5–8 minutes per horse. Great for show day or the day before.
              </p>
            </div>

            {/* Tendon & Suspensory */}
            <div className="bg-[#071428] border border-slate-700/50 rounded-2xl p-6 hover:border-red-500/30 transition-colors">
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="text-white font-bold text-base leading-snug">Tendon & Suspensory Recovery</h3>
                <span className="text-red-500 font-black text-xl flex-shrink-0">$85</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Focused protocol targeting tendons, suspensory ligaments, and hock structures. Ideal for horses in heavy work or returning from soft-tissue injury.
              </p>
            </div>
          </div>
        </section>

        {/* Barn Packages */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-white">Barn Day Packages</h2>
          </div>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed max-w-2xl">
            Bring the whole barn in one visit. Each package includes 2 treatment areas per horse. Additional horses are +$45/horse; additional areas are +$15/area.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-[#071428] border border-slate-700/50 rounded-2xl p-6 hover:border-red-500/30 transition-colors">
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="text-white font-bold text-base">Performance Package</h3>
                <span className="text-red-500 font-black text-xl flex-shrink-0">$180</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">Up to 4 horses · 2 areas each</p>
              <p className="text-slate-500 text-xs mt-2">+$45/horse · +$15/area</p>
            </div>

            <div className="bg-[#071428] border border-amber-500/20 rounded-2xl p-6 hover:border-amber-500/30 transition-colors">
              <div className="flex items-center justify-between gap-2 mb-3">
                <h3 className="text-white font-bold text-base">Competition Package</h3>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold px-2 py-0.5 rounded-full">Popular</span>
                  <span className="text-red-500 font-black text-xl">$300</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">Up to 6 horses · 2 areas each</p>
              <p className="text-slate-500 text-xs mt-2">+$45/horse · +$15/area</p>
            </div>

            <div className="bg-[#071428] border border-slate-700/50 rounded-2xl p-6 hover:border-red-500/30 transition-colors">
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="text-white font-bold text-base">Full Barn Recovery Day</h3>
                <span className="text-red-500 font-black text-xl flex-shrink-0">$500</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">Up to 10 horses · 2 areas each</p>
              <p className="text-slate-500 text-xs mt-2">+$45/horse · +$15/area</p>
            </div>
          </div>
        </section>

        {/* Equine safety note */}
        <div className="bg-amber-400/5 border border-amber-400/20 rounded-2xl p-6 mb-16">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="font-semibold text-amber-400 mb-1">A Note on Equine Treatments</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                For the safety and comfort of both horse and handler, equine cryotherapy is best suited for horses that are calm and comfortable with basic handling. The cryotherapy unit produces a mild hissing sound during use. If you&apos;re unsure how your horse may react, please reach out beforehand — I&apos;m happy to discuss whether treatment would be a good fit.
              </p>
            </div>
          </div>
        </div>

        {/* Travel fee */}
        <div className="bg-[#071428] border border-slate-700/40 rounded-2xl p-6 mb-16 flex items-start gap-3">
          <svg className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div>
            <p className="font-semibold text-white mb-1">Travel Fee</p>
            <p className="text-slate-400 text-sm leading-relaxed">{travelNote}</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-slate-400 text-sm mb-6">Ready to book? Submit your preferred date and time and we&apos;ll call to confirm availability.</p>
          <WaiverCheckLink className="inline-block bg-red-600 hover:bg-red-500 text-white font-black px-8 py-3 rounded-full text-sm transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25 tracking-wide">
            Book a Session
          </WaiverCheckLink>
        </div>

      </div>
    </div>
  );
}
