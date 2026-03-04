import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About | Beast & Body Mobile Recovery',
  description:
    'Learn about Beast & Body Mobile Recovery — who we are, our mission, and why we are passionate about cryotherapy for humans and horses.',
};

const values = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Safety First',
    description:
      'Every session follows strict protocols. Our technicians are trained and insured to deliver safe treatments for both humans and horses.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Results-Driven',
    description:
      'We measure success by your recovery. Our treatments are science-backed and results-focused, not trendy or gimmicky.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Truly Mobile',
    description:
      'We believe recovery should happen on your terms. Our fully equipped mobile unit means zero travel time — we come to your home, barn, or training facility.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Compassionate Care',
    description:
      'We treat every client — human or horse — with the same dedication, respect, and attention they deserve.',
  },
];

const faqs = [
  {
    q: 'What is cryotherapy?',
    a: 'Cryotherapy is the therapeutic use of extreme cold to treat tissue, reduce inflammation, manage pain, and accelerate recovery. We use localized and targeted application techniques for both humans and horses.',
  },
  {
    q: 'Is cryotherapy safe for horses?',
    a: 'Yes — equine cryotherapy is well-established in veterinary sports medicine. We use techniques specifically designed for horses, applied by technicians trained in equine anatomy and stress responses.',
  },
  {
    q: 'How long does a session take?',
    a: 'Most sessions run 10–20 minutes for targeted treatment. A full consultation, treatment, and wrap-up typically takes 30–45 minutes per client.',
  },
  {
    q: 'Do I need a waiver?',
    a: 'Yes. All clients (human and equine owners) are required to complete a waiver before their first session. You can sign it online at any time.',
  },
  {
    q: 'What areas do you serve?',
    a: 'We operate as a fully mobile service and cover a wide regional area. Contact us to confirm availability in your location.',
  },
  {
    q: 'How often should I book sessions?',
    a: 'Frequency depends on your goals and condition. Many competitive athletes and horse owners schedule weekly or bi-weekly sessions during heavy training periods.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* ── HERO ── */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(239,68,68,0.1) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="text-red-500 text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Our Story
          </p>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight">
            Built on a Passion for
            <span className="text-red-500"> Recovery</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Beast & Body Mobile Recovery was born from a love of both sport and horses — and the belief that every athlete, two-legged or four, deserves access to the best recovery tools available.
          </p>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Visual */}
            <div className="relative order-2 lg:order-1">
              <div
                className="rounded-3xl p-12 border border-red-500/15 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #071428 0%, #020c1b 100%)',
                }}
              >
                <div className="absolute top-0 right-0 w-48 h-48 opacity-10"
                  style={{ background: 'radial-gradient(circle, #ef4444, transparent 70%)' }}
                />
                <div className="relative space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 font-black text-lg">
                      1
                    </div>
                    <div>
                      <div className="text-white font-bold">Mobile-First Design</div>
                      <div className="text-slate-400 text-sm">We bring the clinic to you.</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-400/10 border border-blue-400/20 flex items-center justify-center text-blue-400 font-black text-lg">
                      2
                    </div>
                    <div>
                      <div className="text-white font-bold">Dual Expertise</div>
                      <div className="text-slate-400 text-sm">Expertise in human and equine therapy.</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 font-black text-lg">
                      3
                    </div>
                    <div>
                      <div className="text-white font-bold">Science-Backed</div>
                      <div className="text-slate-400 text-sm">Every treatment grounded in evidence.</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-400/10 border border-blue-400/20 flex items-center justify-center text-blue-400 font-black text-lg">
                      4
                    </div>
                    <div>
                      <div className="text-white font-bold">Personalized Care</div>
                      <div className="text-slate-400 text-sm">Every session tailored to your needs.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <p className="text-red-500 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
                Our Mission
              </p>
              <h2 className="text-4xl font-black text-white mb-6">
                Bringing World-Class Recovery to Your Doorstep
              </h2>
              <p className="text-slate-400 leading-relaxed mb-5">
                We started Beast & Body because we saw a gap in the market: serious athletes — both human and equine — needed professional-grade recovery tools, but had limited access. Cryo clinics are great, but you can&apos;t exactly load your horse in a trailer for every session.
              </p>
              <p className="text-slate-400 leading-relaxed mb-5">
                So we built a solution that works for everyone. Our mobile unit is fully equipped to deliver professional cryotherapy at your home, gym, stable, or barn. No travel. No hassle. Just recovery.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                We are passionate about the animals in our care. Every equine session is conducted with patience, expertise, and a genuine love for horses. We understand that your horse isn&apos;t just an animal — it&apos;s a partner, an athlete, and a member of your family.
              </p>
              <Link
                href="/schedule"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-[#020c1b] font-black px-7 py-3.5 rounded-full text-sm tracking-wide transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25"
              >
                Book a Session Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-8"
        style={{ background: 'linear-gradient(to bottom, #020c1b, #030f22, #020c1b)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-red-500 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
              What We Stand For
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-[#071428] border border-red-500/10 rounded-2xl p-7 hover:border-red-500/25 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-5">
                  {value.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{value.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREDENTIALS ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-red-500 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
              Credentials
            </p>
            <h2 className="text-4xl font-black text-white">Trained & Insured</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {[
              {
                title: 'Equine Sports Medicine',
                body: 'Specialized training in equine anatomy, physiology, and therapeutic cold application for performance horses.',
                accent: 'amber',
              },
              {
                title: 'Fully Insured',
                body: 'Comprehensive liability insurance covering all treatments for both human and equine clients.',
                accent: 'sky',
              },
            ].map((cert) => (
              <div
                key={cert.title}
                className={`rounded-2xl p-7 border ${
                  cert.accent === 'sky'
                    ? 'bg-red-500/5 border-red-500/20'
                    : 'bg-blue-400/5 border-blue-400/20'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                    cert.accent === 'sky'
                      ? 'bg-red-500/15 text-red-500'
                      : 'bg-blue-400/15 text-blue-400'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-base mb-2">{cert.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{cert.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-8"
        style={{ background: 'linear-gradient(to bottom, #020c1b, #030f22, #020c1b)' }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-red-500 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
              FAQ
            </p>
            <h2 className="text-4xl font-black text-white">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="bg-[#071428] border border-red-500/10 rounded-xl p-6 hover:border-red-500/20 transition-colors"
              >
                <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">Ready to Get Started?</h2>
          <p className="text-slate-400 mb-8">
            Book your session online or sign your waiver before your first appointment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/schedule"
              className="bg-red-600 hover:bg-red-500 text-[#020c1b] font-black px-8 py-4 rounded-full text-base tracking-wide transition-all duration-200 hover:shadow-xl hover:shadow-red-500/30"
            >
              Book a Session
            </Link>
            <Link
              href="/waiver"
              className="border border-red-500/30 hover:border-red-500 text-red-500 hover:text-white font-semibold px-8 py-4 rounded-full text-base transition-all duration-200"
            >
              Sign Your Waiver
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
