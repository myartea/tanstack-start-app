import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { 
  Package, ShoppingCart, Users, TrendingUp, LogOut, Search, Bell, 
  LayoutDashboard, Boxes, FileText, Settings, Plus, Edit, Trash2, X, Upload
} from "lucide-react";
import { isAuthed, logout } from "@/lib/auth";
import { categories, type Product } from "@/lib/catalog";
import { getProducts, saveProducts, getNews, saveNews, type News, compressImage } from "@/lib/storage";
import * as XLSX from 'xlsx';

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — DarrinTek" }] }),
  component: Dashboard,
});

const stats = [
  { label: "Total Produk", value: "1,248", change: "+12%", icon: Package },
  { label: "Pesanan Bulan Ini", value: "342", change: "+8%", icon: ShoppingCart },
  { label: "Pelanggan", value: "586", change: "+24%", icon: Users },
  { label: "Pendapatan (Rp)", value: "1.2M", change: "+18%", icon: TrendingUp },
];

const recent = [
  { id: "INV-2024-001", cust: "PT Bumi Karya", item: "Hydraulic Pump Komatsu PC200-8", status: "Selesai", total: "Rp 24.500.000" },
  { id: "INV-2024-002", cust: "CV Tambang Jaya", item: "Track Roller Hitachi ZX200", status: "Diproses", total: "Rp 8.750.000" },
  { id: "INV-2024-003", cust: "PT Mining Indo", item: "Alternator Caterpillar C13", status: "Dikirim", total: "Rp 5.200.000" },
  { id: "INV-2024-004", cust: "PT Sumber Daya", item: "Filter Set Donaldson", status: "Selesai", total: "Rp 1.850.000" },
  { id: "INV-2024-005", cust: "CV Mandiri Jaya", item: "Water Pump CAT C13", status: "Pending", total: "Rp 4.200.000" },
];

const statusColor: Record<string,string> = {
  "Selesai": "bg-emerald-500/15 text-emerald-400",
  "Diproses": "bg-amber-500/15 text-amber-400",
  "Dikirim": "bg-blue-500/15 text-blue-400",
  "Pending": "bg-zinc-500/15 text-zinc-300",
};

