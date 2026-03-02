'use client';

import { useState } from 'react';
import Link from 'next/link';

type FormData = {
  // Personal Info
  fullName: string;
  dob: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  // Service type
  clientType: string;
  // Equine info
  horseName: string;
  horseBreed: string;
  horseAge: string;
  ownerRelationship: string;
  // Medical info
  conditions: string[];
  medications: string;
  previousCryo: string;
  // Waiver
  agreedToWaiver: boolean;
  agreedToRisks: boolean;
  agreedToEquine: boolean;
  // Signature
  signature: string;
  signatureDate: string;
};

const medicalConditions = [
  'Raynaud\'s Disease / Syndrome',
  'Cold Allergy or Urticaria',
  'Cryoglobulinemia',
  'Pregnancy',
  'Hypertension (high blood pressure)',
  'Cardiovascular / Heart Condition',
  'Diabetes',
  'Peripheral Vascular Disease',
  'Open Wounds or Active Skin Infection',
  'Severe Anemia',
  'History of Frostbite',
  'Neuropathy (nerve damage)',
  'Seizure Disorder',
  'Claustrophobia (for whole-body)',
];

const initialForm: FormData = {
  fullName: '',
  dob: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  emergencyContactName: '',
  emergencyContactPhone: '',
  clientType: 'human',
  horseName: '',
  horseBreed: '',
  horseAge: '',
  ownerRelationship: '',
  conditions: [],
  medications: '',
  previousCryo: '',
  agreedToWaiver: false,
  agreedToRisks: false,
  agreedToEquine: false,
  signature: '',
  signatureDate: new Date().toISOString().split('T')[0],
};

