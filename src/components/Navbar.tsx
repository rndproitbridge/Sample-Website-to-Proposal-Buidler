import React, { useState, useEffect } from "react";
import { Menu, X, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Services", href: "#services" },
    { name: "How We Work", href: "#process" },
    { name: "Success Stories", href: "#testimonials" },
    { name: "Start Project", href: "#contact", highlight: true },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/80 backdrop-blur-md border-b border-slate-800 shadow-lg py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            id="nav-logo"
            href="#hero"
            onClick={(e) => handleScrollTo(e, "#hero")}
            className="flex items-center space-x-2 text-white group"
          >
            <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-500 transition-colors duration-300">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">
              NEXUS<span className="text-indigo-400">.IT</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, idx) => (
              <a
                key={idx}
                id={`nav-link-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className={`text-sm font-medium transition-all duration-300 ${
                  item.highlight
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-full shadow-lg shadow-indigo-600/20 hover:scale-[1.03]"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Mobile Hamburguer Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-300 hover:text-white p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-slate-900 border-b border-slate-800"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {menuItems.map((item, idx) => (
                <a
                  key={idx}
                  id={`mobile-nav-link-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    item.highlight
                      ? "bg-indigo-600 hover:bg-indigo-500 text-white text-center mt-4 font-semibold shadow-md shadow-indigo-600/10"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
