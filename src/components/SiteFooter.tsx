import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-6 py-14 grid md:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
        <div>
          <h3 className="font-display text-lg mb-4">ABOUT US</h3>
          <div className="w-10 h-0.5 bg-primary mb-4" />
          <p className="text-muted-foreground leading-relaxed">
            DarrinTek is a trusted heavy equipment spare parts supplier in Indonesia. We provide high-quality products at competitive prices and best service to support your equipment's performance.
          </p>
          <button className="mt-5 border border-primary text-primary text-xs font-bold px-5 py-2.5 rounded tracking-wider hover:bg-primary hover:text-primary-foreground transition">
            READ MORE
          </button>
        </div>
        <div>
          <h3 className="font-display text-lg mb-4">QUICK LINKS</h3>
          <div className="w-10 h-0.5 bg-primary mb-4" />
          <ul className="space-y-2.5 text-muted-foreground">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/tentang" className="hover:text-primary">About Us</Link></li>
            <li><Link to="/produk" className="hover:text-primary">Product Catalog</Link></li>
            <li><Link to="/brand" className="hover:text-primary">Brands</Link></li>
            <li><Link to="/layanan" className="hover:text-primary">Services</Link></li>
            <li><Link to="/kontak" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-display text-lg mb-4">CONTACT US</h3>
          <div className="w-10 h-0.5 bg-primary mb-4" />
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex gap-3"><MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />Jababeka Ecommerce Digital Hub Blok WW5 C6,<br/>Jababeka 2 Cikarang-Bekasi</li>
            <li><a href="tel:+6281234567890" className="flex gap-3 items-center hover:text-primary"><Phone className="w-4 h-4 text-primary shrink-0" />+62 812 3456 7890</a></li>
            <li><a href="mailto:admin@darrintek.com" className="flex gap-3 items-center hover:text-primary"><Mail className="w-4 h-4 text-primary shrink-0" />admin@darrintek.com</a></li>
            <li className="flex gap-3 items-start"><Clock className="w-4 h-4 text-primary mt-0.5 shrink-0" /><span>Monday - Saturday<br/>08:00 - 17:00 WIB</span></li>
          </ul>
        </div>
        <div>
          <h3 className="font-display text-lg mb-4">NEWSLETTER</h3>
          <div className="w-10 h-0.5 bg-primary mb-4" />
          <p className="text-muted-foreground mb-4">Get the latest information and attractive promos from us.</p>
          <form className="flex">
            <input type="email" placeholder="Enter your email" className="flex-1 bg-surface border border-border rounded-l px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
            <button className="bg-primary text-primary-foreground px-4 rounded-r font-bold">→</button>
          </form>
          <h4 className="font-display mt-6 mb-3">FOLLOW US</h4>
          <div className="flex gap-2">
            {[Facebook,Instagram,Youtube,Linkedin].map((Icon,i)=>(
              <a key={i} href="#" className="w-9 h-9 rounded-full border border-border grid place-items-center hover:border-primary hover:text-primary transition"><Icon className="w-4 h-4"/></a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container mx-auto px-6 py-5 flex flex-wrap gap-3 justify-between text-xs text-muted-foreground">
          <p>© 2024 DarrinTek. All Rights Reserved.</p>
          <div className="flex gap-6"><a href="#" className="hover:text-primary">Kebijakan Privasi</a><a href="#" className="hover:text-primary">Syarat & Ketentuan</a></div>
        </div>
      </div>
    </footer>
  );
}
