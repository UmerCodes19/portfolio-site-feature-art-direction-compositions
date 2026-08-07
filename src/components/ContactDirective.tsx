"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export function ContactDirective() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="w-full py-24 bg-[#050B14] blueprint-grid px-6 md:px-16 xl:px-24">
      <div className="max-w-[1700px] mx-auto space-y-16">
        <div className="border-b border-[#1E293B] pb-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <div className="text-xs font-mono text-[#FF2E00] uppercase tracking-widest mb-2">
              [ SECTION_04 // TRANSMISSION_DIRECTIVE ]
            </div>
            <h2 className="text-5xl md:text-8xl font-display uppercase tracking-tight text-[#F1F5F9]">
              TRANSMIT DIRECTIVE
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400 max-w-[40ch]">
            Open for architectural consulting, system design directives, and engineering leadership.
          </p>
        </div>

        {/* CAD Terminal Form */}
        <div className="max-w-3xl border-2 border-[#FF2E00] bg-[#050B14] p-8 md:p-12 space-y-8 relative">
          <div className="flex items-center justify-between text-xs font-mono border-b border-[#1E293B] pb-4">
            <span className="text-slate-400">[ CAD_TERMINAL_INPUT // SECURE_CHANNEL ]</span>
            <span className="text-[#FF2E00]">READY</span>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4 font-mono">
              <CheckCircle className="w-12 h-12 text-[#FF2E00] mx-auto" />
              <h3 className="text-2xl font-display text-white uppercase">DIRECTIVE RECEIVED</h3>
              <p className="text-xs text-slate-400">Transmission logged to system registry. Response pending.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs">
              <div className="space-y-2">
                <label className="text-slate-400 uppercase tracking-widest block">
                  [ 01 // SENDER_IDENTIFIER_EMAIL ]
                </label>
                <input
                  type="email"
                  required
                  placeholder="architect@domain.com"
                  className="w-full bg-[#0B132B] border border-[#1E293B] px-4 py-3 text-slate-200 focus:outline-none focus:border-[#FF2E00]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-slate-400 uppercase tracking-widest block">
                  [ 02 // TRANSMISSION_PAYLOAD_MESSAGE ]
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Outline project specifications, timeline, and architectural objectives..."
                  className="w-full bg-[#0B132B] border border-[#1E293B] px-4 py-3 text-slate-200 focus:outline-none focus:border-[#FF2E00]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#FF2E00] text-white font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-3 hover:bg-[#e02800] transition-colors cursor-pointer"
              >
                <span>TRANSMIT_SIGNAL</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Telemetry Footer Anchor */}
        <div className="pt-12 border-t border-[#1E293B] flex flex-col md:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#FF2E00] animate-pulse" />
            <span>[ SYSTEM_OPERATIONAL // UTC+05:00 ]</span>
          </div>

          <div className="flex items-center gap-6">
            <span>BUILD: v4.2.0</span>
            <span>COMMIT: e8f92a1</span>
            <span>© {new Date().getFullYear()} UMER QURESHI</span>
          </div>
        </div>
      </div>
    </section>
  );
}
