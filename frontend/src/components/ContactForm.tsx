"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-12 shadow-sm">
      {status === "success" && (
        <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-5 py-4">
          <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
          <p className="text-sm font-medium text-green-800">
            Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4">
          <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
          <p className="text-sm font-medium text-red-800">
            {errorMsg || "Failed to send message. Please try again."}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-[10px] font-bold tracking-[0.3em] text-forest/60 uppercase">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-forest text-sm focus:ring-2 focus:ring-forest-light/20 focus:border-forest-light outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-[10px] font-bold tracking-[0.3em] text-forest/60 uppercase">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-forest text-sm focus:ring-2 focus:ring-forest-light/20 focus:border-forest-light outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-[10px] font-bold tracking-[0.3em] text-forest/60 uppercase">
            Subject
          </label>
          <input
            id="subject"
            type="text"
            value={form.subject}
            onChange={handleChange}
            placeholder="What's this about?"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-forest text-sm focus:ring-2 focus:ring-forest-light/20 focus:border-forest-light outline-none transition-all"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-[10px] font-bold tracking-[0.3em] text-forest/60 uppercase">
            Message
          </label>
          <textarea
            id="message"
            rows={6}
            required
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us more..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-forest text-sm focus:ring-2 focus:ring-forest-light/20 focus:border-forest-light outline-none transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="group inline-flex items-center gap-4 px-8 py-4 bg-forest text-white rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-forest-light transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <>
              Sending...
              <Loader2 className="h-4 w-4 animate-spin" />
            </>
          ) : (
            <>
              Send Message
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all">
                <ArrowRight className="h-4 w-4" />
              </div>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
