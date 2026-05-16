import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Shield, Package, Truck, Headphones, ArrowRight, MessageCircle } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingActions } from "@/components/FloatingActions";
import hero from "@/assets/hero-excavator.jpg";
import { categories, type Product } from "@/lib/catalog";
import { getProducts, getNews } from "@/lib/storage";
import { t } from "@/lib/i18n";

// Logo imports
import catLogo from "@/assets/CAT.png";
import hitachi from "@/assets/hitachi.png";
import volvo from "@/assets/volvo.png";
import kobelco from "@/assets/kobelco.png";
import doosan from "@/assets/doosan.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DarrinTek — Heavy Equipment Spare Parts Supplier in Indonesia" },
      { name: "description", content: "High-quality heavy equipment spare parts supplier for Excavators, Bulldozers, Wheel Loaders and Dump Trucks. Trusted original & aftermarket parts." },
    ],
  }),
  component: Home,
});

const features = [
  { icon: Shield, title: "GUARANTEED QUALITY", desc: "High-quality original & aftermarket products" },
  { icon: Package, title: "COMPLETE STOCK", desc: "Extensive stock availability, ready to ship" },
  { icon: Truck, title: "FAST SHIPPING", desc: "Shipping to all regions in Indonesia" },
  { icon: Headphones, title: "PROFESSIONAL SERVICE", desc: "Experienced team ready to assist you" },
];

const brands = ["CAT", "HITACHI", "VOLVO", "KOBELCO", "DOOSAN"];

