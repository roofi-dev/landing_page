import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { getPageContent } from "@/lib/api";
import { MapPin, Mail, Phone, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us — Ladang Lima",
  description: "Get in touch with Ladang Lima. We'd love to hear from you.",
};

const contactInfo = [
  {
    icon: MapPin,
    label: "Main Office",
    value: "Rungkut Industri III No.20-B, Surabaya",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+62 31 870 1234",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@ladanglima.com",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon – Fri, 08:00 – 17:00 WIB",
  },
];

export default async function ContactPage() {
  const content = await getPageContent();
  const h = content.contact_header || {};
  const ci = content.contact_info || {};
  const fc = content.contact_factory_cta || {};

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <Navbar content={content.navbar} />

      <PageHeader
        title={h.title || "Contact Us"}
        subtitle={h.subtitle || "Have a question or want to collaborate? We'd love to hear from you."}
        backgroundImage={h.background_image || "https://images.unsplash.com/photo-1423666639041-f1446026475a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      />

      {/* Contact Info Cards */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left: Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] font-bold tracking-[0.4em] text-[#4a7c59] uppercase">
                  {ci.label || "Let's Talk"}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-forest leading-tight">
                  {ci.title_line1 || "We're Here to"} <span className="italic text-[#4a7c59]">{ci.title_line2 || "Help"}</span>
                </h2>
                <p className="text-forest/60 text-base leading-relaxed">
                  {ci.description || "Whether you have a question about our products, want to partner with us, or simply want to say hello — our team is ready to listen."}
                </p>
              </div>

              <div className="space-y-6 pt-4">
                {contactInfo.map((info, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-forest/5 flex items-center justify-center shrink-0 group-hover:bg-forest/10 transition-colors">
                      <info.icon className="h-5 w-5 text-[#4a7c59]" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold tracking-[0.3em] text-forest/40 uppercase">
                        {info.label}
                      </p>
                      <p className="text-forest text-sm font-medium leading-relaxed">
                        {info.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-12 shadow-sm">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-[10px] font-bold tracking-[0.3em] text-forest/60 uppercase">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-forest text-sm focus:ring-2 focus:ring-[#4a7c59]/20 focus:border-[#4a7c59] outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[10px] font-bold tracking-[0.3em] text-forest/60 uppercase">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-forest text-sm focus:ring-2 focus:ring-[#4a7c59]/20 focus:border-[#4a7c59] outline-none transition-all"
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
                      placeholder="What's this about?"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-forest text-sm focus:ring-2 focus:ring-[#4a7c59]/20 focus:border-[#4a7c59] outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[10px] font-bold tracking-[0.3em] text-forest/60 uppercase">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      placeholder="Tell us more..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-forest text-sm focus:ring-2 focus:ring-[#4a7c59]/20 focus:border-[#4a7c59] outline-none transition-all resize-none"
                    />
                  </div>

                  <button className="group inline-flex items-center gap-4 px-8 py-4 bg-forest text-white rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-[#4a7c59] transition-all active:scale-95">
                    Send Message
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Factory CTA Strip */}
      <section className="relative py-20 md:py-24 overflow-hidden bg-forest">
        <div className="absolute inset-0 z-0">
          <img
            src={fc.background_image || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"}
            alt="Factory"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/60 to-forest/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-px bg-white/40" />
              <span className="text-[10px] font-bold tracking-[0.4em] text-white/60 uppercase">
                {fc.label || "Visit Our Factory"}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              {fc.title_line1 || "See Where the"} <span className="italic">{fc.title_line2 || "Magic Happens"}</span>
            </h2>
            <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl">
              {fc.description || "Our factory in Mojokerto is where cassava transforms into premium gluten-free products. Schedule a visit and experience the Ladang Lima difference firsthand."}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <p className="text-white/80 text-sm font-medium">
                {fc.address || "Ds. Lengkong, Mojoanyar, Mojokerto"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer content={content.footer} />
    </main>
  );
}
