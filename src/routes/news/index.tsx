import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingActions } from "@/components/FloatingActions";
import { getNews } from "@/lib/storage";
import { Calendar, User, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/news/")({
  head: () => ({
    meta: [
      { title: "News & Updates — DarrinTek" },
      { name: "description", content: "Stay updated with the latest news and developments from DarrinTek." },
    ],
  }),
  component: NewsIndexPage,
});

function NewsIndexPage() {
  const newsList = getNews();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <FloatingActions />

      <section className="container mx-auto px-6 py-24">
        <h1 className="font-display text-5xl md:text-6xl font-bold mb-16 text-center">LATEST <span className="text-primary">NEWS</span></h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.map((n) => (
            <Link
              key={n.slug}
              to="/news/$slug"
              params={{ slug: n.slug }}
              className="group bg-surface border border-border rounded-lg overflow-hidden hover:border-primary transition flex flex-col"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img src={n.img} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" /> {new Date(n.date).toLocaleDateString("en-US", { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <h3 className="font-display text-2xl text-foreground group-hover:text-primary transition mb-3">{n.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{n.excerpt}</p>
                <div className="mt-6 pt-6 border-t border-border flex justify-end items-center text-xs font-bold tracking-widest text-primary uppercase">
                  <span className="inline-flex items-center gap-2">READ MORE →</span>
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
