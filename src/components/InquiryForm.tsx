import React, { useState, useEffect } from "react";
import { User, Mail, Briefcase, MessageSquare, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { InquiryFormInput } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface InquiryFormProps {
  selectedService: string;
  onFormSubmitted: (data: InquiryFormInput) => void;
}

export default function InquiryForm({ selectedService, onFormSubmitted }: InquiryFormProps) {
  const [formData, setFormData] = useState<InquiryFormInput>({
    name: "",
    email: "",
    service: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Partial<InquiryFormInput>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Sync state if selectedService prop changes from external clicks
  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, service: selectedService }));
      // Clear service error if any
      setErrors((prev) => ({ ...prev, service: "" }));
    }
  }, [selectedService]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Reactive typing error removal
    if (errors[name as keyof InquiryFormInput]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectService = (serviceName: string) => {
    setFormData((prev) => ({ ...prev, service: serviceName }));
    if (errors.service) {
      setErrors((prev) => ({ ...prev, service: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<InquiryFormInput> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please input a valid email address";
    }
    if (!formData.service) {
      newErrors.service = "Please choose a service";
    }
    if (!formData.notes.trim()) {
      newErrors.notes = "Please tell us a bit about your inquiry";
    } else if (formData.notes.trim().length < 10) {
      newErrors.notes = "Please write at least 10 characters so we can understand your request better";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let errText = `Server responded with status ${response.status}`;
        try {
          const errBody = await response.json();
          if (errBody && errBody.error) {
            errText = errBody.error;
          }
        } catch (_) {}
        throw new Error(errText);
      }

      onFormSubmitted(formData);
      
      // Reset form fields
      setFormData({
        name: "",
        email: "",
        service: "",
        notes: "",
      });
    } catch (err: any) {
      console.error("Inquiry transmission failed:", err);
      setSubmitError(err.message || "Failed to transmit payload to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceOptions = [
    "Automation",
    "AI Agent",
    "Software Developement",
    "Digital Marketing"
  ];

  return (
    <section id="contact" className="py-24 bg-neutral-950 text-white relative">
      {/* Visual glowing frame background */}
      <div className="absolute bottom-0 left-0 w-full h-[600px] bg-gradient-to-t from-indigo-950/20 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 right-[10%] w-[350px] h-[350px] rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-[10%] w-[350px] h-[350px] rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Form Context / Informational Left Panel */}
          <div className="lg:col-span-5">
            <span className="text-indigo-400 text-xs font-semibold uppercase tracking-widest bg-indigo-500/10 px-3.5 py-1.5 rounded-full border border-indigo-400/10 inline-block mb-4">
              Get Started
            </span>
            <h2 id="contact-heading" className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
              Ready to Accelerate Your Business Operations?
            </h2>
            <p className="text-slate-400 mt-5 leading-relaxed text-sm">
              Contact our engineering and digital consulting cell. Fill out the inquiry sheet, and our technical director will schedule an exploratory scoping call with you within one business day.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-indigo-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Direct Advisory Call</h4>
                  <p className="text-slate-500 text-xs mt-1">Get custom estimates and architectural options tailored directly to your tech-stack.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Zero Obligations</h4>
                  <p className="text-slate-500 text-xs mt-1">We present real options, scoping schemas, and execution timelines upfront without pressure.</p>
                </div>
              </div>
            </div>

            {/* Quick selectors for the service */}
            <div className="mt-12">
              <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">Quick Service Selectors</h4>
              <div className="flex flex-wrap gap-2">
                {serviceOptions.map((opt) => {
                  const isActive = formData.service === opt;
                  return (
                    <button
                      key={opt}
                      id={`quick-select-${opt.toLowerCase().replace(/\s+/g, "-")}`}
                      type="button"
                      onClick={() => handleSelectService(opt)}
                      className={`text-xs px-4 py-2.5 rounded-xl border font-medium transition-all duration-300 transform hover:scale-102 ${
                        isActive
                          ? "bg-indigo-600/20 border-indigo-500 text-indigo-300"
                          : "bg-slate-900/40 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Form Interactive Right Sheet */}
          <div className="lg:col-span-7">
            <motion.div
              id="inquiry-form-card"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-slate-900/30 border border-slate-800 p-8 sm:p-10 rounded-2xl relative shadow-2xl backdrop-blur-md"
            >
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Name */}
                <div className="relative group">
                  <label htmlFor="name" className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2.5">
                    Name:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className={`w-full bg-slate-950 border text-white pl-11 pr-4 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-1 transition-all duration-300 ${
                        errors.name
                          ? "border-red-500/80 focus:ring-red-500 focus:border-red-500"
                          : "border-slate-800/80 focus:ring-indigo-500 focus:border-indigo-500 hover:border-slate-700"
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <span id="name-error-msg" className="block text-red-400 text-xs mt-1.5 font-medium ml-1">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="relative group">
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2.5">
                    Email:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className={`w-full bg-slate-950 border text-white pl-11 pr-4 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-1 transition-all duration-300 ${
                        errors.email
                          ? "border-red-500/80 focus:ring-red-500 focus:border-red-500"
                          : "border-slate-800/80 focus:ring-indigo-500 focus:border-indigo-500 hover:border-slate-700"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <span id="email-error-msg" className="block text-red-400 text-xs mt-1.5 font-medium ml-1">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Service Dropdown */}
                <div className="relative group">
                  <label htmlFor="service" className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2.5">
                    Service:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors z-10">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <select
                      name="service"
                      id="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={`w-full bg-slate-950 border text-white pl-11 pr-4 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-1 transition-all duration-300 appearance-none relative ${
                        errors.service
                          ? "border-red-500/80 focus:ring-red-500 focus:border-red-500"
                          : "border-slate-800/80 focus:ring-indigo-500 focus:border-indigo-500 hover:border-slate-700"
                      }`}
                    >
                      <option value="" disabled className="text-slate-600">Select a Service...</option>
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-slate-950 text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                    {/* Custom Arrow */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {errors.service && (
                    <span id="service-error-msg" className="block text-red-400 text-xs mt-1.5 font-medium ml-1">
                      {errors.service}
                    </span>
                  )}
                </div>

                {/* Let us know more */}
                <div className="relative group">
                  <label htmlFor="notes" className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2.5">
                    Let us know more:
                  </label>
                  <div className="relative">
                    <div className="absolute top-3.5 left-3.5 flex items-start pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <textarea
                      name="notes"
                      id="notes"
                      rows={4}
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Please outline your objectives, estimated timeline, or current stack constraints..."
                      className={`w-full bg-slate-950 border text-white pl-11 pr-4 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-1 transition-all duration-300 resize-none ${
                        errors.notes
                          ? "border-red-500/80 focus:ring-red-500 focus:border-red-500"
                          : "border-slate-800/80 focus:ring-indigo-500 focus:border-indigo-500 hover:border-slate-700"
                      }`}
                    />
                  </div>
                  {errors.notes && (
                    <span id="notes-error-msg" className="block text-red-400 text-xs mt-1.5 font-medium ml-1">
                      {errors.notes}
                    </span>
                  )}
                </div>

                {/* Error feedback if any */}
                {submitError && (
                  <div id="submit-error-container" className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 animate-pulse" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Submitting Responsive Button */}
                <div className="pt-2">
                  <button
                    id="submit-inquiry-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center space-x-2 border bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3.5 px-6 rounded-xl transition-all duration-300 cursor-pointer ${
                      isSubmitting
                        ? "opacity-80 cursor-wait bg-slate-800 border-slate-700"
                        : "border-transparent shadow-lg shadow-indigo-600/15 hover:shadow-indigo-600/30 hover:scale-[1.01] active:scale-[0.99]"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        {/* Loading spinner */}
                        <svg className="animate-spin h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-slate-300">Evaluating Transmission...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Inquiry</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
