/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ServicesSection from "./components/ServicesSection";
import ProcessSection from "./components/ProcessSection";
import TestimonialsSection from "./components/TestimonialsSection";
import InquiryForm from "./components/InquiryForm";
import Footer from "./components/Footer";
import SuccessOverlay from "./components/SuccessOverlay";
import { InquiryFormInput } from "./types";
import { AnimatePresence } from "motion/react";

export default function App() {
  const [selectedService, setSelectedService] = useState<string>("");
  const [submittedInquiry, setSubmittedInquiry] = useState<InquiryFormInput | null>(null);

  const handleSelectService = (serviceName: string) => {
    setSelectedService(serviceName);
  };

  const handleFormSubmitted = (data: InquiryFormInput) => {
    setSubmittedInquiry(data);
    // Reset selected service highlight
    setSelectedService("");
  };

  const handleCloseOverlay = () => {
    setSubmittedInquiry(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans tracking-tight antialiased">
      {/* Absolute top grid mask/decoration to match the tech vibe */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-950/10 to-transparent pointer-events-none" />

      {/* Global Navigation Hub */}
      <Navbar />

      {/* Main Page Flow Sections */}
      <main>
        {/* Dynamic Interactive Hero Display */}
        <Hero />

        {/* 4 grid visual list of services (Automation, AI Agent, Software Developement, Digital Marketing) */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* Our process pipeline timeline */}
        <ProcessSection />

        {/* Dynamic Reviews Section */}
        <TestimonialsSection />

        {/* Core user inquiry system sheet at the bottom */}
        <InquiryForm
          selectedService={selectedService}
          onFormSubmitted={handleFormSubmitted}
        />
      </main>

      {/* Corporate Contact & Brand Footer */}
      <Footer />

      {/* Modern, full-screen Overlay popups for successfully enqueued submissions */}
      <AnimatePresence>
        {submittedInquiry && (
          <SuccessOverlay
            inquiry={submittedInquiry}
            onClose={handleCloseOverlay}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
