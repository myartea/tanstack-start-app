import engine from "@/assets/cat-engine.jpg";
import hydraulic from "@/assets/cat-hydraulic.jpg";
import undercarriage from "@/assets/cat-undercarriage.jpg";
import filter from "@/assets/cat-filter.jpg";
import electrical from "@/assets/cat-electrical.jpg";
import oil from "@/assets/cat-oil.jpg";

export type Category = {
  slug: string;
  name: string;
  desc: string;
  img: string;
  count: string;
};

export const categories: Category[] = [
  { slug: "engine-parts", name: "ENGINE PARTS", desc: "Original & aftermarket engine components for various heavy equipment brands.", img: engine, count: "120+ Products" },
  { slug: "hydraulic-parts", name: "HYDRAULIC PARTS", desc: "Pump, valve, cylinder & hose for heavy equipment hydraulic systems.", img: hydraulic, count: "150+ Products" },
  { slug: "undercarriage", name: "UNDERCARRIAGE", desc: "Precision track roller, idler, sprocket, and track shoe.", img: undercarriage, count: "100+ Products" },
  { slug: "filter", name: "FILTER", desc: "Air, oil, fuel & hydraulic filters from trusted brands.", img: filter, count: "80+ Products" },
  { slug: "electrical-parts", name: "ELECTRICAL PARTS", desc: "Alternator, starter motor, sensors, and electrical components.", img: electrical, count: "90+ Products" },
  { slug: "oil-grease", name: "OIL & GREASE", desc: "Engine oil, transmission oil & industrial grade heavy equipment grease.", img: oil, count: "60+ Products" },
];

export type Product = {
  slug: string;
  name: string;
  category: string; // slug
  brand: string;
  partNumber: string;
  price: string;
  img: string;
  desc: string;
  condition?: string;
  weight?: string;
  origin?: string;
};

export const products: Product[] = [
  { 
    slug: "hydraulic-pump-pc200-8", 
    name: "Hydraulic Pump Assy Komatsu PC200-8", 
    category: "hydraulic-parts", 
    brand: "KOMATSU", 
    partNumber: "708-2L-00500", 
    price: "Contact Us", 
    img: hydraulic, 
    desc: "Original hydraulic main pump assy for Komatsu PC200-8 excavator. Optimal performance, high durability.",
    condition: "New (Original)",
    weight: "85 KG",
    origin: "Japan"
  },
  { 
    slug: "water-pump-cat-c13", 
    name: "Water Pump Assy Caterpillar C13", 
    category: "engine-parts", 
    brand: "CAT", 
    partNumber: "352-2117", 
    price: "Contact Us", 
    img: engine, 
    desc: "Water pump assembly for Caterpillar C13 engine. Maximum cooling circulation.",
    condition: "New (Aftermarket)",
    weight: "12 KG",
    origin: "USA"
  },
  { 
    slug: "track-roller-zx200", 
    name: "Track Roller Hitachi ZX200-5G", 
    category: "undercarriage", 
    brand: "HITACHI", 
    partNumber: "9233688", 
    price: "Contact Us", 
    img: undercarriage, 
    desc: "Heavy duty track roller for Hitachi ZX200-5G. Withstands high loads & rough terrain.",
    condition: "New (High Quality)",
    weight: "35 KG",
    origin: "Japan"
  },
  { 
    slug: "hydraulic-filter-p550588", 
    name: "Hydraulic Oil Filter Donaldson P550588", 
    category: "filter", 
    brand: "DONALDSON", 
    partNumber: "P550588", 
    price: "Contact Us", 
    img: filter, 
    desc: "High-efficiency Donaldson hydraulic oil filter for various heavy equipment applications.",
    condition: "New (Original)",
    weight: "1.5 KG",
    origin: "USA"
  },
  { 
    slug: "alternator-pc300-7", 
    name: "Alternator 24V 60A Komatsu PC300-7", 
    category: "electrical-parts", 
    brand: "KOMATSU", 
    partNumber: "600-825-3251", 
    price: "Contact Us", 
    img: electrical, 
    desc: "24V 60A Alternator for Komatsu PC300-7. Stable output, compatible with original specs.",
    condition: "New (Original)",
    weight: "8 KG",
    origin: "Japan"
  },
  { 
    slug: "engine-oil-15w40", 
    name: "Engine Oil SAE 15W-40 CI-4 Drum", 
    category: "oil-grease", 
    brand: "SHELL", 
    partNumber: "RIMULA-R4X", 
    price: "Contact Us", 
    img: oil, 
    desc: "Premium diesel engine oil SAE 15W-40 CI-4 for maximum performance & protection.",
    condition: "New",
    weight: "209 L / 180 KG",
    origin: "Singapore"
  },
  { 
    slug: "hydraulic-cylinder-pc200", 
    name: "Hydraulic Cylinder Bucket PC200-8", 
    category: "hydraulic-parts", 
    brand: "KOMATSU", 
    partNumber: "707-01-XZ890", 
    price: "Contact Us", 
    img: hydraulic, 
    desc: "Bucket cylinder for PC200-8, comes with a complete seal kit.",
    condition: "New (Original)",
    weight: "120 KG",
    origin: "Japan"
  },
  { 
    slug: "fuel-filter-cat", 
    name: "Fuel Filter Caterpillar 1R-0750", 
    category: "filter", 
    brand: "CAT", 
    partNumber: "1R-0750", 
    price: "Contact Us", 
    img: filter, 
    desc: "Advanced efficiency fuel filter for Caterpillar engines.",
    condition: "New (Original)",
    weight: "1.2 KG",
    origin: "USA"
  },
];
