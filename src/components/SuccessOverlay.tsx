import React from "react";
import { Check, X, ShieldCheck, Mail, Calendar, Sparkles } from "lucide-react";
import { InquiryFormInput } from "../types";
import { motion } from "motion/react";

interface SuccessOverlayProps {
  inquiry: InquiryFormInput | null;
  onClose: () => void;
}

export default function SuccessOverlay({ inquiry, onClose }: SuccessOverlayProps) {
  if (!inquiry) return null;

  return (
    <div
      id="success-modal-overlay"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      {/* Absolute Backdrop Glass Effect */}
      <motion.div
        id="success-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
      />

      {/* Main Success Container card */}
      <motion.div
        id="success-modal-card"
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 15 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 max-w-lg w-full shadow-2xl text-white overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        {/* Glow corner decorations */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          id="success-modal-close"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Status Icon */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
              className="w-16 h-16 bg-gradient-to-tr from-emerald-600 to-teal-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-emerald-950/50"
            >
              <Check className="w-8 h-8 stroke-[2.5]" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -inset-2 rounded-full border border-emerald-500/30 -z-10"
            />
          </div>

          <h3 className="text-2xl font-display font-bold mb-2 tracking-tight">
            Transmission Successful!
          </h3>
          <p className="text-slate-400 text-sm max-w-xs mb-8">
            Your high-performance project inquiry is safely queued for engineer review.
          </p>
        </div>

        {/* Recipient Details Block */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 mb-8 space-y-4 text-left">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest border-b border-slate-900 pb-2 flex justify-between">
            <span>Inquiry Payload</span>
            <span className="text-emerald-400">Status: Enqueued</span>
          </div>

          <div className="space-y-3.5">
            <div>
              <span className="text-[10px] font-semibold text-slate-500 block uppercase font-mono">Client Name</span>
              <span className="text-sm font-medium text-white">{inquiry.name}</span>
            </div>

            <div>
              <span className="text-[10px] font-semibold text-slate-500 block uppercase font-mono">Contact Email</span>
              <span className="text-sm font-medium text-slate-300">{inquiry.email}</span>
            </div>

            <div>
              <span className="text-[10px] font-semibold text-slate-500 block uppercase font-mono">Selected Solution</span>
              <span className="text-xs inline-flex items-center space-x-1.5 px-3 py-1 mt-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-semibold uppercase">
                <Sparkles className="w-3 h-3 text-indigo-400" />
                <span>{inquiry.service}</span>
              </span>
            </div>

            {inquiry.notes && (
              <div>
                <span className="text-[10px] font-semibold text-slate-500 block uppercase font-mono">Inquiry Narrative</span>
                <p className="text-xs text-slate-400 mt-1 line-clamp-3 bg-slate-900 px-3 py-2.5 rounded-lg font-sans">
                  {inquiry.notes}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Roadmap Promise */}
        <div className="space-y-3.5 mb-8 text-sm">
          <div className="flex items-start space-x-3 text-slate-400 text-xs">
            <Mail className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
            <span>We've dispatched a confirmation transcript to <strong className="text-slate-300">{inquiry.email}</strong>.</span>
          </div>

          <div className="flex items-start space-x-3 text-slate-400 text-xs">
            <Calendar className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
            <span>Our engineering director will prepare options and link back within <strong className="text-slate-300">24 hours</strong>.</span>
          </div>
        </div>

        {/* Dismiss trigger */}
        <button
          id="success-modal-dismiss-btn"
          onClick={onClose}
          className="w-full bg-slate-950 border border-slate-800 hover:bg-slate-800/80 hover:border-slate-700 text-slate-300 hover:text-white py-3.5 px-4 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer text-center"
        >
          Acknowledge & Close
        </button>
      </motion.div>
    </div>
  );
}
