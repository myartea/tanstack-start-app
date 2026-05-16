import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search, ArrowRight, Package } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingActions } from "@/components/FloatingActions";
import { type Product, categories } from "@/lib/catalog";
import { getProducts } from "@/lib/storage";
import hero from "@/assets/hero-excavator.jpg";

export const Route = createFileRoute("/produk/")({
  head: () => ({
    meta: [
      { title: "All Products — DarrinTek" },
      { name: "description", content: "Complete list of high-quality heavy equipment spare parts from DarrinTek." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase()) ||
    p.partNumber.toLowerCase().includes(search.toLowerCase())
  );

  // Group products by category
  const groupedProducts = categories.map(cat => ({
    ...cat,
    items: filtered.filter(p => p.category === cat.slug)
  })).filter(group => group.items.length > 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <FloatingActions />

      <section className="relative h-[300px] overflow-hidden">
        <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="container mx-auto px-6 relative h-full flex items-end pb-12">
          <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-primary font-semibold text-sm tracking-[0.2em] mb-3">CATALOG</p>
              <h1 className="font-display text-5xl md:text-6xl font-bold uppercase">ALL <span className="text-primary">PRODUCTS</span></h1>
            </div>
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-surface border border-border rounded-lg pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-primary transition" 
                placeholder="Search by name, brand, or part number…"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 space-y-20">
        {groupedProducts.length > 0 ? (
          groupedProducts.map((group) => (
            <div key={group.slug} className="space-y-8">
              <div className="flex items-end justify-between border-b border-border pb-4">
                <div>
                  <h2 className="font-display text-3xl text-primary">{group.name}</h2>
                  <p className="text-muted-foreground text-sm mt-1">{group.desc}</p>
                </div>
                <div className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                  {group.items.length} PRODUCTS
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {group.items.map((p) => (
                  <Link
                    key={p.slug}
                    to="/produk/$slug"
                    params={{ slug: p.slug }}
                    className="bg-surface border border-border rounded-lg overflow-hidden hover:border-primary transition group flex flex-col"
                  >
                    <div className="aspect-square bg-background/40 overflow-hidden">
                      <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <p className="text-[10px] text-primary font-bold tracking-wider uppercase">{p.brand}</p>
                      <h3 className="text-sm font-semibold mt-1 leading-tight min-h-[2.5rem] group-hover:text-primary transition">{p.name}</h3>
                      <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2">
                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Part No: {p.partNumber}</div>
                        <span className="w-full bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground text-primary text-xs font-bold py-2.5 rounded inline-flex items-center justify-center gap-2 transition">
                          VIEW DETAILS <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-border rounded-xl">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
            <p className="text-muted-foreground">No products found for "{search}"</p>
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
