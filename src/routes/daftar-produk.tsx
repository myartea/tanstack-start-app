import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingActions } from "@/components/FloatingActions";
import { getProducts } from "@/lib/storage";
import { categories, type Product } from "@/lib/catalog";
import hero from "@/assets/hero-excavator.jpg";

export const Route = createFileRoute("/daftar-produk")({
  head: () => ({
    meta: [{ title: "Product List — DarrinTek" }],
  }),
  component: ProductListPage,
});

function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [lang, setLang] = useState("EN");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setLang(localStorage.getItem("lang") || "EN");
    setProducts(getProducts());
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "dartekok26") {
      setAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  const exportPDF = async () => {
    const { jsPDF } = await import("jspdf");
    const { default: autoTable } = await import("jspdf-autotable");
    
    const doc = new jsPDF();
    doc.text("DarrinTek Product Stock Report", 14, 15);
    autoTable(doc, {
      startY: 20,
      head: [['No', 'Product Name', 'Part No', 'Category', 'Stock']],
      body: filtered.map((p, i) => [i + 1, p.name, p.partNumber, p.category.replace("-", " "), p.stock || 0]),
    });
    doc.save("Product_Stock_Report.pdf");
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
        <form onSubmit={handlePasswordSubmit} className="bg-surface border border-border p-8 rounded-lg shadow-xl w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4">{lang === "EN" ? "ENTER PASSWORD" : "MASUKKAN PASSWORD"}</h2>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-background border border-border rounded-lg px-4 py-3 mb-4 text-sm"
            placeholder="Password"
          />
          <button type="submit" className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg">
            {lang === "EN" ? "ACCESS" : "AKSES"}
          </button>
        </form>
      </div>
    );
  }

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.partNumber.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || p.category === category;
    const matchesStock = stockFilter === "all" ? true : (stockFilter === "in" ? (p.stock || 0) > 0 : (p.stock || 0) === 0);
    return matchesSearch && matchesCategory && matchesStock;
  }).sort((a, b) => {
    if (sortBy === "part-no") return (a.partNumber || "").localeCompare(b.partNumber || "");
    if (sortBy === "stock") return (b.stock || 0) - (a.stock || 0);
    return a.category.localeCompare(b.category);
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <FloatingActions />

      <section className="relative h-[240px] overflow-hidden">
        <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="container mx-auto px-6 relative h-full flex items-end pb-10">
          <h1 className="font-display text-5xl font-bold uppercase">
            {lang === "EN" ? "PRODUCT LIST" : "DAFTAR PRODUK"}
          </h1>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-surface border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary w-full md:w-48"
            placeholder={lang === "EN" ? "Search..." : "Cari..."}
          />
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-surface border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary w-full md:w-40"
          >
            <option value="all">{lang === "EN" ? "All Categories" : "Semua Kategori"}</option>
            {categories.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
          <select 
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="bg-surface border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary w-full md:w-32"
          >
            <option value="all">{lang === "EN" ? "All Stock" : "Semua Stok"}</option>
            <option value="in">{lang === "EN" ? "In Stock" : "Ready"}</option>
            <option value="out">{lang === "EN" ? "Out of Stock" : "Habis"}</option>
          </select>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-surface border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary w-full md:w-32"
          >
            <option value="default">{lang === "EN" ? "Sort by" : "Urutkan"}</option>
            <option value="stock">{lang === "EN" ? "Stock" : "Stok"}</option>
            <option value="part-no">{lang === "EN" ? "Part No" : "No. Part"}</option>
          </select>
          <button 
            onClick={exportPDF}
            className="bg-red-600 text-white rounded-lg px-6 py-3 text-sm font-bold hover:brightness-110 transition"
          >
            EXPORT TO PDF
          </button>
        </div>
        <div className="bg-surface border border-border rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto overflow-y-auto max-h-[600px]">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-background/50 sticky top-0 z-10">
                <tr className="text-[15px] uppercase tracking-wider text-primary-foreground border-b border-primary/20 bg-primary">
                  <th className="px-6 py-4 font-bold">No</th>
                  <th className="px-6 py-4 font-bold">Image</th>
                  <th className="px-6 py-4 font-bold min-w-[200px]">Product Name</th>
                  <th className="px-6 py-4 font-bold">Part No</th>
                  <th className="px-6 py-4 font-bold">Category</th>
                  <th className="px-6 py-4 font-bold text-center">Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((p, i) => (
                  <tr key={p.slug} className="hover:bg-background/40 transition">
                    <td className="px-6 py-4">{i + 1}</td>
                    <td className="px-6 py-4">
                      <img src={p.img} alt={p.name} className="w-12 h-12 object-cover rounded border border-border" />
                    </td>
                    <td className="px-6 py-4 font-semibold">{p.name}</td>
                    <td className="px-6 py-4 font-mono text-xs">{p.partNumber}</td>
                    <td className="px-6 py-4 capitalize">{p.category.replace("-", " ")}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded text-xs font-bold uppercase ${
                        (p.stock || 0) > 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-destructive/10 text-destructive"
                      }`}>
                        {(p.stock || 0) > 0 ? (p.stock || 0) : "OUT OF STOCK"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
