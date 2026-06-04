import React from "react";
import { ArrowRight, Bot, Cpu, Code, TrendingUp, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

export default function Hero() {
  const scrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = document.querySelector("#contact");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const servicesBadges = [
    { icon: Cpu, label: "Automation", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    { icon: Bot, label: "AI Agent", color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
    { icon: Code, label: "Software", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { icon: TrendingUp, label: "Marketing", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-neutral-950 text-white"
    >
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />

      {/* Grid Pattern Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-[0.15] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Animated Headline Badge */}
        <motion.div
          id="hero-badge"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-full text-xs font-semibold text-indigo-400 tracking-wide mb-8 shadow-inner shadow-slate-950"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span>Deploying Autonomous Business Intelligence</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight leading-none max-w-4xl"
        >
          Next-Generation <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Digital Solutions</span> and Enterprise Engineering
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          id="hero-subtitle"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed font-sans"
        >
          We engineer dynamic custom software, execute game-changing automations, scale AI agent nodes, and run conversion-driven digital marketing.
        </motion.p>

        {/* Services Badges Grid */}
        <motion.div
          id="hero-badges-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-3 max-w-3xl"
        >
          {servicesBadges.map((badge, idx) => (
            <div
              key={idx}
              id={`hero-badge-tag-${badge.label.toLowerCase()}`}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl border text-sm font-medium transition-transform duration-300 hover:scale-105 ${badge.color}`}
            >
              <badge.icon className="w-4 h-4" />
              <span>{badge.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Hero Action Buttons */}
        <motion.div
          id="hero-actions"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <button
            id="hero-cta-primary"
            onClick={scrollToContact}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-indigo-600 hover:border-indigo-500 border border-transparent text-white px-8 py-4 rounded-xl font-medium tracking-wide transition-all shadow-lg hover:shadow-indigo-600/35 hover:-translate-y-0.5"
          >
            <span>Launch Inquire Form</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            id="hero-cta-secondary"
            href="#services"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white px-8 py-4 rounded-xl font-medium tracking-wide transition-all hover:-translate-y-0.5"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore Services
          </a>
        </motion.div>

        {/* Mini Trust Bar */}
        <motion.div
          id="hero-trust-bar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-20 border-t border-slate-900/60 pt-8 flex grid grid-cols-2 md:flex md:items-center md:space-x-12 gap-6 text-slate-500 text-xs tracking-wider uppercase font-semibold"
        >
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>99.8% System SLA</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>AI-Driven Scalability</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>250+ Software Builds</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>Certified IT Engineers</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
