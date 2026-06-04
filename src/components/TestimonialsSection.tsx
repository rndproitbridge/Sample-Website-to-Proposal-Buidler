import React from "react";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "../data";
import { motion } from "motion/react";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-slate-950 text-white relative">
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-purple-400 text-xs font-semibold uppercase tracking-widest bg-purple-500/10 px-3.5 py-1.5 rounded-full border border-purple-400/10">
            Endorsements
          </span>
          <h2 id="testimonials-heading" className="text-3xl sm:text-4xl font-display font-bold mt-4 tracking-tight">
            Client Success & Verification
          </h2>
          <p className="text-slate-400 mt-4 leading-relaxed text-sm">
            Hear from global product founders and technical executives who streamlined operations, integrated smart systems, and built custom apps with our elite teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              id={`testimonial-card-${testimonial.id}`}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-slate-900/35 border border-slate-800/80 p-8 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition-colors duration-300"
            >
              <div>
                {/* Stars */}
                <div className="flex items-center space-x-1 mb-5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic mb-8">
                  "{testimonial.content}"
                </p>
              </div>

              {/* Author details */}
              <div className="flex items-center space-x-3 pt-4 border-t border-slate-900">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-md">
                  {testimonial.avatarText}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-slate-500 text-xs">
                    {testimonial.role}, <span className="text-indigo-400">{testimonial.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
