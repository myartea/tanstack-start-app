import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingActions } from "@/components/FloatingActions";
import { Wrench, Settings, ClipboardCheck, Clock, ShieldCheck } from "lucide-react";
import hero from "@/assets/hero-excavator.jpg";

export const Route = createFileRoute("/layanan")({
  head: () => ({
    meta: [
      { title: "Services — DarrinTek" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const [lang, setLang] = useState("EN");

  useEffect(() => {
    setLang(localStorage.getItem("lang") || "EN");

    const timer = setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      }, { threshold: 0.1 });
      document.querySelectorAll('.reveal-section').forEach((el) => observer.observe(el));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    { 
      icon: Wrench, 
      title: lang === "EN" ? "Maintenance & Repair" : "Perawatan & Perbaikan", 
      desc: lang === "EN" 
        ? "Full-service maintenance and repair for engines, hydraulic systems, and undercarriages to ensure peak performance." 
        : "Layanan perawatan dan perbaikan lengkap untuk mesin, sistem hidrolik, dan undercarriage untuk memastikan performa maksimal." 
    },
    { 
      icon: Settings, 
      title: lang === "EN" ? "Component Overhaul" : "Overhaul Komponen", 
      desc: lang === "EN" 
        ? "Expert overhaul services for hydraulic pumps, cylinders, and major engine components using genuine parts." 
        : "Layanan overhaul ahli untuk pompa hidrolik, silinder, dan komponen mesin utama menggunakan suku cadang asli." 
    },
    { 
      icon: ClipboardCheck, 
      title: lang === "EN" ? "Technical Inspection" : "Inspeksi Teknis", 
      desc: lang === "EN" 
        ? "Comprehensive on-site technical inspection to diagnose issues and prevent future failures." 
        : "Inspeksi teknis menyeluruh di lokasi untuk mendiagnosis masalah dan mencegah kerusakan di masa depan." 
    },
    { 
      icon: Clock, 
      title: lang === "EN" ? "24/7 Emergency Support" : "Dukungan Darurat 24/7", 
      desc: lang === "EN" 
        ? "We are available 24/7 to provide emergency support for your operational needs in the field." 
        : "Kami tersedia 24/7 untuk memberikan dukungan darurat bagi kebutuhan operasional Anda di lapangan." 
    },
    { 
      icon: ShieldCheck, 
      title: lang === "EN" ? "Product Warranty" : "Garansi Produk", 
      desc: lang === "EN" 
        ? "Guaranteed quality and performance for all our spare parts and service interventions." 
        : "Jaminan kualitas dan performa untuk semua suku cadang dan layanan intervensi kami." 
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <FloatingActions />

      <section className="relative h-[360px] overflow-hidden">
        <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="container mx-auto px-6 relative h-full flex items-end pb-12">
          <div>
            <p className="text-primary font-semibold text-sm tracking-[0.2em] mb-3 uppercase">{lang === "EN" ? "OUR SERVICES" : "LAYANAN KAMI"}</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold uppercase">{lang === "EN" ? "OUR SERVICES" : "LAYANAN KAMI"}</h1>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={s.title} className={`reveal-section delay-${((i % 3) + 1) * 100} bg-surface border border-border p-8 rounded-lg hover:border-primary transition group`}>
              <div className="w-14 h-14 bg-primary/10 rounded-lg grid place-items-center mb-6 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
                <s.icon className="w-7 h-7" />
              </div>
              <h3 className="font-display text-2xl mb-4">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface/50 border-y border-border reveal-section py-20 text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="font-display text-4xl mb-6">{lang === "EN" ? "NEED TECHNICAL ASSISTANCE?" : "BUTUH BANTUAN TEKNIS?"}</h2>
          <p className="text-muted-foreground mb-8 text-lg">{lang === "EN" ? "Contact our professional technical team to discuss your maintenance requirements or get urgent repair support." : "Hubungi tim teknis profesional kami untuk mendiskusikan kebutuhan perawatan Anda atau mendapatkan dukungan perbaikan darurat."}</p>
          <a href="tel:+6281234567890" className="bg-primary text-primary-foreground font-bold px-10 py-4 rounded tracking-widest hover:brightness-110 transition inline-block">
            {lang === "EN" ? "CONTACT US" : "KONTAK KAMI"}
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
