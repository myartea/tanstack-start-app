import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingActions } from "@/components/FloatingActions";
import { categories } from "@/lib/catalog";
import hero from "@/assets/hero-excavator.jpg";

export const Route = createFileRoute("/kategori/")({
  head: () => ({
    meta: [
      { title: "Product Categories — DarrinTek" },
      { name: "description", content: "Explore our wide range of heavy equipment spare parts categories." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <FloatingActions />

      <section className="relative h-[300px] overflow-hidden">
        <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="container mx-auto px-6 relative h-full flex items-end pb-12">
          <div>
            <p className="text-primary font-semibold text-sm tracking-[0.2em] mb-3">CATALOG</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold">PRODUCT <span className="text-primary">CATEGORIES</span></h1>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/kategori/$slug"
              params={{ slug: c.slug }}
              className="group bg-surface border border-border rounded-lg overflow-hidden hover:border-primary transition flex flex-col"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-display text-2xl text-foreground group-hover:text-primary transition">{c.name}</h3>
                <p className="text-muted-foreground text-sm mt-3 leading-relaxed flex-1">{c.desc}</p>
                <div className="mt-6 pt-6 border-t border-border flex justify-between items-center text-xs font-bold tracking-widest text-primary uppercase">
                  <span>{c.count}</span>
                  <span className="inline-flex items-center gap-2">VIEW PRODUCTS →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
