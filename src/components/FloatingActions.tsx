import { MessageCircle, Phone, Mail } from "lucide-react";
export function FloatingActions() {
  const items = [
    { icon: MessageCircle, label: "WhatsApp", color: "bg-green-500", href: "https://wa.me/6281234567890" },
    { icon: Phone, label: "Telepon", color: "bg-primary text-primary-foreground", href: "tel:+6281234567890" },
    { icon: Mail, label: "Email", color: "bg-primary text-primary-foreground", href: "mailto:info@heavyparts.co.id" },
  ];
  return (
    <div className="fixed right-0 top-1/3 z-40 flex flex-col gap-px">
      {items.map((it, i) => (
        <a key={i} href={it.href} target={it.label === "WhatsApp" ? "_blank" : undefined} className={`${it.color} px-3 py-3 flex flex-col items-center gap-1 text-[10px] font-semibold w-16 rounded-l hover:brightness-110 transition`}>
          <it.icon className="w-5 h-5" />
          {it.label}
        </a>
      ))}
    </div>
  );
}
