import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, User } from "lucide-react";
import { login } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Admin Login — DarrinTek" }] }),
  component: LoginPage,
});

function LoginPage() {
  const nav = useNavigate();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(u, p)) nav({ to: "/dashboard" });
    else setErr("Invalid username or password");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background text-foreground">
      <div className="hidden lg:flex relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(0.82_0.17_85/0.2),transparent_60%)]" />
        <div className="relative p-14 flex flex-col justify-between w-full">
          <Link to="/" className="font-display text-3xl font-bold">
            <span className="text-foreground">DARRIN</span><span className="text-primary">TEK</span>
          </Link>
          <div>
            <h2 className="font-display text-5xl leading-tight">ADMIN PORTAL<br/><span className="text-primary">DARRINTEK</span></h2>
            <p className="mt-4 text-muted-foreground max-w-md">Manage products, orders, and inquiries from one centralized dashboard.</p>
          </div>
          <p className="text-xs text-muted-foreground">© 2024 DarrinTek. All rights reserved.</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-8">
        <form onSubmit={submit} className="w-full max-w-md bg-surface border border-border rounded-xl p-8">
          <h1 className="font-display text-3xl">SIGN IN</h1>
          <div className="w-12 h-1 bg-primary mt-2" />
          <p className="text-muted-foreground text-sm mt-4">Please log in with your admin account.</p>

          <label className="block mt-6 text-xs font-semibold tracking-wider text-muted-foreground">USERNAME</label>
          <div className="relative mt-2">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={u} onChange={(e)=>setU(e.target.value)} className="w-full bg-background border border-border rounded pl-10 pr-3 py-3 text-sm focus:outline-none focus:border-primary" placeholder="admindtu" />
          </div>

          <label className="block mt-4 text-xs font-semibold tracking-wider text-muted-foreground">PASSWORD</label>
          <div className="relative mt-2">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="password" value={p} onChange={(e)=>setP(e.target.value)} className="w-full bg-background border border-border rounded pl-10 pr-3 py-3 text-sm focus:outline-none focus:border-primary" placeholder="••••••••" />
          </div>

          {err && <p className="mt-4 text-sm text-destructive">{err}</p>}

          <button className="mt-6 w-full bg-primary text-primary-foreground font-bold py-3 rounded tracking-wider hover:brightness-110 transition">SIGN IN</button>
          <Link to="/" className="block mt-4 text-center text-sm text-muted-foreground hover:text-primary">← Back to home</Link>
        </form>
      </div>
    </div>
  );
}
