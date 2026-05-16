import { products as initialProducts, type Product } from "./catalog";

const DB_KEY = "darrintek_products";
const NEWS_KEY = "darrintek_news";

export type News = {
  slug: string;
  title: string;
  content: string;
  date: string;
  img: string;
  author: string;
};

const initialNews: News[] = [
  {
    slug: "ekspansi-layanan-kalimantan",
    title: "DarrinTek Ekspansi Layanan ke Wilayah Kalimantan",
    content: "Untuk memenuhi kebutuhan suku cadang alat berat di sektor pertambangan, DarrinTek kini hadir dengan layanan pengiriman prioritas ke seluruh wilayah Kalimantan.",
    date: new Date().toISOString(),
    img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=800",
    author: "Admin"
  },
  {
    slug: "tips-perawatan-hidrolik",
    title: "Tips Perawatan Sistem Hidrolik Ekskavator",
    content: "Sistem hidrolik adalah jantung dari alat berat. Berikut adalah 5 tips menjaga performa pompa hidrolik agar tetap optimal dan tahan lama.",
    date: new Date().toISOString(),
    img: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=800",
    author: "Tim Teknis"
  }
];

export function getProducts(): Product[] {
  if (typeof window === "undefined") return initialProducts;
  const saved = localStorage.getItem(DB_KEY);
  if (!saved) {
    localStorage.setItem(DB_KEY, JSON.stringify(initialProducts));
    return initialProducts;
  }
  return JSON.parse(saved);
}

export function saveProducts(products: Product[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(DB_KEY, JSON.stringify(products));
  }
}

export function addProduct(product: Product) {
  const products = getProducts();
  const updated = [...products, product];
  saveProducts(updated);
  return updated;
}

export function updateProduct(slug: string, data: Partial<Product>) {
  const products = getProducts();
  const updated = products.map(p => p.slug === slug ? { ...p, ...data } : p);
  saveProducts(updated);
  return updated;
}

export function deleteProduct(slug: string) {
  const products = getProducts();
  const updated = products.filter(p => p.slug !== slug);
  saveProducts(updated);
  return updated;
}

export function getNews(): News[] {
  if (typeof window === "undefined") return initialNews;
  const saved = localStorage.getItem(NEWS_KEY);
  if (!saved) {
    localStorage.setItem(NEWS_KEY, JSON.stringify(initialNews));
    return initialNews;
  }
  return JSON.parse(saved);
}

export function saveNews(news: News[]) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(NEWS_KEY, JSON.stringify(news));
    } catch (e) {
      if (e instanceof DOMException && e.name === "QuotaExceededError") {
        alert("Penyimpanan penuh! Mohon hapus beberapa berita lama atau gunakan gambar yang lebih kecil.");
      } else {
        throw e;
      }
    }
  }
}

export function compressImage(base64: string, maxWidth = 800): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.7));
    };
  });
}