function Dashboard() {
  const nav = useNavigate();
  const [ready, setReady] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [products, setProducts] = useState<Product[]>([]);
  const [newsList, setNewsList] = useState<News[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [themeColor, setThemeColor] = useState(localStorage.getItem("themeColor") || "#eab308");
  const [tempThemeColor, setTempThemeColor] = useState(localStorage.getItem("themeColor") || "#eab308");
  const [menuOrder, setMenuOrder] = useState<string[]>(JSON.parse(localStorage.getItem("menuOrder") || '["HOME", "ABOUT US", "PRODUCTS", "SERVICES", "STOCK", "CONTACT"]'));

  const themes = [
    { name: "Default", color: "#eab308" },
    { name: "Emerald", color: "#10b981" },
    { name: "Blue", color: "#3b82f6" },
    { name: "Rose", color: "#f43f5e" },
    { name: "Violet", color: "#8b5cf6" },
  ];

  const previewTheme = (color: string) => {
    setTempThemeColor(color);
    document.documentElement.style.setProperty('--color-primary', color);
  };

  const saveSettings = () => {
    setThemeColor(tempThemeColor);
    localStorage.setItem("themeColor", tempThemeColor);
    localStorage.setItem("menuOrder", JSON.stringify(menuOrder));
    alert("Settings saved successfully!");
  };

  const moveMenu = (index: number, direction: number) => {
    const newOrder = [...menuOrder];
    const target = index + direction;
    if (target < 0 || target >= newOrder.length) return;
    [newOrder[index], newOrder[target]] = [newOrder[target], newOrder[index]];
    setMenuOrder(newOrder);
  };

  const statsList = [
    { label: "Total Products", value: products.length.toString(), change: "+0%", icon: Package },
    { label: "Orders This Month", value: "42", change: "+5%", icon: ShoppingCart },
    { label: "Customers", value: "128", change: "+12%", icon: Users },
    { label: "Total News", value: newsList.length.toString(), change: "+0%", icon: FileText },
  ];

  useEffect(() => {
    if (!isAuthed()) nav({ to: "/login" });
    else {
      setProducts(getProducts());
      setNewsList(getNews());
      setReady(true);
      document.documentElement.style.setProperty('--color-primary', themeColor);
    }
  }, [nav, themeColor]);

  useEffect(() => {
    if (editingProduct) setImagePreview(editingProduct.img);
    else if (editingNews) setImagePreview(editingNews.img);
    else setImagePreview(null);
  }, [editingProduct, editingNews]);

  if (!ready) return null;

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const downloadTemplate = () => {
    const template = [
      { slug: "example-slug", name: "Example Product", category: "engine-parts", brand: "BRAND", partNumber: "12345", price: "Contact Us", desc: "Description", condition: "New", weight: "1 KG", origin: "Japan", stock: 0 }
    ];
    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Products");
    XLSX.writeFile(wb, "Product_Import_Template.xlsx");
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws) as Product[];
      setProducts([...products, ...data]);
      saveProducts([...products, ...data]);
      alert("Products imported successfully!");
    };
    reader.readAsBinaryString(file);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as any;
    const finalImage = imagePreview || categories.find(c => c.slug === data.category)?.img || "";
    
    let updated: Product[];
    if (editingProduct) {
      updated = products.map(p => p.slug === editingProduct.slug ? { ...editingProduct, ...data, img: finalImage } : p);
    } else {
      const slug = data.name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
      updated = [...products, { ...data, slug, img: finalImage }];
    }
    
    setProducts(updated);
    saveProducts(updated);
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSaveNews = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as any;
    
    let finalImage = imagePreview || editingNews?.img || "";
    if (imagePreview && imagePreview.startsWith("data:image")) {
       finalImage = await compressImage(imagePreview);
    }
    
    let updated: News[];
    if (editingNews) {
      updated = newsList.map(n => n.slug === editingNews.slug ? { ...n, ...data, img: finalImage } : n);
    } else {
      const slug = data.title.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
      updated = [...newsList, { ...data, slug, img: finalImage, date: new Date().toISOString(), author: "Admin" }];
    }
    
    setNewsList(updated);
    saveNews(updated);
    setIsNewsModalOpen(false);
    setEditingNews(null);
    setImagePreview(null);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.brand.toLowerCase().includes(search.toLowerCase()) ||
    p.partNumber.toLowerCase().includes(search.toLowerCase())
  );

  const filteredNews = newsList.filter(n => 
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (slug: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const updated = products.filter(p => p.slug !== slug);
      setProducts(updated);
      saveProducts(updated);
    }
  };

  const handleDeleteNews = (slug: string) => {
    if (confirm("Are you sure you want to delete this news?")) {
      const updated = newsList.filter(n => n.slug !== slug);
      setNewsList(updated);
      saveNews(updated);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Settings":
        return (
          <div className="space-y-8">
            <h1 className="font-display text-3xl">Settings</h1>
            <div className="bg-surface border border-border p-6 rounded-lg">
              <h3 className="font-bold mb-4">Portal Logo</h3>
              <label className="border-2 border-dashed border-border p-8 rounded-lg block text-center cursor-pointer hover:border-primary">
                <Upload className="mx-auto mb-2 text-muted-foreground" />
                <span className="text-sm">Click to upload brand logo</span>
                <input type="file" className="hidden" accept="image/*" onChange={onImageChange} />
              </label>
            </div>
            <div className="bg-surface border border-border p-6 rounded-lg">
              <h3 className="font-bold mb-4">Theme Color</h3>
              <div className="flex gap-4">
                {themes.map(t => (
                  <button 
                    key={t.name}
                    onClick={() => previewTheme(t.color)}
                    className={`w-12 h-12 rounded-full border-4 ${tempThemeColor === t.color ? 'border-foreground' : 'border-transparent'}`}
                    style={{ backgroundColor: t.color }}
                    title={t.name}
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-4">
                <button 
                  onClick={saveSettings}
                  className="bg-primary text-primary-foreground font-bold px-6 py-3 rounded text-sm hover:brightness-110 transition"
                >
                  SAVE SETTINGS
                </button>
            </div>
            <div className="bg-surface border border-border p-6 rounded-lg">
              <h3 className="font-bold mb-4">Navigation Order</h3>
              <div className="space-y-2">
                {menuOrder.map((item, i) => (
                  <div key={item} className="flex items-center justify-between bg-background p-3 rounded border border-border">
                    <span>{item}</span>
                    <div className="flex gap-2">
                      <button onClick={() => moveMenu(i, -1)} className="px-2 py-1 bg-border rounded">↑</button>
                      <button onClick={() => moveMenu(i, 1)} className="px-2 py-1 bg-border rounded">↓</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "News":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="font-display text-3xl text-foreground">News Management</h1>
                <p className="text-muted-foreground text-sm mt-1">Manage company news and updates.</p>
              </div>
              <button 
                onClick={() => { setEditingNews(null); setImagePreview(null); setIsNewsModalOpen(true); }}
                className="bg-primary text-primary-foreground px-4 py-2 rounded font-bold text-sm flex items-center gap-2 hover:brightness-110 transition"
              >
                <Plus className="w-4 h-4" /> ADD NEWS
              </button>
            </div>
            <div className="bg-surface border border-border rounded-lg overflow-hidden">
              <div className="p-4 border-b border-border bg-background/30 flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-background border border-border rounded pl-10 pr-3 py-2 text-sm focus:outline-none focus:border-primary" 
                    placeholder="Search news by title…" 
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-background/50 text-[10px] uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-6 py-4 font-bold">News</th>
                      <th className="px-6 py-4 font-bold">Date</th>
                      <th className="px-6 py-4 font-bold">Author</th>
                      <th className="px-6 py-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[...filteredNews].reverse().map(n => (
                      <tr key={n.slug} className="hover:bg-background/40 transition">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={n.img} className="w-10 h-10 object-cover rounded border border-border" />
                            <div className="font-semibold text-foreground truncate max-w-xs">{n.title}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{new Date(n.date).toLocaleDateString("en-US")}</td>
                        <td className="px-6 py-4">{n.author}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => { setEditingNews(n); setImagePreview(n.img); setIsNewsModalOpen(true); }} className="p-2 hover:bg-background rounded transition text-blue-400"><Edit className="w-4 h-4" /></button>
                            <button onClick={() => handleDeleteNews(n.slug)} className="p-2 hover:bg-background rounded transition text-destructive"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case "Products":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="font-display text-3xl text-foreground">Product Management</h1>
                <p className="text-muted-foreground text-sm mt-1">Manage inventory, including quick stock updates.</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={downloadTemplate}
                  className="bg-zinc-600 text-white px-4 py-2 rounded font-bold text-sm hover:brightness-110 transition"
                >
                  DOWNLOAD TEMPLATE
                </button>
                <label className="bg-primary text-primary-foreground px-4 py-2 rounded font-bold text-sm cursor-pointer hover:brightness-110 transition">
                  IMPORT EXCEL
                  <input type="file" className="hidden" accept=".xlsx, .xls" onChange={handleImport} />
                </label>
                <button 
                  onClick={() => { saveProducts(products); alert("All stock changes saved!"); }}
                  className="bg-emerald-600 text-white px-4 py-2 rounded font-bold text-sm hover:brightness-110 transition"
                >
                  SAVE ALL CHANGES
                </button>
                <button 
                  onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded font-bold text-sm flex items-center gap-2 hover:brightness-110 transition"
                >
                  <Plus className="w-4 h-4" /> ADD PRODUCT
                </button>
              </div>
            </div>
            <div className="bg-surface border border-border rounded-lg overflow-hidden">
              <div className="p-4 border-b border-border bg-background/30 flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-background border border-border rounded pl-10 pr-3 py-2 text-sm focus:outline-none focus:border-primary" 
                    placeholder="Search products…" 
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-background/50 text-[10px] uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-6 py-4 font-bold">Product</th>
                      <th className="px-6 py-4 font-bold">Stock</th>
                      <th className="px-6 py-4 font-bold">Part Number</th>
                      <th className="px-6 py-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[...filteredProducts].reverse().map(p => (
                      <tr key={p.slug} className="hover:bg-background/40 transition">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={p.img} className="w-10 h-10 object-cover rounded border border-border" />
                            <div className="font-semibold text-foreground">{p.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <input 
                            type="number"
                            defaultValue={p.stock || 0}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              setProducts(products.map(pr => pr.slug === p.slug ? {...pr, stock: val} : pr));
                            }}
                            className="w-20 bg-background border border-border rounded px-2 py-1 text-sm focus:border-primary"
                          />
                        </td>
                        <td className="px-6 py-4 font-mono text-xs">{p.partNumber}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => { setEditingProduct(p); setIsModalOpen(true); }} className="p-2 hover:bg-background rounded transition text-blue-400"><Edit className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete(p.slug)} className="p-2 hover:bg-background rounded transition text-destructive"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case "Dashboard":
      default:
        return (
          <div className="space-y-6">
            <div>
              <h1 className="font-display text-3xl">Dashboard</h1>
              <p className="text-muted-foreground text-sm mt-1">DarrinTek operational summary.</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {statsList.map((s) => (
                <div key={s.label} className="bg-surface border border-border rounded-lg p-5">
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded bg-primary/10 text-primary grid place-items-center"><s.icon className="w-5 h-5" /></span>
                    <span className="text-xs font-semibold text-emerald-400">{s.change}</span>
                  </div>
                  <div className="mt-4 font-display text-3xl">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <aside className="w-64 bg-surface border-r border-border hidden md:flex flex-col text-xs font-semibold tracking-wider">
        <Link to="/" className="px-6 py-6 border-b border-border">
          <span className="font-display text-2xl font-bold">
            <span className="text-foreground">DARRIN</span><span className="text-primary">TEK</span>
          </span>
          <div className="text-[10px] tracking-[0.2em] text-primary mt-1">ADMIN PANEL</div>
        </Link>
        <nav className="p-4 space-y-1">
          {menuOrder.map((label) => (
            <button 
              key={label} 
              onClick={() => setActiveTab(label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded transition ${activeTab === label ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:bg-background hover:text-foreground"}`}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="mt-auto p-4">
          <button onClick={() => { logout(); nav({ to: "/login" }); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-muted-foreground hover:text-destructive hover:bg-background transition">
            <LogOut className="w-4 h-4" /> Log Out
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-surface/50 shrink-0">
          <div className="font-display text-sm tracking-widest text-muted-foreground uppercase">{activeTab}</div>
          <div className="flex items-center gap-4">
            <button className="relative w-9 h-9 grid place-items-center rounded border border-border hover:border-primary transition"><Bell className="w-4 h-4" /><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" /></button>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground grid place-items-center font-bold text-sm">A</div>
              <div className="text-sm hidden sm:block">
                <div className="font-semibold">Admin DTU</div>
                <div className="text-xs text-muted-foreground">Administrator</div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-auto bg-background/50">
          {renderContent()}
        </div>
      </main>

      {/* Modal CRUD News */}
      {isNewsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-surface border border-border rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-background/30">
              <h3 className="font-display text-xl uppercase tracking-wider">
                {editingNews ? "Edit News" : "Add New News"}
              </h3>
              <button onClick={() => setIsNewsModalOpen(false)} className="text-muted-foreground hover:text-foreground transition"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveNews} className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 flex justify-center mb-4">
                  <div className="relative group">
                    <div className="w-64 h-36 rounded-lg border-2 border-dashed border-border overflow-hidden bg-background/50 flex items-center justify-center">
                      {imagePreview ? (
                        <img src={imagePreview} className="w-full h-full object-cover" />
                      ) : (
                        <FileText className="w-12 h-12 text-muted-foreground opacity-20" />
                      )}
                    </div>
                    <label className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 group-hover:opacity-100 transition cursor-pointer rounded-lg">
                      <div className="text-center">
                        <Upload className="w-6 h-6 mx-auto mb-1 text-primary" />
                        <span className="text-[10px] font-bold text-primary tracking-widest">CHANGE IMAGE</span>
                      </div>
                      <input type="file" className="hidden" accept="image/*" onChange={onImageChange} />
                    </label>
                  </div>
                </div>
                <div className="col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">News Title</label>
                  <input 
                    name="title"
                    required
                    defaultValue={editingNews?.title}
                    className="w-full bg-background border border-border rounded px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition" 
                    placeholder="E.g., DarrinTek Service Expansion in Kalimantan" 
                  />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">News Content</label>
                  <textarea 
                    name="content"
                    required
                    rows={6}
                    defaultValue={editingNews?.content}
                    className="w-full bg-background border border-border rounded px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition resize-none" 
                    placeholder="Detailed news content…" 
                  />
                </div>
              </div>
              <div className="mt-8 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsNewsModalOpen(false)}
                  className="flex-1 bg-background border border-border text-foreground font-bold py-3 rounded text-xs tracking-widest hover:bg-surface transition"
                >
                  CANCEL
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground font-bold py-3 rounded text-xs tracking-widest hover:brightness-110 transition"
                >
                  SAVE NEWS
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal CRUD Product */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-surface border border-border rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-background/30">
              <h3 className="font-display text-xl uppercase tracking-wider">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground transition"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 flex justify-center mb-4">
                  <div className="relative group">
                    <div className="w-40 h-40 rounded-lg border-2 border-dashed border-border overflow-hidden bg-background/50 flex items-center justify-center">
                      {imagePreview ? (
                        <img src={imagePreview} className="w-full h-full object-cover" />
                      ) : (
                        <Package className="w-12 h-12 text-muted-foreground opacity-20" />
                      )}
                    </div>
                    <label className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 group-hover:opacity-100 transition cursor-pointer rounded-lg">
                      <div className="text-center">
                        <Upload className="w-6 h-6 mx-auto mb-1 text-primary" />
                        <span className="text-[10px] font-bold text-primary tracking-widest">CHANGE IMAGE</span>
                      </div>
                      <input type="file" className="hidden" accept="image/*" onChange={onImageChange} />
                    </label>
                  </div>
                </div>
                <div className="col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Product Name</label>
                  <input 
                    name="name"
                    required
                    defaultValue={editingProduct?.name}
                    className="w-full bg-background border border-border rounded px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition" 
                    placeholder="E.g., Hydraulic Pump Komatsu PC200-8" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Category</label>
                  <select 
                    name="category"
                    required
                    defaultValue={editingProduct?.category}
                    className="w-full bg-background border border-border rounded px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition"
                  >
                    {categories.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Brand</label>
                  <input 
                    name="brand"
                    required
                    defaultValue={editingProduct?.brand}
                    className="w-full bg-background border border-border rounded px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition" 
                    placeholder="KOMATSU, CAT, etc." 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Part Number</label>
                  <input 
                    name="partNumber"
                    required
                    defaultValue={editingProduct?.partNumber}
                    className="w-full bg-background border border-border rounded px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition" 
                    placeholder="Serial / Part Number" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Price</label>
                  <input 
                    name="price"
                    defaultValue={editingProduct?.price || "Contact Us"}
                    className="w-full bg-background border border-border rounded px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition" 
                    placeholder="E.g., Contact Us" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Condition</label>
                  <input 
                    name="condition"
                    defaultValue={editingProduct?.condition || "New (Original/Aftermarket)"}
                    className="w-full bg-background border border-border rounded px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition" 
                    placeholder="E.g., New (Original)" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Weight</label>
                  <input 
                    name="weight"
                    defaultValue={editingProduct?.weight}
                    className="w-full bg-background border border-border rounded px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition" 
                    placeholder="E.g., 15 KG" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Country of Origin</label>
                  <input 
                    name="origin"
                    defaultValue={editingProduct?.origin}
                    className="w-full bg-background border border-border rounded px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition" 
                    placeholder="E.g., Japan" 
                  />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Description</label>
                  <textarea 
                    name="desc"
                    required
                    rows={3}
                    defaultValue={editingProduct?.desc}
                    className="w-full bg-background border border-border rounded px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition resize-none" 
                    placeholder="Detailed product specifications…" 
                  />
                </div>
              </div>
              <div className="mt-8 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-background border border-border text-foreground font-bold py-3 rounded text-xs tracking-widest hover:bg-surface transition"
                >
                  CANCEL
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground font-bold py-3 rounded text-xs tracking-widest hover:brightness-110 transition"
                >
                  SAVE CHANGES
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
