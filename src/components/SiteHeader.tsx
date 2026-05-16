import { Link } from "@tanstack/react-router";
import { Phone, ChevronDown } from "lucide-react";
import { categories } from "@/lib/catalog";
import { useState, useEffect } from "react";

export function SiteHeader() {
  const [lang, setLang] = useState("EN");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang");
      if (saved) {
        setLang(saved);
      } else {
        localStorage.setItem("lang", "EN");
        setLang("EN");
      }
    } catch (e) {
      console.warn("Could not access localStorage", e);
    }
  }, []);

  const toggleLang = () => {
    const next = lang === "EN" ? "ID" : "EN";
    setLang(next);
    try {
      localStorage.setItem("lang", next);
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
    window.location.reload();
  };

  const nav = [
    { to: "/", label: lang === "EN" ? "HOME" : "BERANDA" },
    { to: "/tentang", label: lang === "EN" ? "ABOUT US" : "TENTANG KAMI" },
    { to: "/produk", label: lang === "EN" ? "PRODUCTS" : "PRODUK", mega: true },
    { to: "/layanan", label: lang === "EN" ? "SERVICES" : "LAYANAN" },
    { to: "/daftar-produk", label: lang === "EN" ? "STOCK" : "STOK" },
    { to: "/kontak", label: lang === "EN" ? "CONTACT" : "KONTAK" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/30 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between gap-6">
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-display text-2xl font-bold tracking-wide">
            <span className="text-foreground">DARRIN</span>
            <span className="text-primary">TEK</span>
          </span>
          <span className="text-[10px] tracking-[0.3em] text-primary mt-0.5">PREMIUM SPARE PARTS</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wider">
          {nav.map((n) => (
            <div key={n.to} className="relative group py-7">
              <Link
                to={n.to as any}
                className="text-foreground/85 hover:text-primary transition-colors flex items-center gap-1"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
                {n.mega && <ChevronDown className="w-3 h-3" />}
              </Link>
              {n.mega && (
                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition absolute left-1/2 -translate-x-1/2 top-full w-[820px] bg-background/95 backdrop-blur-md border border-border rounded-lg shadow-2xl p-6">
                  <div className="grid grid-cols-3 gap-4">
                    {categories.map((c) => (
                      <Link
                        key={c.slug}
                        to="/kategori/$slug"
                        params={{ slug: c.slug }}
                        className="flex gap-3 p-3 rounded hover:bg-surface border border-transparent hover:border-primary/40 transition group/item"
                      >
                        <img src={c.img} alt={c.name} className="w-14 h-14 object-cover rounded shrink-0" />
                        <div>
                          <div className="font-display text-sm text-foreground group-hover/item:text-primary">{c.name}</div>
                          <div className="text-[10px] text-muted-foreground mt-0.5 tracking-normal font-normal leading-snug normal-case">{c.desc}</div>
                          <div className="text-[10px] text-primary mt-1">{c.count}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a href="tel:+6281234567890" className="hidden md:flex items-center gap-2 text-sm hover:text-primary transition">
            <span className="w-9 h-9 rounded-full border border-primary/40 grid place-items-center">
              <Phone className="w-4 h-4 text-primary" />
            </span>
            <span className="font-semibold">+62 812 3456 7890</span>
          </a>
          <button 
            onClick={toggleLang}
            className="text-[10px] font-bold tracking-widest px-3 py-2 rounded border border-border hover:border-primary transition"
          >
            {lang}
          </button>
          <Link
            to="/login"
            className="bg-primary text-primary-foreground font-bold text-xs tracking-wider px-5 py-3 rounded hover:brightness-110 transition"
          >
            {lang === "EN" ? "LOGIN" : "MASUK"}
          </Link>
        </div>
      </div>
    </header>
  );
}
