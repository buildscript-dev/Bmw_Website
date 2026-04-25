import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Loader2, LogOut, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Profile {
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
}

interface FavRow {
  id: string;
  car_id: string;
  car_name: string;
  car_image: string | null;
  car_price: string | null;
}

const Account = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile>({ display_name: "", avatar_url: "", bio: "" });
  const [favs, setFavs] = useState<FavRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth", { replace: true });
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [{ data: p }, { data: f }] = await Promise.all([
        supabase.from("profiles").select("display_name, avatar_url, bio").eq("id", user.id).maybeSingle(),
        supabase.from("favorites").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      ]);
      if (p) setProfile(p);
      if (f) setFavs(f as FavRow[]);
      setLoading(false);
    })();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update(profile).eq("id", user.id);
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("Profile saved");
  };

  const removeFav = async (id: string) => {
    if (!user) return;
    await supabase.from("favorites").delete().eq("id", id);
    setFavs((f) => f.filter((x) => x.id !== id));
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-background">
        <Loader2 className="size-8 animate-spin text-accent" />
      </div>
    );
  }
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-24 container">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="size-4" /> Atelier
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">─ Account</div>
          <h1 className="font-display text-5xl md:text-7xl font-medium tracking-tight mb-2">
            Hello, <span className="font-serif-display text-gradient-accent">{profile.display_name || "Member"}</span>
          </h1>
          <p className="text-muted-foreground">Manage your profile and saved cars.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10 mt-16">
          {/* Profile */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 p-8 rounded-3xl bg-secondary"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="size-16 rounded-full bg-primary text-primary-foreground grid place-items-center text-xl font-display font-bold">
                {(profile.display_name || user.email || "?")[0]?.toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium truncate">{user.email}</div>
                <div className="text-xs text-muted-foreground">Member since {new Date(user.created_at).toLocaleDateString()}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-xs font-mono uppercase tracking-wider">Display name</Label>
                <Input
                  value={profile.display_name ?? ""}
                  onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
                  className="rounded-2xl mt-1.5"
                />
              </div>
              <div>
                <Label className="text-xs font-mono uppercase tracking-wider">Avatar URL</Label>
                <Input
                  value={profile.avatar_url ?? ""}
                  onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
                  placeholder="https://..."
                  className="rounded-2xl mt-1.5"
                />
              </div>
              <div>
                <Label className="text-xs font-mono uppercase tracking-wider">Bio</Label>
                <Textarea
                  value={profile.bio ?? ""}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="Tell us about your collection..."
                  className="rounded-2xl mt-1.5 min-h-[100px]"
                />
              </div>
              <Button onClick={handleSave} disabled={saving} className="w-full rounded-full">
                {saving ? <Loader2 className="size-4 animate-spin" /> : (<><Save className="size-4 mr-2" /> Save profile</>)}
              </Button>
              <Button onClick={signOut} variant="outline" className="w-full rounded-full">
                <LogOut className="size-4 mr-2" /> Sign out
              </Button>
            </div>
          </motion.section>

          {/* Favorites */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="font-display text-3xl font-medium">Saved cars</h2>
              <span className="font-mono text-xs text-muted-foreground">{favs.length} item{favs.length === 1 ? "" : "s"}</span>
            </div>

            {favs.length === 0 ? (
              <div className="p-12 rounded-3xl bg-secondary text-center">
                <Heart className="size-8 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No saved cars yet.</p>
                <Link to="/" className="inline-block mt-4 text-accent hover:underline">Browse the collection →</Link>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {favs.map((f) => (
                  <motion.div
                    key={f.id}
                    layout
                    className="group relative overflow-hidden rounded-2xl bg-secondary aspect-[4/3]"
                  >
                    {f.car_image && (
                      <img src={f.car_image} alt={f.car_name} className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105" />
                    )}
                    <div className="absolute bottom-0 inset-x-0 p-4 flex items-end justify-between bg-gradient-to-t from-secondary via-secondary/80 to-transparent">
                      <div>
                        <div className="font-display text-xl font-medium">{f.car_name}</div>
                        <div className="text-xs text-muted-foreground font-mono">{f.car_price}</div>
                      </div>
                      <button
                        onClick={() => removeFav(f.id)}
                        className="size-9 rounded-full bg-background/80 hover:bg-destructive hover:text-destructive-foreground grid place-items-center transition-colors"
                        aria-label="Remove"
                      >
                        <Heart className="size-4 fill-accent stroke-accent" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default Account;
