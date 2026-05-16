import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingActions } from "@/components/FloatingActions";
import { getNews } from "@/lib/storage";
import { Calendar, User, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    const news = getNews();
    const n = news.find((x) => x.slug === params.slug);
    if (!n) throw notFound();
    return n;
  },
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center text-center bg-background">
      <div className="max-w-md px-6">
        <h1 className="font-display text-4xl mb-4">NEWS NOT FOUND</h1>
        <Link to="/" className="text-primary underline">BACK TO HOME</Link>
      </div>
    </div>
  ),
  component: NewsPage,
});

function NewsPage() {
  const n = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <FloatingActions />

      <main className="container mx-auto px-6 py-24 max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-primary text-sm font-bold hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" /> BACK TO HOME
        </Link>
        
        <div className="space-y-6">
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-surface border border-border">
            <img src={n.img} alt={n.title} className="w-full h-full object-cover" />
          </div>
          
          <div className="space-y-4">
            <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight">{n.title}</h1>
            <div className="flex items-center gap-6 text-xs font-bold text-muted-foreground uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" /> {new Date(n.date).toLocaleDateString("en-US", { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" /> {n.author}
              </span>
            </div>
          </div>

          <div className="prose prose-invert prose-lg max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {n.content}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
