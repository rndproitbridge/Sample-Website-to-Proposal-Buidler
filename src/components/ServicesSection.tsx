import React from "react";
import { Cpu, Bot, Code, TrendingUp, Check, ArrowUpRight } from "lucide-react";
import { SERVICES_DATA } from "../data";
import { ServiceDetail } from "../types";
import { motion } from "motion/react";

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

// Map iconName strings to Lucide components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu,
  Bot,
  Code,
  TrendingUp,
};

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const handleSelect = (serviceId: string) => {
    // Determine the user's preferred option string exactly as requested:
    // Automation, AI Agent, Software Developement, Digital Marketing
    let formalName = "Automation";
    if (serviceId === "ai-agent") formalName = "AI Agent";
    if (serviceId === "software-development") formalName = "Software Developement";
    if (serviceId === "digital-marketing") formalName = "Digital Marketing";

    onSelectService(formalName);

    const formElement = document.querySelector("#contact");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="services" className="py-24 bg-slate-950 text-white relative">
      {/* Dynamic backdrop graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-indigo-400 text-xs font-semibold uppercase tracking-widest bg-indigo-500/10 px-3.5 py-1.5 rounded-full border border-indigo-400/10">
              Expertise & Deliverables
            </span>
          </motion.div>
          <motion.h2
            id="services-heading"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-display font-bold mt-4 tracking-tight"
          >
            Specialized Services We Excel In
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 mt-4 leading-relaxed font-sans"
          >
            Transforming corporate capabilities through robust automation, autonomous agent modeling, cloud architectures, and highly effective digital acquisition pipelines.
          </motion.p>
        </div>

        {/* 4 Cards Grid - Fully beautiful hover effects, custom gradients */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {SERVICES_DATA.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Cpu;
            return (
              <motion.div
                key={service.id}
                id={`service-card-${service.id}`}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-slate-900/40 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-8 transition-all duration-300 flex flex-col justify-between hover:bg-slate-900/70 hover:shadow-xl hover:shadow-indigo-950/10"
              >
                {/* Background glow strip inside card */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl bg-gradient-to-r ${service.accentColor} opacity-70 group-hover:opacity-100 transition-opacity duration-300`} />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${service.accentColor} bg-opacity-10 text-white group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-slate-600 text-xs font-mono font-bold uppercase transition-colors group-hover:text-slate-400">
                      0{index + 1} // Service
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-indigo-400 transition-colors duration-200">
                    {service.name}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  <div className="border-t border-slate-800/80 my-5 pt-5">
                    <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Key Solutions</h4>
                    <ul className="space-y-2.5 text-sm text-slate-300">
                      {service.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start">
                          <Check className="w-4 h-4 text-emerald-400 mt-0.5 mr-2.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between pt-4 border-t border-slate-800/40">
                  <div className="flex flex-wrap gap-1.5">
                    {service.techStack.map((tech) => (
                      <span key={tech} className="bg-slate-950 text-slate-400 text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-md border border-slate-800">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleSelect(service.id)}
                    className="flex items-center space-x-1 bg-slate-950 hover:bg-indigo-600 group-hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-xl text-xs font-medium border border-slate-800 hover:border-indigo-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-600/25 whitespace-nowrap cursor-pointer"
                  >
                    <span>Request Service</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
