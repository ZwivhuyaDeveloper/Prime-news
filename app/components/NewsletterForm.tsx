"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = /.+@.+\..+/.test(email);
    if (!ok) {
      setMsg("Please enter a valid email.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEmail("");
      setMsg("Subscribed! You'll receive the next edition.");
    }, 900);
  };

  return (
    <form onSubmit={submit} className="flex w-full max-w-xl flex-col items-center gap-2 sm:flex-row">
      <Input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Email address"
        className="h-11"
        required
      />
      <Button type="submit" className="brand" variant="default" size="lg" disabled={loading}>
        {loading ? "Joining…" : "Join Newsletter"}
      </Button>
      {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
    </form>
  );
}
