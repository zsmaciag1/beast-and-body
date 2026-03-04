import Link from 'next/link';
import WaiverCheckLink from './components/WaiverCheckLink';

const humanBenefits = [
  'Accelerated muscle recovery',
  'Reduced inflammation & soreness',
  'Improved athletic performance',
  'Enhanced circulation',
  'Pain relief for chronic conditions',
  'Boosted mood & energy levels',
];

const equineBenefits = [
  'Post-competition muscle recovery',
  'Reduced joint inflammation',
  'Tendon & ligament support',
  'Improved range of motion',
  'Pre-event performance prep',
  'Non-invasive, stress-free treatment',
];

const stats = [
  { value: '500+', label: 'Sessions Completed' },
  { value: '100%', label: 'Mobile Service' },
  { value: '2-in-1', label: 'Human & Equine' },
  { value: '24hr', label: 'Booking Response' },
];

const process = [
  {
    step: '01',
    title: 'Book Online',
    description: 'Choose your service type and preferred time. We confirm within 24 hours.',
  },
  {
    step: '02',
    title: 'We Come to You',
    description: 'Our mobile unit arrives at your location — barn, stable, home, or gym.',
  },
  {
    step: '03',
    title: 'Treatment Session',
    description: 'Targeted cold therapy administered by certified professionals. Sessions take 10–20 minutes.',
  },
  {
    step: '04',
    title: 'Recovery Begins',
    description: 'Feel the difference immediately. Most clients report improved mobility and reduced soreness within hours.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-start justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-[#020c1b]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(239,68,68,0.12) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(220,38,38,0.07) 0%, transparent 60%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 pb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 mb-8">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-500 text-xs font-semibold tracking-wider uppercase">
              Mobile Cryotherapy — We Come to You
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-none tracking-tight">
            RECOVER LIKE
            <span className="block text-red-500">A CHAMPION</span>
          </h1>

          <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Professional mobile cryotherapy for{' '}
            <span className="text-white font-semibold">humans</span> and{' '}
            <span className="text-white font-semibold">horses</span>. Beast & Body
            brings cutting-edge cold therapy recovery directly to your door — or your barn.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <WaiverCheckLink className="bg-red-600 hover:bg-red-500 text-[#020c1b] font-black px-8 py-4 rounded-full text-base tracking-wide transition-all duration-200 hover:shadow-xl hover:shadow-red-500/30 hover:-translate-y-0.5 w-full sm:w-auto">
              Book Your Session →
            </WaiverCheckLink>
            <Link
              href="/about"
              className="border border-red-500/30 hover:border-red-500/60 text-red-400 hover:text-white font-semibold px-8 py-4 rounded-full text-base transition-all duration-200 hover:bg-red-500/5 w-full sm:w-auto"
            >
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-20 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-black text-red-500">{stat.value}</div>
                <div className="text-slate-400 text-xs mt-1 tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020c1b] to-transparent" />
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-red-500 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
              Our Services
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white">
              Cold Therapy for Every Athlete
            </h2>
            <p className="text-slate-400 text-lg mt-4 max-w-xl mx-auto">
              Whether you&apos;re a weekend warrior or a competitive equestrian — we have a treatment built for you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Human Card */}
            <div className="group relative rounded-2xl overflow-hidden border border-red-500/10 bg-gradient-to-br from-[#1a0507] to-[#020c1b] hover:border-red-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/5">
              <div className="absolute top-0 right-0 w-64 h-64 opacity-5 group-hover:opacity-10 transition-opacity">
                <div
                  className="w-full h-full"
                  style={{
                    background: 'radial-gradient(circle, #ef4444 0%, transparent 70%)',
                  }}
                />
              </div>
              <div className="relative p-8 sm:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-red-500 text-xs font-semibold tracking-widest uppercase">Human</div>
                    <h3 className="text-2xl font-black text-white">Cryotherapy</h3>
                  </div>
                </div>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  Experience the power of localized cold therapy to accelerate recovery, reduce pain, and optimize performance. Our mobile unit comes to you — home, gym, or training facility.
                </p>
                <ul className="space-y-2 mb-8">
                  {humanBenefits.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-slate-300 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <WaiverCheckLink className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 font-semibold text-sm transition-colors group-hover:gap-3">
                  Book Human Session
                  <span>→</span>
                </WaiverCheckLink>
              </div>
            </div>

            {/* Equine Card */}
            <div className="group relative rounded-2xl overflow-hidden border border-blue-400/10 bg-gradient-to-br from-[#050a1f] to-[#020c1b] hover:border-blue-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-400/5">
              <div className="absolute top-0 right-0 w-64 h-64 opacity-5 group-hover:opacity-10 transition-opacity">
                <div
                  className="w-full h-full"
                  style={{
                    background: 'radial-gradient(circle, #60a5fa 0%, transparent 70%)',
                  }}
                />
              </div>
              <div className="relative p-8 sm:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-blue-400/10 border border-blue-400/20 flex items-center justify-center">
                    <svg className="w-7 h-7 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-blue-400 text-xs font-semibold tracking-widest uppercase">Equine</div>
                    <h3 className="text-2xl font-black text-white">Cryotherapy</h3>
                  </div>
                </div>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  Specialized cold therapy treatments for your performance horses. We travel to your barn or stable, delivering professional-grade recovery support for competitive and recreational horses alike.
                </p>
                <ul className="space-y-2 mb-8">
                  {equineBenefits.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-slate-300 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <WaiverCheckLink className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors group-hover:gap-3">
                  Book Equine Session
                  <span>→</span>
                </WaiverCheckLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-8"
        style={{
          background:
            'linear-gradient(to bottom, #020c1b, #041020, #020c1b)',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-red-500 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
              The Process
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, idx) => (
              <div key={step.step} className="relative">
                {idx < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-red-500/20 to-transparent z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
                    <span className="text-red-500 font-black text-lg">{step.step}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CRYOTHERAPY ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-red-500 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
                Why Cryotherapy?
              </p>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
                Science-Backed Cold Recovery
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                Cryotherapy uses controlled, targeted cold exposure to trigger your body&apos;s natural healing response. When applied by trained professionals, it delivers measurable results — faster recovery, less pain, and better performance.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                The same principles that apply to human athletes work for performance horses. Cold therapy reduces metabolic demand in damaged tissue, decreases inflammation, and promotes circulation upon rewarming — all without drugs or invasive procedures.
              </p>
              <WaiverCheckLink className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-[#020c1b] font-black px-7 py-3.5 rounded-full text-sm tracking-wide transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25">
                Start Your Recovery Today
              </WaiverCheckLink>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🧊', title: 'Non-Invasive', desc: 'No needles, no drugs, no downtime.' },
                { icon: '⚡', title: 'Fast Sessions', desc: '10–20 minute treatments with immediate relief.' },
                { icon: '📍', title: 'We Come to You', desc: 'Fully mobile — no need to travel.' },
                { icon: '🐴', title: 'Dual Service', desc: 'Certified for both human and equine clients.' },
                { icon: '📋', title: 'Certified Pros', desc: 'Trained and insured cryotherapy technicians.' },
                { icon: '🏆', title: 'Proven Results', desc: 'Used by athletes and trainers at every level.' },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-[#071428] border border-red-500/10 rounded-xl p-5 hover:border-red-500/25 transition-colors"
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="text-white font-semibold text-sm mb-1">{item.title}</div>
                  <div className="text-slate-500 text-xs leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="rounded-3xl p-12 sm:p-16 border border-red-500/20 relative overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg, rgba(220,38,38,0.08) 0%, rgba(2,12,27,0.9) 50%, rgba(239,68,68,0.05) 100%)',
            }}
          >
            <div className="absolute inset-0 opacity-5">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 30% 50%, #ef4444 0%, transparent 50%), radial-gradient(circle at 70% 50%, #ef4444 0%, transparent 50%)',
                }}
              />
            </div>
            <div className="relative">
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
                Ready to Recover?
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-lg mx-auto">
                Book a session for yourself, your horse, or both. We&apos;ll come to you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <WaiverCheckLink className="bg-red-600 hover:bg-red-500 text-[#020c1b] font-black px-8 py-4 rounded-full text-base tracking-wide transition-all duration-200 hover:shadow-xl hover:shadow-red-500/30">
                  Book a Session
                </WaiverCheckLink>
                <Link
                  href="/waiver"
                  className="border border-red-500/30 hover:border-red-500 text-red-500 hover:text-white font-semibold px-8 py-4 rounded-full text-base transition-all duration-200"
                >
                  Sign Waiver First
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
