import React from "react";
import { WORK_PROCESS } from "../data";
import { motion } from "motion/react";

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 bg-neutral-950 text-white border-y border-slate-900/60 relative overflow-hidden">
      {/* Abstract light grid to enhance design */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16">
          <div className="max-w-xl">
            <span className="text-blue-400 text-xs font-semibold uppercase tracking-widest bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-400/10">
              The Engine
            </span>
            <h2 id="process-heading" className="text-3xl sm:text-4xl font-display font-bold mt-4 tracking-tight">
              Our Development Method for Superior Delivery
            </h2>
          </div>
          <p className="text-slate-400 mt-4 lg:mt-0 max-w-md leading-relaxed font-sans text-sm">
            We operate utilizing clear timelines, deterministic quality cycles, and constant live staging links. Here's how we execute from source to deployment.
          </p>
        </div>

        {/* Process Steps List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {WORK_PROCESS.map((step, idx) => (
            <motion.div
              key={step.step}
              id={`process-card-${step.step}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative bg-slate-900/20 border border-slate-900 rounded-2xl p-6 hover:border-slate-800 transition-colors duration-300"
            >
              {/* Step indicator */}
              <div className="text-6xl font-display font-extrabold text-indigo-500/10 mb-6 font-mono">
                {step.step}
              </div>

              {/* Connecting line for visually aligning next steps on large screens */}
              {idx < 3 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-[1px] bg-slate-950 z-[-1] translate-x-3 pointer-events-none" />
              )}

              <h3 className="text-lg font-display font-semibold mb-2 text-white">
                {step.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