export default function WaiverPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const isEquine = form.clientType === 'equine' || form.clientType === 'both';

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'agreedToWaiver' || name === 'agreedToRisks' || name === 'agreedToEquine') {
        setForm((prev) => ({ ...prev, [name]: checked }));
      } else if (name === 'conditions') {
        setForm((prev) => ({
          ...prev,
          conditions: checked
            ? [...prev.conditions, value]
            : prev.conditions.filter((c) => c !== value),
        }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.agreedToWaiver || !form.agreedToRisks) {
      setError('You must agree to all waiver terms to proceed.');
      return;
    }
    if (isEquine && !form.agreedToEquine) {
      setError('You must agree to the equine waiver terms.');
      return;
    }
    if (form.signature.trim() === '') {
      setError('Please enter your full name as your digital signature.');
      return;
    }
    if (form.signature.trim().toLowerCase() !== form.fullName.trim().toLowerCase()) {
      setError('Your signature must match your full name exactly.');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/waiver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    'w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(239,68,68,0.2)] rounded-lg px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/30 transition-all text-sm';
  const labelClass = 'block text-slate-300 text-sm font-medium mb-1.5';

  if (submitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="max-w-lg w-full text-center">
          <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-white mb-3">Waiver Submitted!</h1>
          <p className="text-slate-400 mb-6 leading-relaxed">
            Thank you, <span className="text-white font-semibold">{form.fullName}</span>. Your waiver
            has been received and saved. You&apos;re all set for your session!
          </p>
          <div className="bg-[#071428] border border-red-500/10 rounded-xl p-5 mb-8 text-sm text-slate-400 text-left">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-500 font-semibold">What&apos;s Next</span>
            </div>
            <ul className="space-y-1.5">
              <li>• Your waiver is on file for all future sessions.</li>
              <li>• You&apos;ll receive a copy at <span className="text-slate-300">{form.email}</span>.</li>
              <li>• Ready to book? Schedule your first session now.</li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/schedule"
              className="bg-red-600 hover:bg-red-500 text-[#020c1b] font-bold px-6 py-3 rounded-full text-sm transition-colors"
            >
              Book a Session
            </Link>
            <Link
              href="/"
              className="border border-red-500/30 text-red-500 hover:text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(239,68,68,0.09) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-3xl mx-auto text-center relative">
          <p className="text-red-500 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            Required Before Your Session
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Liability Waiver
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            All clients must complete and sign this waiver before their first session. Your information is stored securely.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* ── SECTION 1: Client Type ── */}
          <div className="bg-[#071428] border border-red-500/10 rounded-2xl p-7 sm:p-9">
            <h2 className="text-xl font-black text-white mb-1">Client Type</h2>
            <p className="text-slate-500 text-sm mb-6">Are you signing this waiver for yourself, your horse, or both?</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { value: 'human', label: 'Human Only' },
                { value: 'equine', label: 'Equine Only' },
                { value: 'both', label: 'Both' },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-all ${
                    form.clientType === opt.value
                      ? 'border-red-500 bg-red-500/10'
                      : 'border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="clientType"
                    value={opt.value}
                    checked={form.clientType === opt.value}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      form.clientType === opt.value
                        ? 'border-red-500'
                        : 'border-slate-600'
                    }`}
                  >
                    {form.clientType === opt.value && (
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                    )}
                  </div>
                  <span className={form.clientType === opt.value ? 'text-white font-semibold text-sm' : 'text-slate-400 text-sm'}>
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* ── SECTION 2: Personal Information ── */}
          <div className="bg-[#071428] border border-red-500/10 rounded-2xl p-7 sm:p-9">
            <h2 className="text-xl font-black text-white mb-1">Personal Information</h2>
            <p className="text-slate-500 text-sm mb-6">Your contact and personal details.</p>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="fullName">Full Legal Name *</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Jane Marie Smith"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="dob">Date of Birth *</label>
                  <input
                    id="dob"
                    name="dob"
                    type="date"
                    value={form.dob}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="phone">Phone Number *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(555) 000-0000"
                    required
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    required
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="address">Street Address *</label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="123 Main Street"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="city">City *</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Springfield"
                    required
                    className={inputClass}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass} htmlFor="state">State *</label>
                    <input
                      id="state"
                      name="state"
                      type="text"
                      value={form.state}
                      onChange={handleChange}
                      placeholder="TX"
                      maxLength={2}
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="zip">ZIP</label>
                    <input
                      id="zip"
                      name="zip"
                      type="text"
                      value={form.zip}
                      onChange={handleChange}
                      placeholder="78701"
                      maxLength={10}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <h3 className="text-slate-300 font-semibold text-sm mb-4">Emergency Contact</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass} htmlFor="emergencyContactName">Contact Name *</label>
                    <input
                      id="emergencyContactName"
                      name="emergencyContactName"
                      type="text"
                      value={form.emergencyContactName}
                      onChange={handleChange}
                      placeholder="John Smith"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="emergencyContactPhone">Contact Phone *</label>
                    <input
                      id="emergencyContactPhone"
                      name="emergencyContactPhone"
                      type="tel"
                      value={form.emergencyContactPhone}
                      onChange={handleChange}
                      placeholder="(555) 000-0000"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── SECTION 3: Equine Info (conditional) ── */}
          {isEquine && (
            <div className="bg-[#0f1a0a] border border-blue-400/15 rounded-2xl p-7 sm:p-9">
              <div className="flex items-center gap-2 mb-1">
                <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
                <h2 className="text-xl font-black text-white">Equine Information</h2>
              </div>
              <p className="text-slate-500 text-sm mb-6">Details about the horse receiving treatment.</p>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass} htmlFor="horseName">Horse Name *</label>
                    <input
                      id="horseName"
                      name="horseName"
                      type="text"
                      value={form.horseName}
                      onChange={handleChange}
                      placeholder="Thunder"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="horseBreed">Breed *</label>
                    <input
                      id="horseBreed"
                      name="horseBreed"
                      type="text"
                      value={form.horseBreed}
                      onChange={handleChange}
                      placeholder="Quarter Horse"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="horseAge">Age (years)</label>
                    <input
                      id="horseAge"
                      name="horseAge"
                      type="number"
                      min="1"
                      max="40"
                      value={form.horseAge}
                      onChange={handleChange}
                      placeholder="8"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="ownerRelationship">Your Relationship to Horse</label>
                    <select
                      id="ownerRelationship"
                      name="ownerRelationship"
                      value={form.ownerRelationship}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select...</option>
                      <option value="owner">Owner</option>
                      <option value="trainer">Trainer</option>
                      <option value="lessee">Lessee</option>
                      <option value="authorized_agent">Authorized Agent</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── SECTION 4: Medical History ── */}
          <div className="bg-[#071428] border border-red-500/10 rounded-2xl p-7 sm:p-9">
            <h2 className="text-xl font-black text-white mb-1">Medical History</h2>
            <p className="text-slate-500 text-sm mb-6">
              Check any conditions that apply to you. This information is kept strictly confidential.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
              {medicalConditions.map((condition) => (
                <label
                  key={condition}
                  className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-all text-sm ${
                    form.conditions.includes(condition)
                      ? 'border-red-500/50 bg-red-500/5 text-red-400'
                      : 'border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    name="conditions"
                    value={condition}
                    checked={form.conditions.includes(condition)}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${
                      form.conditions.includes(condition)
                        ? 'border-red-500 bg-red-500'
                        : 'border-slate-600'
                    }`}
                  >
                    {form.conditions.includes(condition) && (
                      <svg className="w-2.5 h-2.5 text-[#020c1b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  {condition}
                </label>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass} htmlFor="medications">Current Medications</label>
                <textarea
                  id="medications"
                  name="medications"
                  rows={2}
                  value={form.medications}
                  onChange={handleChange}
                  placeholder="List any current medications, or write 'None'"
                  className={`${inputClass} resize-none`}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="previousCryo">Previous Cryotherapy Experience</label>
                <select
                  id="previousCryo"
                  name="previousCryo"
                  value={form.previousCryo}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select...</option>
                  <option value="none">None — this is my first time</option>
                  <option value="1-5">1–5 sessions</option>
                  <option value="6-20">6–20 sessions</option>
                  <option value="20+">More than 20 sessions</option>
                </select>
              </div>
            </div>
          </div>

          {/* ── SECTION 5: Waiver Text & Agreements ── */}
          <div className="bg-[#071428] border border-red-500/10 rounded-2xl p-7 sm:p-9">
            <h2 className="text-xl font-black text-white mb-4">Waiver & Release of Liability</h2>

            {/* Waiver Text */}
            <div className="bg-[#020c1b] border border-slate-800 rounded-xl p-5 mb-6 max-h-72 overflow-y-auto text-sm text-slate-400 leading-relaxed space-y-4">
              <p className="font-semibold text-slate-300">
                BEAST & BODY MOBILE RECOVERY — LIABILITY WAIVER AND INFORMED CONSENT
              </p>
              <p>
                I, the undersigned, hereby acknowledge that I have voluntarily chosen to receive
                cryotherapy services (&#8220;Services&#8221;) provided by Beast & Body Mobile Recovery
                (&#8220;Company&#8221;). I understand and agree to the following:
              </p>
              <p className="font-medium text-slate-300">1. Nature of Service</p>
              <p>
                Cryotherapy involves the therapeutic application of controlled cold temperatures to
                body tissue for the purpose of reducing inflammation, managing pain, and accelerating
                recovery. Localized cryotherapy applies targeted cold therapy to specific body areas.
                Sessions typically last 10–20 minutes.
              </p>
              <p className="font-medium text-slate-300">2. Assumption of Risk</p>
              <p>
                I understand that cryotherapy, like all therapeutic treatments, carries potential
                risks. These risks include but are not limited to: temporary skin redness or
                discoloration, numbness or tingling, skin burns or frostbite from improper
                application, cold-induced allergic reactions (cold urticaria), dizziness or fainting,
                temporary increase or decrease in blood pressure, and in rare cases, more serious
                adverse reactions. I voluntarily accept these risks.
              </p>
              <p className="font-medium text-slate-300">3. Medical Clearance & Contraindications</p>
              <p>
                I confirm that I am physically capable of safely receiving cryotherapy. I understand
                that certain conditions are contraindicated with cold therapy, including but not
                limited to: Raynaud&#8217;s Disease, cold allergy (cold urticaria), cryoglobulinemia,
                pregnancy, uncontrolled hypertension, cardiovascular conditions, open wounds or active
                skin infections, severe peripheral vascular disease, and severe anemia. If I have any
                of these conditions or any other condition that may be affected by cold therapy, I
                have disclosed this information and have obtained written clearance from my physician.
              </p>
              <p className="font-medium text-slate-300">4. Release of Liability</p>
              <p>
                In consideration of Beast & Body Mobile Recovery providing Services to me, I, on
                behalf of myself, my heirs, assigns, and legal representatives, hereby release,
                waive, discharge, and covenant not to sue Beast & Body Mobile Recovery, its owners,
                officers, employees, agents, contractors, and representatives (collectively,
                &#8220;Released Parties&#8221;) from any and all liability, claims, demands, actions,
                or causes of action whatsoever, arising out of or related to any loss, damage, or
                injury that may be sustained during or as a result of receiving cryotherapy services,
                whether caused by the negligence of the Released Parties or otherwise.
              </p>
              <p className="font-medium text-slate-300">5. Indemnification</p>
              <p>
                I agree to indemnify, defend, and hold harmless the Released Parties from any loss,
                liability, damage, or costs, including court costs and attorneys&#8217; fees, that they
                may incur due to my participation in the Services, whether caused by the negligence
                of the Released Parties or otherwise, to the fullest extent allowed by law.
              </p>
              <p className="font-medium text-slate-300">6. Truthfulness of Information</p>
              <p>
                I certify that all information I have provided on this form is true, complete, and
                accurate to the best of my knowledge. I understand that providing false or misleading
                information may result in harm to myself and shall relieve the Released Parties of
                any liability.
              </p>
              <p className="font-medium text-slate-300">7. Photography & Media Release</p>
              <p>
                I grant Beast & Body Mobile Recovery permission to use photographs or videos taken
                during my session for marketing and promotional purposes, unless I expressly opt out
                in writing.
              </p>
              <p className="font-medium text-slate-300">8. Governing Law</p>
              <p>
                This waiver shall be governed by and construed in accordance with the laws of the
                state in which services are rendered. If any provision of this waiver is held
                unenforceable, the remaining provisions shall continue in full force and effect.
              </p>
              <p className="font-medium text-slate-300">9. Acknowledgment</p>
              <p>
                I acknowledge that I have read this waiver carefully, that I understand its contents,
                and that I am signing it freely and voluntarily. I am at least 18 years of age, or
                if a minor, this waiver is being signed by my parent or legal guardian.
              </p>
            </div>

            {/* Agreement Checkboxes */}
            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div
                  className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                    form.agreedToWaiver
                      ? 'border-red-500 bg-red-500'
                      : 'border-slate-600 group-hover:border-slate-500'
                  }`}
                  onClick={() => setForm((p) => ({ ...p, agreedToWaiver: !p.agreedToWaiver }))}
                >
                  {form.agreedToWaiver && (
                    <svg className="w-3 h-3 text-[#020c1b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  name="agreedToWaiver"
                  checked={form.agreedToWaiver}
                  onChange={handleChange}
                  className="hidden"
                />
                <span className="text-slate-300 text-sm leading-relaxed">
                  <span className="text-white font-semibold">I have read, understand, and agree</span> to
                  the Liability Waiver and Release of Liability set forth above. I acknowledge that I am
                  voluntarily choosing to receive cryotherapy services. *
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <div
                  className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                    form.agreedToRisks
                      ? 'border-red-500 bg-red-500'
                      : 'border-slate-600 group-hover:border-slate-500'
                  }`}
                  onClick={() => setForm((p) => ({ ...p, agreedToRisks: !p.agreedToRisks }))}
                >
                  {form.agreedToRisks && (
                    <svg className="w-3 h-3 text-[#020c1b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  name="agreedToRisks"
                  checked={form.agreedToRisks}
                  onChange={handleChange}
                  className="hidden"
                />
                <span className="text-slate-300 text-sm leading-relaxed">
                  <span className="text-white font-semibold">I understand and accept the risks</span>{' '}
                  associated with cryotherapy as described above. I confirm I have no contraindicated
                  conditions, or I have obtained physician clearance. *
                </span>
              </label>

              {isEquine && (
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div
                    className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                      form.agreedToEquine
                        ? 'border-blue-400 bg-blue-400'
                        : 'border-slate-600 group-hover:border-slate-500'
                    }`}
                    onClick={() => setForm((p) => ({ ...p, agreedToEquine: !p.agreedToEquine }))}
                  >
                    {form.agreedToEquine && (
                      <svg className="w-3 h-3 text-[#020c1b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    name="agreedToEquine"
                    checked={form.agreedToEquine}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <span className="text-slate-300 text-sm leading-relaxed">
                    <span className="text-blue-400 font-semibold">Equine Release:</span>{' '}
                    I certify that I am the owner or legally authorized agent for the horse listed above.
                    I confirm the horse is in generally good health and has no known contraindications to
                    cold therapy. I accept full responsibility for the horse&#8217;s behavior during treatment
                    and release Beast & Body Mobile Recovery from liability for any injury to the horse or
                    personnel arising from the horse&#8217;s behavior. *
                  </span>
                </label>
              )}
            </div>
          </div>

          {/* ── SECTION 6: Digital Signature ── */}
          <div className="bg-[#071428] border border-red-500/10 rounded-2xl p-7 sm:p-9">
            <h2 className="text-xl font-black text-white mb-1">Digital Signature</h2>
            <p className="text-slate-500 text-sm mb-6">
              Type your full legal name exactly as entered above to serve as your electronic signature.
              This is legally binding.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelClass} htmlFor="signature">
                  Type Full Name as Signature *
                </label>
                <input
                  id="signature"
                  name="signature"
                  type="text"
                  value={form.signature}
                  onChange={handleChange}
                  placeholder="Jane Marie Smith"
                  required
                  className={`${inputClass} font-medium italic`}
                  style={{ fontFamily: 'Georgia, serif', fontSize: '1rem' }}
                />
                {form.signature && form.signature.trim().toLowerCase() !== form.fullName.trim().toLowerCase() && (
                  <p className="text-blue-400 text-xs mt-1.5">Signature must match your full name exactly.</p>
                )}
              </div>
              <div>
                <label className={labelClass} htmlFor="signatureDate">Date *</label>
                <input
                  id="signatureDate"
                  name="signatureDate"
                  type="date"
                  value={form.signatureDate}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            </div>

            <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4 text-xs text-slate-500 leading-relaxed">
              By typing your name above, you acknowledge that your electronic signature is legally equivalent
              to a handwritten signature and that you have read, understood, and agreed to all terms of
              this waiver. This document will be retained by Beast & Body Mobile Recovery.
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-400/10 border border-red-400/30 rounded-xl p-4 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting || !form.agreedToWaiver || !form.agreedToRisks || (isEquine && !form.agreedToEquine)}
              className="bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-[#020c1b] font-black px-10 py-4 rounded-full text-base tracking-wide transition-all duration-200 hover:shadow-xl hover:shadow-red-500/25 flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit Signed Waiver'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
