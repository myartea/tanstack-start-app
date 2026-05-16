import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingActions } from "@/components/FloatingActions";
import { Award, Users, Truck, Target, Shield } from "lucide-react";
import hero from "@/assets/hero-excavator.jpg";

export const Route = createFileRoute("/tentang")({
  head: () => ({
    meta: [
      { title: "About Us — DarrinTek" },
      { name: "description", content: "Get to know DarrinTek, your trusted heavy equipment spare parts supplier in Indonesia." },
      { property: "og:title", content: "About Us — DarrinTek" },
      { property: "og:description", content: "Trusted heavy equipment spare parts supplier since 2010." },
    ],
  }),
  component: AboutPage,
});

const Counter = ({ value, label, icon: Icon }: { value: string; label: string; icon: any }) => {
  const [count, setCount] = useState(0);
  const target = parseInt(value.replace(/[^0-9]/g, ''));
  const isPercentage = value.includes('%');
  const isYears = value.toLowerCase().includes('years');
  const suffix = isPercentage ? '%' : (isYears ? ' Years' : '+');

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="text-center p-6 reveal-section">
      <Icon className="w-10 h-10 text-primary mx-auto mb-3" />
      <div className="font-display text-4xl text-primary">{count}{suffix}</div>
      <div className="text-sm text-muted-foreground mt-1 tracking-wider">{label}</div>
    </div>
  );
};

function AboutPage() {
  useEffect(() => {
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <FloatingActions />

      <section className="relative h-[360px] overflow-hidden">
        <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="container mx-auto px-6 relative h-full flex items-end pb-12">
          <div>
            <p className="text-primary font-semibold text-sm tracking-[0.2em] mb-3 uppercase">About Us</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold">ABOUT <span className="text-primary">US</span></h1>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12 items-center reveal-section">
        <img src={hero} alt="Workshop" className="rounded-lg w-full h-[420px] object-cover border border-border" />
        <div>
          <p className="text-primary font-semibold text-sm tracking-[0.2em] mb-3">WHO WE ARE</p>
          <h2 className="font-display text-4xl mb-4">TRUSTED HEAVY EQUIPMENT <span className="text-primary">SPARE PARTS SUPPLIER</span></h2>
          <div className="w-12 h-1 bg-primary mb-6" />
          <p className="text-muted-foreground leading-relaxed mb-4">
            DarrinTek was established in 2012 as a reliable heavy equipment spare parts supplier for the mining, construction, plantation, and forestry industries across Indonesia. We provide both original and aftermarket components for Komatsu, Caterpillar, Hitachi, Volvo, Kobelco, and Doosan.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            With an extensive distribution network and an experienced technical team, we are committed to providing high-quality products, competitive prices, and fast service to support your fleet's operational needs.
          </p>
        </div>
      </section>

      <section className="bg-surface/50 border-y border-border reveal-section">
        <div className="container mx-auto px-6 py-14 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <Counter icon={Users} value="5000+" label="Happy Clients" />
          <Counter icon={Truck} value="12 Years" label="Experience" />
          <Counter icon={Award} value="30+" label="Official Brands" />
          <Counter icon={Target} value="98%" label="Satisfaction Rate" />
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 grid md:grid-cols-2 gap-8 reveal-section">
        <div className="bg-surface border border-border p-8 rounded-lg">
          <h3 className="font-display text-2xl text-primary mb-3">VISION</h3>
          <div className="w-10 h-1 bg-primary mb-4" />
          <p className="text-muted-foreground leading-relaxed">To become the main partner for the heavy equipment industry in Southeast Asia by providing high-quality spare parts and services that exceed customer expectations.</p>
        </div>
        <div className="bg-surface border border-border p-8 rounded-lg">
          <h3 className="font-display text-2xl text-primary mb-3">MISSION</h3>
          <div className="w-10 h-1 bg-primary mb-4" />
          <ul className="text-muted-foreground space-y-2 list-disc pl-5">
            <li>Provide the best quality original and aftermarket spare parts.</li>
            <li>Offer competitive prices without compromising quality.</li>
            <li>Deliver products on time throughout Indonesia.</li>
            <li>Support customers with a competent technical team.</li>
          </ul>
        </div>
      </section>

      <section className="bg-background py-16 reveal-section">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-3xl mb-2">WHY CHOOSE US?</h2>
          <div className="w-12 h-1 bg-primary mb-12" />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-surface border border-border p-6 rounded-lg text-center">
              <Shield className="w-10 h-10 text-primary mx-auto mb-4" />
              <h4 className="font-bold mb-2">Quality Assurance</h4>
              <p className="text-sm text-muted-foreground">We only supply products that meet strict international quality standards.</p>
            </div>
            <div className="bg-surface border border-border p-6 rounded-lg text-center">
              <Users className="w-10 h-10 text-primary mx-auto mb-4" />
              <h4 className="font-bold mb-2">Expert Team</h4>
              <p className="text-sm text-muted-foreground">Our experienced technicians provide professional support for your maintenance needs.</p>
            </div>
            <div className="bg-surface border border-border p-6 rounded-lg text-center">
              <Truck className="w-10 h-10 text-primary mx-auto mb-4" />
              <h4 className="font-bold mb-2">Reliable Logistics</h4>
              <p className="text-sm text-muted-foreground">Fast and safe delivery network across Indonesia to minimize your downtime.</p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
