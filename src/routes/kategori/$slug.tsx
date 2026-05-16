import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingActions } from "@/components/FloatingActions";
import { categories } from "@/lib/catalog";
import { getProducts } from "@/lib/storage";
import { ArrowRight, ChevronRight, Package } from "lucide-react";

export const Route = createFileRoute("/kategori/$slug")({
  head: ({ params }) => {
    const cat = categories.find((c) => c.slug === params.slug);
    const title = cat ? `${cat.name} — DarrinTek` : "Category — DarrinTek";
    return {
      meta: [
        { title },
        { name: "description", content: cat?.desc ?? "DarrinTek category product gallery." },
        { property: "og:title", content: title },
        { property: "og:description", content: cat?.desc ?? "" },
        ...(cat ? [{ property: "og:image", content: cat.img }] : []),
      ],
    };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center text-center bg-background">
      <div>
        <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
        <h1 className="font-display text-3xl">Category not found</h1>
        <Link to="/kategori" className="text-primary mt-4 inline-block hover:underline">Back to All Categories</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => <div className="p-10 text-destructive">Error: {error.message}</div>,
  loader: ({ params }) => {
    const cat = categories.find((c) => c.slug === params.slug);
    if (!cat) throw notFound();
    return cat;
  },
});

function CategoryPage() {
  const cat = Route.useLoaderData();
  const products = getProducts();
  const items = products.filter((p) => p.category === cat.slug);
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <FloatingActions />

      <section className="relative h-[320px] overflow-hidden">
        <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="container mx-auto px-6 relative h-full flex items-end pb-10">
          <div>
            <div className="text-xs text-muted-foreground flex items-center gap-2 mb-3">
              <Link to="/" className="hover:text-primary">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/kategori" className="hover:text-primary">Categories</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-primary font-bold">{cat.name}</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold uppercase">{cat.name}</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl leading-relaxed">{cat.desc}</p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12">
        {items.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-border rounded-xl">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
            <p className="text-muted-foreground">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {items.map((p) => (
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
                    <span className="mt-3 w-full bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground text-primary text-xs font-bold py-2.5 rounded inline-flex items-center justify-center gap-2 transition uppercase tracking-widest">
                      VIEW DETAILS <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
