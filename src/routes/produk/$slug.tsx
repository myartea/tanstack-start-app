import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingActions } from "@/components/FloatingActions";
import { categories, type Product } from "@/lib/catalog";
import { getProducts } from "@/lib/storage";
import { 
  ArrowRight, ChevronRight, MessageCircle, Check, Shield, 
  Truck, Package, Info, Share2, Printer, MapPin
} from "lucide-react";

export const Route = createFileRoute("/produk/$slug")({
  head: ({ params }) => {
    const products = getProducts();
    const p = products.find((x) => x.slug === params.slug);
    const title = p ? `${p.name} — DarrinTek Indonesia` : "Product Details — DarrinTek";
    return {
      meta: [
        { title },
        { name: "description", content: p?.desc ?? "High-quality heavy equipment spare parts details from DarrinTek Indonesia." },
        { property: "og:title", content: title },
        { property: "og:description", content: p?.desc ?? "" },
        ...(p ? [{ property: "og:image", content: p.img }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const products = getProducts();
    const p = products.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return p;
  },
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center text-center bg-background">
      <div className="max-w-md px-6">
        <Package className="w-20 h-20 text-primary mx-auto mb-6 opacity-20" />
        <h1 className="font-display text-4xl mb-4">PRODUCT NOT FOUND</h1>
        <p className="text-muted-foreground mb-8">Sorry, the product you are looking for may have been removed or moved to another category.</p>
        <Link to="/produk" className="bg-primary text-primary-foreground font-bold px-8 py-3 rounded text-xs tracking-widest hover:brightness-110 transition inline-block">
          VIEW ALL PRODUCTS
        </Link>
      </div>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const p = Route.useLoaderData();
  const products = getProducts();
  const cat = categories.find((c) => c.slug === p.category);
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <FloatingActions />

      {/* Breadcrumbs */}
      <div className="pt-28 pb-6 border-b border-border bg-surface/30">
        <div className="container mx-auto px-6">
          <div className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground flex flex-wrap items-center gap-2 uppercase">
            <Link to="/" className="hover:text-primary transition">HOME</Link>
            <ChevronRight className="w-3 h-3 text-primary/40" />
            <Link to="/produk" className="hover:text-primary transition">CATALOG</Link>
            <ChevronRight className="w-3 h-3 text-primary/40" />
            {cat && (
              <>
                <Link to="/kategori/$slug" params={{ slug: cat.slug }} className="hover:text-primary transition">{cat.name}</Link>
                <ChevronRight className="w-3 h-3 text-primary/40" />
              </>
            )}
            <span className="text-primary">{p.name}</span>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-surface border border-border rounded-xl overflow-hidden aspect-square md:aspect-video flex items-center justify-center p-8 relative group">
              <img src={p.img} alt={p.name} className="w-full h-full object-contain group-hover:scale-105 transition duration-700" />
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded text-[10px] font-bold tracking-widest">
                {p.brand}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`aspect-square rounded-lg border-2 bg-surface flex items-center justify-center p-2 cursor-pointer transition hover:border-primary/50 ${i === 0 ? 'border-primary' : 'border-border'}`}>
                  <img src={p.img} alt="" className="w-full h-full object-contain opacity-60" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-primary mb-2">
                <span className="w-8 h-px bg-primary"></span>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase">{cat?.name || "SPARE PARTS"}</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight uppercase">{p.name}</h1>
              <div className="flex flex-wrap items-center gap-6 mt-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">PART NUMBER:</span>
                  <span className="font-mono font-bold text-foreground">{p.partNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold tracking-wider">
                  <Check className="w-4 h-4" /> READY STOCK
                </div>
              </div>
            </div>

            <div className="bg-surface border border-primary/20 rounded-xl p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
              <p className="text-[10px] font-bold text-muted-foreground tracking-[0.2em] mb-1">PRICE ESTIMATION</p>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-4xl text-primary font-bold">{p.price}</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-4 leading-relaxed">
                *Prices may change at any time based on exchange rates and stock availability. Please contact our marketing team for an official quote.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-display text-xl tracking-wider flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" /> PRODUCT DESCRIPTION
              </h3>
              <div className="h-px bg-border w-full"></div>
              <p className="text-muted-foreground leading-relaxed text-sm whitespace-pre-wrap">
                {p.desc}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-surface/50 border border-border rounded-lg flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary shrink-0" />
                <div className="text-[10px] font-bold leading-tight tracking-wider">GUARANTEED QUALITY</div>
              </div>
              <div className="p-4 bg-surface/50 border border-border rounded-lg flex items-center gap-3">
                <Truck className="w-5 h-5 text-primary shrink-0" />
                <div className="text-[10px] font-bold leading-tight tracking-wider">NATIONWIDE SHIPPING</div>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <a 
                href={`https://wa.me/6281234567890?text=Hello%20DarrinTek,%20I%20am%20interested%20in%20this%20product:%20${encodeURIComponent(p.name)}%20(Part%20No:%20${p.partNumber}).%20Can%20you%20please%20provide%20a%20quote?`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-lg flex items-center justify-center gap-3 hover:brightness-110 transition shadow-lg shadow-primary/10 tracking-[0.2em] text-xs"
              >
                <MessageCircle className="w-5 h-5" /> GET QUOTE VIA WHATSAPP
              </a>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex-1 border border-border bg-surface py-3 rounded-lg flex items-center justify-center gap-2 text-[10px] font-bold hover:border-primary transition tracking-widest uppercase">
                  <Share2 className="w-4 h-4" /> SHARE
                </button>
                <button className="flex-1 border border-border bg-surface py-3 rounded-lg flex items-center justify-center gap-2 text-[10px] font-bold hover:border-primary transition tracking-widest uppercase">
                  <Printer className="w-4 h-4" /> DOWNLOAD PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specs Table */}
        <div className="mt-20">
          <h2 className="font-display text-3xl mb-8 uppercase tracking-wider">TECHNICAL <span className="text-primary">SPECIFICATIONS</span></h2>
          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-border">
                {[
                  { label: "PRODUCT NAME", value: p.name },
                  { label: "BRAND / MAKE", value: p.brand },
                  { label: "PART NUMBER", value: p.partNumber },
                  { label: "CATEGORY", value: cat?.name || "-" },
                  { label: "CONDITION", value: p.condition || "NEW (ORIGINAL/AFTERMARKET)" },
                  { label: "WEIGHT", value: p.weight || "-" },
                  { label: "COUNTRY OF ORIGIN", value: p.origin || "-" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-background/20' : ''}>
                    <td className="px-6 py-4 font-bold text-muted-foreground w-1/3 text-[10px] tracking-widest">{row.label}</td>
                    <td className="px-6 py-4 text-foreground font-semibold">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="bg-surface/30 border-t border-border py-20">
          <div className="container mx-auto px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="font-display text-3xl uppercase tracking-wider">RELATED <span className="text-primary">PRODUCTS</span></h2>
                <div className="w-12 h-1 bg-primary mt-2" />
              </div>
              <Link to="/produk" className="text-primary text-[10px] font-bold tracking-[0.2em] flex items-center gap-2 hover:translate-x-1 transition">
                VIEW ALL <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((rp) => (
                <Link 
                  key={rp.slug} 
                  to="/produk/$slug" 
                  params={{ slug: rp.slug }} 
                  className="bg-surface border border-border rounded-xl overflow-hidden hover:border-primary transition group flex flex-col shadow-sm"
                >
                  <div className="aspect-square overflow-hidden bg-background/30 p-4">
                    <img src={rp.img} alt={rp.name} className="w-full h-full object-contain group-hover:scale-110 transition duration-500" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <p className="text-[10px] text-primary font-bold tracking-widest uppercase">{rp.brand}</p>
                    <h3 className="text-sm font-semibold mt-1 leading-tight min-h-[2.5rem] group-hover:text-primary transition">{rp.name}</h3>
                    <div className="mt-4 pt-4 border-t border-border">
                      <span className="w-full bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground text-primary text-[10px] font-bold py-2.5 rounded-lg inline-flex items-center justify-center gap-2 transition uppercase tracking-widest">
                        PRODUCT DETAILS <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}
