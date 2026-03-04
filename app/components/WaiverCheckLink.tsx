'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function WaiverCheckLink({
  className,
  children,
  onBeforeOpen,
}: {
  className?: string;
  children: React.ReactNode;
  onBeforeOpen?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function handleOpen() {
    onBeforeOpen?.();
    setOpen(true);
  }

  return (
    <>
      <button type="button" className={className} onClick={handleOpen}>
        {children}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center px-4"
          style={{ background: 'rgba(2,8,16,0.85)', backdropFilter: 'blur(4px)' }}
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-[#071428] border border-red-500/20 rounded-2xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-white text-xl font-black text-center mb-2">Have you signed your waiver?</h2>
            <p className="text-slate-400 text-sm text-center mb-8 leading-relaxed">
              All clients are required to have a signed waiver on file before their first session.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => { setOpen(false); router.push('/schedule'); }}
                className="w-full bg-red-600 hover:bg-red-500 text-[#020c1b] font-black py-3 rounded-full text-sm transition-all"
              >
                Yes, I&apos;ve signed my waiver
              </button>
              <button
                onClick={() => { setOpen(false); router.push('/waiver'); }}
                className="w-full border border-red-500/30 hover:border-red-500 text-red-500 hover:text-white font-semibold py-3 rounded-full text-sm transition-all"
              >
                No, take me to the waiver
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
