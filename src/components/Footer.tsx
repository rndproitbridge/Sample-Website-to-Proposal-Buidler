import React from "react";
import { Cpu, Mail, MapPin, Phone, Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer id="main-footer" className="bg-slate-950 border-t border-slate-900 text-slate-400 py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 pb-12 border-b border-slate-900">
          
          {/* Column 1 - Brand description */}
          <div className="md:col-span-5 space-y-4">
            <a
              id="footer-brand"
              href="#hero"
              onClick={(e) => handleScrollTo(e, "#hero")}
              className="flex items-center space-x-2 text-white group"
            >
              <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-500 transition-colors duration-300">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                NEXUS<span className="text-indigo-400">.IT</span>
              </span>
            </a>
            <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
              Premium enterprise solutions engineered for maximum performance, scalable automation pipelines, and targeted acquisitions.
            </p>
          </div>

          {/* Column 2 - Fast navigators */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">Solutions</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  id="footer-link-automation"
                  href="#services"
                  onClick={(e) => handleScrollTo(e, "#services")}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Automation Pipelines
                </a>
              </li>
              <li>
                <a
                  id="footer-link-ai-agents"
                  href="#services"
                  onClick={(e) => handleScrollTo(e, "#services")}
                  className="hover:text-indigo-400 transition-colors"
                >
                  LLM-Driven AI Agents
                </a>
              </li>
              <li>
                <a
                  id="footer-link-software"
                  href="#services"
                  onClick={(e) => handleScrollTo(e, "#services")}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Software Development
                </a>
              </li>
              <li>
                <a
                  id="footer-link-marketing"
                  href="#services"
                  onClick={(e) => handleScrollTo(e, "#services")}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Digital Marketing & CRO
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Enterprise location details */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">Inquiries Office</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 text-indigo-400 mr-2.5 mt-0.5 flex-shrink-0" />
                <span>One World Trade Center, Suite 85, New York, NY 10007</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 text-indigo-400 mr-2.5 flex-shrink-0" />
                <a href="mailto:contact@nexus.it" className="hover:text-indigo-400 transition-colors">
                  contact@nexus.it
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 text-indigo-400 mr-2.5 flex-shrink-0" />
                <span>+1 (800) 555-0199</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Meta & Copyrights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-600 text-xs">
          <div>
            &copy; {new Date().getFullYear()} NEXUS.IT LLC. All rights reserved. Made in New York.
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Security Commitments</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