const brandLogos: Record<string, string> = {
  "CAT": catLogo,
  "HITACHI": hitachi,
  "VOLVO": volvo,
  "KOBELCO": kobelco,
  "DOOSAN": doosan
};

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [lang, setLang] = useState("EN");
  
  useEffect(() => {
    setLang(localStorage.getItem("lang") || "EN");
    setProducts(getProducts());
    setNews(getNews().slice(0, 3));
    
    // Inisialisasi observer dengan timeout untuk memastikan DOM siap
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.reveal-section').forEach((el) => observer.observe(el));
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const featured = products.slice(0, 5);
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <FloatingActions />

      <section className="relative h-[680px] overflow-hidden">
        <img src={hero} alt="Heavy excavator" width={1600} height={680} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/10" />
        <div className="container mx-auto px-6 relative h-full flex items-center">
          <div className="max-w-xl pt-20">
            <p className="text-primary font-semibold text-sm tracking-[0.2em] mb-4">SPARE PARTS SUPPLIER</p>
            <h1 className="font-display text-6xl md:text-7xl font-bold leading-[0.95]">
              HEAVY EQUIPMENT<br />
              <span className="text-primary">SPARE PARTS</span>
            </h1>
            <p className="font-display text-xl mt-4 tracking-wide">TOP QUALITY, MAXIMUM PERFORMANCE</p>
            <p className="text-muted-foreground mt-5 leading-relaxed">
              Providing high-quality spare parts for Excavators, Bulldozers, Wheel Loaders, Dump Trucks, and other heavy equipment.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <button className="bg-primary text-primary-foreground font-bold px-7 py-3.5 rounded text-sm tracking-wider inline-flex items-center gap-2 hover:brightness-110 transition">
                {lang === "EN" ? "VIEW CATALOG" : "LIHAT KATALOG"} <ArrowRight className="w-4 h-4" />
              </button>
              <Link to="/kontak" className="border border-border bg-surface/60 text-foreground font-bold px-7 py-3.5 rounded text-sm tracking-wider inline-flex items-center gap-2 hover:border-primary transition">
                {lang === "EN" ? "REQUEST QUOTE" : "MINTA PENAWARAN"} <MessageCircle className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="-mt-12 relative z-10">
        <div className="container mx-auto px-6">
          <div className="bg-surface/80 backdrop-blur border border-border rounded-lg grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
            {features.map((f, i) => (
              <div key={f.title} className={`reveal-section delay-${(i + 1) * 100} p-6 flex gap-4 items-start`}>
                <span className="w-12 h-12 rounded grid place-items-center border border-primary/40 text-primary shrink-0">
                  <f.icon className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-display text-base">{f.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-2">
          <div className="reveal-section delay-100">
            <h2 className="font-display text-3xl">{lang === "EN" ? "PRODUCT CATEGORIES" : "KATEGORI PRODUK"}</h2>
            <div className="w-12 h-1 bg-primary mt-2" />
          </div>
          <Link to="/kategori" className="reveal-section delay-200 text-primary text-sm font-semibold inline-flex items-center gap-1">{lang === "EN" ? "VIEW ALL" : "LIHAT SEMUA"} <ArrowRight className="w-4 h-4"/></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
          {categories.map((c, i) => (
            <Link
              key={c.slug}
              to="/kategori/$slug"
              params={{ slug: c.slug }}
              className={`reveal-section delay-${((i % 6) + 1) * 100} bg-surface border border-border rounded-lg p-4 text-center hover:border-primary transition group`}
            >
              <div className="aspect-square overflow-hidden rounded mb-3 bg-background/40">
                <img src={c.img} alt={c.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition" />
              </div>
              <h3 className="font-display text-sm">{c.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{c.count}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 pb-16">
        <div className="flex items-end justify-between mb-2">
          <div className="reveal-section delay-100">
            <h2 className="font-display text-3xl">{lang === "EN" ? "FEATURED PRODUCTS" : "PRODUK UNGGULAN"}</h2>
            <div className="w-12 h-1 bg-primary mt-2" />
          </div>
          <Link to="/produk" className="reveal-section delay-200 text-primary text-sm font-semibold inline-flex items-center gap-1">{lang === "EN" ? "VIEW ALL" : "LIHAT SEMUA"} <ArrowRight className="w-4 h-4"/></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
          {featured.map((p, i) => (
            <Link
              key={p.slug}
              to="/produk/$slug"
              params={{ slug: p.slug }}
              className={`reveal-section delay-${((i % 5) + 1) * 100} bg-surface border border-border rounded-lg overflow-hidden hover:border-primary transition group`}
            >
              <div className="aspect-square bg-background/40 overflow-hidden">
                <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition" />
              </div>
              <div className="p-4">
                <p className="text-[10px] text-primary font-bold tracking-wider">{p.brand}</p>
                <h3 className="text-sm font-semibold mt-1 leading-tight min-h-[2.5rem] group-hover:text-primary transition">{p.name}</h3>
                <span className="mt-3 w-full bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground text-primary text-xs font-bold py-2 rounded inline-flex items-center justify-center gap-2 transition">
                  {lang === "EN" ? "VIEW DETAILS" : "LIHAT DETAIL"} <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 pb-16 border-t border-border pt-16">
        <div className="flex items-end justify-between mb-2">
          <div className="reveal-section delay-100">
            <h2 className="font-display text-3xl">{lang === "EN" ? "LATEST NEWS" : "BERITA TERBARU"}</h2>
            <div className="w-12 h-1 bg-primary mt-2" />
          </div>
          <Link to="/news" className="reveal-section delay-200 text-primary text-sm font-semibold inline-flex items-center gap-1">{lang === "EN" ? "VIEW ALL" : "LIHAT SEMUA"} <ArrowRight className="w-4 h-4"/></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {news.map((n, i) => (
            <Link
              key={n.slug}
              to="/news/$slug"
              params={{ slug: n.slug }}
              className={`reveal-section delay-${(i + 1) * 100} bg-surface border border-border rounded-lg overflow-hidden hover:border-primary transition group flex flex-col`}
            >
              <div className="aspect-video bg-background/40 overflow-hidden">
                <img src={n.img} alt={n.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition" />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <p className="text-[10px] text-muted-foreground font-bold tracking-wider mb-2">
                  {new Date(n.date).toLocaleDateString(lang === 'EN' ? 'en-US' : 'id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition">{n.title}</h3>
                <p className="text-sm text-muted-foreground mt-3 line-clamp-2 mb-4">{n.content}</p>
                <div className="mt-auto pt-4 border-t border-border">
                  <span className="text-primary text-xs font-bold inline-flex items-center gap-2">
                    {lang === "EN" ? "READ MORE" : "BACA SELENGKAPNYA"} <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-12 overflow-hidden">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-2xl mb-1 text-foreground">{lang === "EN" ? "TRUSTED BRANDS" : "BRAND TERPERCAYA"}</h2>
          <div className="w-12 h-1 bg-primary mb-8" />
        </div>
        <div className="relative flex">
          <div className="animate-marquee flex gap-16 items-center whitespace-nowrap">
            {[...brands, ...brands, ...brands].map((b, i) => (
              <div key={i} className="flex items-center justify-center w-80 h-40 bg-primary rounded-lg hover:brightness-110 transition px-8">
                {brandLogos[b] ? (
                  <img src={brandLogos[b]} alt={b} className="max-h-24 max-w-full object-contain" />
                ) : (
                  <span className="font-display text-2xl tracking-wider text-primary-foreground">{b}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
