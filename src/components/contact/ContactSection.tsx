"use client";

import { useEffect, useRef, useState, MouseEvent } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Copy, Send } from "lucide-react";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { CONTACT_DATA } from "@/data/contact";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ContactSection() {
  const [email, setEmail] = useState<string>("0252umer [at] gmail [dot] com");
  const [phone, setPhone] = useState<string>("+92 334 [contact]");
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);
  const [timeString, setTimeString] = useState<string>("");

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const connectRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const isReducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    setIsMounted(true);
    setEmail(CONTACT_DATA.email);
    setPhone(CONTACT_DATA.phone);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleMailtoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!isMounted) {
      e.preventDefault();
      window.location.href = `mailto:${CONTACT_DATA.email}`;
    }
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTimeString(now.toLocaleTimeString("en-US", options));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 30, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }
        );
      }

      if (textRef.current) {
        tl.fromTo(
          textRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        );
      }

      if (emailRef.current) {
        tl.fromTo(
          emailRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.4"
        );
      }

      if (connectRef.current) {
        tl.fromTo(
          connectRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        );
      }

      if (footerRef.current) {
        tl.fromTo(
          footerRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "-=0.3"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/UmerCodes19",
      icon: <FiGithub className="w-5 h-5" />,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/umerqureshi",
      icon: <FiLinkedin className="w-5 h-5" />,
    },
    {
      name: "Twitter / X",
      url: "https://twitter.com/UmerCodes19",
      icon: <FiTwitter className="w-5 h-5" />,
    },
  ];

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative w-full py-28 sm:py-36 md:py-44 bg-[#040404] text-white overflow-hidden"
    >
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16 md:gap-20">
        
        {/* Section Header */}
        <div className="flex flex-col gap-6 border-b border-white/[0.08] pb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#af5bf0] animate-pulse" />
            <span>Contact</span>
          </div>

          <h2
            ref={titleRef}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[-0.04em] leading-[0.95] text-white"
          >
            Let's build something{" "}
            <span className="italic font-normal font-serif text-transparent bg-clip-text bg-gradient-to-r from-white via-[#af5bf0] to-zinc-400">
              extraordinary.
            </span>
          </h2>

          <p
            ref={textRef}
            className="text-zinc-400 text-lg sm:text-xl font-light max-w-[52ch] leading-relaxed pt-2"
          >
            Available for full-stack engineering contracts, web application architecture, and UI/UX design directives worldwide.
          </p>
        </div>

        {/* Main Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-b border-white/[0.08] pb-20">
          
          {/* Giant Interactive Email Block */}
          <div ref={emailRef} className="lg:col-span-8 flex flex-col gap-6">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              Email
            </span>
            <a
              href={`mailto:${email}`}
              onClick={handleMailtoClick}
              className="group relative inline-block text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white hover:text-[#af5bf0] transition-colors duration-500 break-all"
            >
              <span className="underline underline-offset-[14px] decoration-white/20 group-hover:decoration-[#af5bf0] transition-colors duration-500">
                {email}
              </span>
            </a>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href={`mailto:${email}`}
                onClick={handleMailtoClick}
                className="px-7 py-3.5 rounded-full bg-white text-black font-medium text-xs hover:bg-zinc-200 active:scale-95 transition-all shadow-md flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5 text-black" />
                <span>Write Email</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-6 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-zinc-300 font-mono text-xs border border-white/15 hover:border-white/30 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#af5bf0]" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                <span>{copied ? "Address Copied" : "Copy Address"}</span>
              </button>
            </div>
          </div>

          {/* Social Icons & Location */}
          <div ref={connectRef} className="lg:col-span-4 flex flex-col gap-8 lg:border-l lg:border-white/[0.08] lg:pl-12">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                Profiles
              </span>
              <div className="flex items-center gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.name}
                    className="w-13 h-13 rounded-2xl bg-white/[0.03] hover:bg-[#af5bf0]/15 border border-white/10 hover:border-[#af5bf0]/60 text-zinc-300 hover:text-[#af5bf0] flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1 font-mono text-xs text-zinc-500 pt-2 border-t border-white/[0.06]">
              <span>Karachi, Pakistan (UTC+5)</span>
              {timeString && <span className="text-zinc-400 font-medium">{timeString} PKT</span>}
            </div>
          </div>

        </div>

        {/* Minimal Baseline Footer */}
        <div ref={footerRef} className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>© {new Date().getFullYear()} {CONTACT_DATA.name}. All rights reserved.</div>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <span className="group-hover:-translate-y-0.5 transition-transform">↑</span>
          </button>
        </div>

      </div>
    </section>
  );
}
