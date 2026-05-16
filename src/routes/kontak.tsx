import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingActions } from "@/components/FloatingActions";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import hero from "@/assets/hero-excavator.jpg";

export const Route = createFileRoute("/kontak")({
  head: () => ({
    meta: [
      { title: "Contact Us — DarrinTek" },
      { name: "description", content: "Contact the DarrinTek team for heavy equipment spare parts inquiries." },
      { property: "og:title", content: "Contact Us — DarrinTek" },
      { property: "og:description", content: "Our team is ready to assist with your spare parts needs." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <FloatingActions />

      <section className="relative h-[360px] overflow-hidden">
        <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="container mx-auto px-6 relative h-full flex items-end pb-12">
          <div>
            <p className="text-primary font-semibold text-sm tracking-[0.2em] mb-3">CONTACT US</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold">CONTACT <span className="text-primary">US</span></h1>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          {[
            { icon: MapPin, title: "Address", value: "Jababeka Ecommerce Digital Hub Blok WW5 C6, Jababeka 2 Cikarang-Bekasi" },
            { icon: Phone, title: "Phone", value: "+62 812 3456 7890" },
            { icon: Mail, title: "Email", value: "info@heavyparts.co.id" },
            { icon: Clock, title: "Business Hours", value: "Monday - Saturday, 08:00 - 17:00 WIB" },
          ].map((c) => (
            <div key={c.title} className="bg-surface border border-border rounded-lg p-5 flex gap-4">
              <span className="w-12 h-12 rounded grid place-items-center bg-primary/10 border border-primary/30 text-primary shrink-0">
                <c.icon className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-display text-base">{c.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{c.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 bg-surface border border-border rounded-lg p-8">
          <h2 className="font-display text-2xl mb-2">SEND US A MESSAGE</h2>
          <div className="w-12 h-1 bg-primary mb-6" />
          {sent ? (
            <div className="border border-primary/40 bg-primary/10 text-primary p-6 rounded">Thank you! Your message has been sent. Our team will contact you shortly.</div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="grid md:grid-cols-2 gap-4"
            >
              <input required placeholder="Full Name" className="bg-background border border-border rounded px-4 py-3 text-sm focus:outline-none focus:border-primary" />
              <input required type="email" placeholder="Email" className="bg-background border border-border rounded px-4 py-3 text-sm focus:outline-none focus:border-primary" />
              <input required placeholder="Phone Number" className="bg-background border border-border rounded px-4 py-3 text-sm focus:outline-none focus:border-primary" />
              <input placeholder="Company" className="bg-background border border-border rounded px-4 py-3 text-sm focus:outline-none focus:border-primary" />
              <input placeholder="Subject" className="md:col-span-2 bg-background border border-border rounded px-4 py-3 text-sm focus:outline-none focus:border-primary" />
              <textarea required rows={6} placeholder="Your Message" className="md:col-span-2 bg-background border border-border rounded px-4 py-3 text-sm focus:outline-none focus:border-primary" />
              <button className="md:col-span-2 bg-primary text-primary-foreground font-bold tracking-wider py-3.5 rounded text-sm inline-flex items-center justify-center gap-2 hover:brightness-110 transition">
                SEND MESSAGE <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="container mx-auto px-6 pb-16">
        <div className="rounded-lg overflow-hidden border border-border">
          <iframe
            title="Location"
            src="https://www.openstreetmap.org/export/embed.html?bbox=107.135%2C-6.285%2C107.175%2C-6.265&layer=mapnik"
            className="w-full h-[400px]"
            loading="lazy"
          />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
