'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type FormData = {
  serviceType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  serviceAddress: string;
  city: string;
  state: string;
  notes: string;
  // Equine fields
  horseName: string;
  horseBreed: string;
  horseAge: string;
  horseCondition: string;
  vetName: string;
  vetPhone: string;
};

const initialForm: FormData = {
  serviceType: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  preferredDate: '',
  preferredTime: '',
  serviceAddress: '',
  city: '',
  state: '',
  notes: '',
  horseName: '',
  horseBreed: '',
  horseAge: '',
  horseCondition: '',
  vetName: '',
  vetPhone: '',
};

export default function SchedulePage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [step, submitted]);

  const isEquine =
    form.serviceType === 'equine' || form.serviceType === 'both';

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function validateStep1() {
    return form.serviceType !== '';
  }

  function validateStep2() {
    return (
      form.firstName.trim() !== '' &&
      form.lastName.trim() !== '' &&
      form.email.trim() !== '' &&
      form.phone.trim() !== '' &&
      form.preferredDate !== '' &&
      form.preferredTime !== '' &&
      form.serviceAddress.trim() !== '' &&
      form.city.trim() !== '' &&
      form.state.trim() !== ''
    );
  }

  function validateStep3() {
    if (!isEquine) return true;
    return form.horseName.trim() !== '' && form.horseBreed.trim() !== '';
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep2() || !validateStep3()) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setConfirmationNumber(data.confirmationNumber);
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
          <h1 className="text-3xl font-black text-white mb-3">Request Submitted!</h1>
          <p className="text-slate-400 mb-4">
            Your session request has been received. Someone from our team will call you to confirm your appointment — please note that preferred dates and times are subject to availability.
          </p>
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5 mb-8">
            <div className="text-slate-400 text-sm mb-1">Confirmation Number</div>
            <div className="text-red-500 font-black text-2xl tracking-widest">{confirmationNumber}</div>
          </div>
          <p className="text-slate-500 text-sm mb-8">
            A copy of your request has been sent to{' '}
            <span className="text-slate-300">{form.email}</span>. If you don&apos;t see it, check your spam folder.
            If you haven&apos;t signed a waiver yet, please do so before your session.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/waiver"
              className="bg-red-600 hover:bg-red-500 text-[#020c1b] font-bold px-6 py-3 rounded-full text-sm transition-colors"
            >
              Sign Your Waiver
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
            Get Started
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Book Your Session
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Submit your preferred date and time and we&apos;ll give you a call to confirm
            availability. We come to you.
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mb-10">
        <div className="flex items-center justify-center gap-0">
          {[
            { num: 1, label: 'Service' },
            { num: 2, label: 'Details' },
            { num: 3, label: 'Confirm' },
          ].map((s, idx) => (
            <div key={s.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${
                    step > s.num
                      ? 'bg-red-600 border-red-600 text-[#020c1b]'
                      : step === s.num
                      ? 'border-red-500 text-red-500 bg-red-500/10'
                      : 'border-slate-700 text-slate-600 bg-transparent'
                  }`}
                >
                  {step > s.num ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    s.num
                  )}
                </div>
                <span
                  className={`text-xs mt-1.5 font-medium ${
                    step === s.num ? 'text-red-500' : 'text-slate-600'
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {idx < 2 && (
                <div
                  className={`h-px w-16 sm:w-24 mx-2 mb-5 transition-colors ${
                    step > s.num ? 'bg-red-500/60' : 'bg-slate-800'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-[#071428] border border-red-500/10 rounded-2xl p-7 sm:p-10">
          {/* STEP 1: Service Type */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-black text-white mb-2">Select a Service</h2>
              <p className="text-slate-400 text-sm mb-8">
                What type of cryotherapy session are you looking for?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  {
                    value: 'human',
                    label: 'Human',
                    sublabel: 'Cryotherapy',
                    icon: (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    ),
                    accent: 'sky',
                  },
                  {
                    value: 'equine',
                    label: 'Equine',
                    sublabel: 'Cryotherapy',
                    icon: (
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                      </svg>
                    ),
                    accent: 'amber',
                  },
                  {
                    value: 'both',
                    label: 'Both',
                    sublabel: 'Human & Equine',
                    icon: (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    ),
                    accent: 'sky',
                  },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({ ...prev, serviceType: option.value }))
                    }
                    className={`rounded-xl p-6 border-2 text-left transition-all duration-200 ${
                      form.serviceType === option.value
                        ? option.accent === 'sky'
                          ? 'border-red-500 bg-red-500/10'
                          : 'border-blue-400 bg-blue-400/10'
                        : 'border-slate-700 bg-transparent hover:border-slate-600'
                    }`}
                  >
                    <div
                      className={`mb-3 ${
                        form.serviceType === option.value
                          ? option.accent === 'sky'
                            ? 'text-red-500'
                            : 'text-blue-400'
                          : 'text-slate-500'
                      }`}
                    >
                      {option.icon}
                    </div>
                    <div className="text-white font-bold">{option.label}</div>
                    <div className="text-slate-400 text-xs mt-1">{option.sublabel}</div>
                  </button>
                ))}
              </div>

              {isEquine && (
                <div className="bg-amber-400/5 border border-amber-400/25 rounded-xl p-4 mb-6 text-sm text-slate-300">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-amber-400 mb-1">A Note on Equine Treatments</p>
                      <p className="text-slate-400 leading-relaxed">For the safety and comfort of both horse and handler, treatments are best suited for horses that are calm and comfortable with basic handling. The cryotherapy unit does produce a mild hissing sound during use. If you&apos;re unsure how your horse may react, please feel free to reach out beforehand and I&apos;d be happy to discuss whether treatment would be a good fit.</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="button"
                  disabled={!validateStep1()}
                  onClick={() => setStep(2)}
                  className="bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-[#020c1b] font-bold px-7 py-3 rounded-full text-sm transition-all"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Contact & Schedule */}
          {step === 2 && (
            <form onSubmit={(e) => { e.preventDefault(); if (validateStep2()) setStep(3); }}>
              <h2 className="text-2xl font-black text-white mb-2">Your Information</h2>
              <p className="text-slate-400 text-sm mb-8">
                Tell us who you are and when/where you need us.
              </p>

              {/* Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={labelClass} htmlFor="firstName">First Name *</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Jane"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="lastName">Last Name *</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Smith"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={labelClass} htmlFor="email">Email *</label>
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
                <div>
                  <label className={labelClass} htmlFor="phone">Phone *</label>
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
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={labelClass} htmlFor="preferredDate">Preferred Date *</label>
                  <input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    value={form.preferredDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className={inputClass}
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="preferredTime">Preferred Time *</label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    value={form.preferredTime}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="">Select a time window</option>
                    <option value="Morning (8am–12pm)">Morning (8am–12pm)</option>
                    <option value="Afternoon (12pm–4pm)">Afternoon (12pm–4pm)</option>
                    <option value="Late Afternoon (4pm–7pm)">Late Afternoon (4pm–7pm)</option>
                  </select>
                </div>
              </div>

              {/* Address */}
              <div className="mb-4">
                <label className={labelClass} htmlFor="serviceAddress">Service Address *</label>
                <input
                  id="serviceAddress"
                  name="serviceAddress"
                  type="text"
                  value={form.serviceAddress}
                  onChange={handleChange}
                  placeholder="123 Main Street"
                  required
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
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
              </div>

              {/* Equine fields */}
              {isEquine && (
                <div className="mt-6 pt-6 border-t border-blue-400/10">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-6 h-6 rounded bg-blue-400/10 border border-blue-400/20 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                      </svg>
                    </div>
                    <h3 className="text-blue-400 font-semibold text-sm tracking-wide">Equine Information</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
                      <label className={labelClass} htmlFor="horseCondition">Condition / Reason for Treatment</label>
                      <input
                        id="horseCondition"
                        name="horseCondition"
                        type="text"
                        value={form.horseCondition}
                        onChange={handleChange}
                        placeholder="Post-competition recovery"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass} htmlFor="vetName">Veterinarian Name</label>
                      <input
                        id="vetName"
                        name="vetName"
                        type="text"
                        value={form.vetName}
                        onChange={handleChange}
                        placeholder="Dr. Johnson"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="vetPhone">Vet Phone</label>
                      <input
                        id="vetPhone"
                        name="vetPhone"
                        type="tel"
                        value={form.vetPhone}
                        onChange={handleChange}
                        placeholder="(555) 000-0000"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Notes */}
              <div className="mt-4">
                <label className={labelClass} htmlFor="notes">Additional Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Any specific concerns, conditions, or requests..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-slate-400 hover:text-white font-semibold px-5 py-3 rounded-full text-sm border border-slate-700 hover:border-slate-500 transition-all"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-500 text-[#020c1b] font-bold px-7 py-3 rounded-full text-sm transition-all"
                >
                  Review →
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Review & Submit */}
          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl font-black text-white mb-2">Review & Confirm</h2>
              <p className="text-slate-400 text-sm mb-8">
                Please review your booking details before submitting.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  { label: 'Service', value: form.serviceType.charAt(0).toUpperCase() + form.serviceType.slice(1) + ' Cryotherapy' },
                  { label: 'Name', value: `${form.firstName} ${form.lastName}` },
                  { label: 'Email', value: form.email },
                  { label: 'Phone', value: form.phone },
                  { label: 'Date', value: new Date(form.preferredDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) },
                  { label: 'Time', value: form.preferredTime },
                  { label: 'Address', value: `${form.serviceAddress}, ${form.city}, ${form.state}` },
                  ...(isEquine ? [
                    { label: 'Horse', value: `${form.horseName} (${form.horseBreed}${form.horseAge ? `, ${form.horseAge} yrs` : ''})` },
                  ] : []),
                  ...(form.notes ? [{ label: 'Notes', value: form.notes }] : []),
                ].map((item) => (
                  <div key={item.label} className="flex gap-3 py-2.5 border-b border-slate-800">
                    <span className="text-slate-500 text-sm w-20 shrink-0">{item.label}</span>
                    <span className="text-slate-200 text-sm">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="bg-red-500/5 border border-red-500/15 rounded-xl p-4 mb-6 text-sm text-slate-400">
                <strong className="text-red-500">Note:</strong> Your request will be sent to our team. Someone will call you to confirm your appointment — preferred dates and times are subject to availability. If you haven&apos;t already, please also{' '}
                <Link href="/waiver" className="text-red-500 underline hover:text-red-400">sign your waiver</Link> before your session.
              </div>

              {error && (
                <div className="bg-red-400/10 border border-red-400/30 rounded-xl p-4 mb-4 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-slate-400 hover:text-white font-semibold px-5 py-3 rounded-full text-sm border border-slate-700 hover:border-slate-500 transition-all"
                >
                  ← Edit
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-red-600 hover:bg-red-500 disabled:opacity-60 text-[#020c1b] font-black px-8 py-3 rounded-full text-sm transition-all flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Info box */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: '⏱', title: '24hr Response', body: 'We confirm all bookings within one business day.' },
            { icon: '📍', title: 'We Come to You', body: 'Our mobile unit travels to your location.' },
            { icon: '📋', title: 'Waiver Required', body: 'All clients need a signed waiver before sessions.' },
          ].map((item) => (
            <div key={item.title} className="bg-[#071428] border border-red-500/10 rounded-xl p-5 text-sm">
              <div className="text-xl mb-2">{item.icon}</div>
              <div className="text-white font-semibold mb-1">{item.title}</div>
              <div className="text-slate-500">{item.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
