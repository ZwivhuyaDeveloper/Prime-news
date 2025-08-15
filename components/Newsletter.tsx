import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/app/hooks/use-toast";


export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = /.+@.+\..+/.test(email);
    if (!ok) {
      toast({ title: "Please enter a valid email", description: "We use your email to send the weekly digest." });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEmail("");
      toast({
        title: "Subscribed!",
        description: "Welcome to Flux Gazette. You'll receive the next edition.",
      });
    }, 900);
  };

  return (
    <form onSubmit={submit} className="flex w-full max-w-xl items-center gap-2">
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
    </form>
  );
}
