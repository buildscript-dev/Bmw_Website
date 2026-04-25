import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export interface Car {
  id: string;
  name: string;
  image: string;
  price: string;
}

export const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!user) {
      setFavorites([]);
      return;
    }
    setLoading(true);
    const { data } = await supabase.from("favorites").select("car_id").eq("user_id", user.id);
    setFavorites(data?.map((d) => d.car_id) ?? []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const toggle = async (car: Car) => {
    if (!user) {
      toast.error("Sign in to save favorites");
      return;
    }
    const isFav = favorites.includes(car.id);
    if (isFav) {
      await supabase.from("favorites").delete().eq("user_id", user.id).eq("car_id", car.id);
      setFavorites((f) => f.filter((id) => id !== car.id));
      toast(`Removed ${car.name}`);
    } else {
      await supabase.from("favorites").insert({
        user_id: user.id,
        car_id: car.id,
        car_name: car.name,
        car_image: car.image,
        car_price: car.price,
      });
      setFavorites((f) => [...f, car.id]);
      toast.success(`Saved ${car.name}`);
    }
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return { favorites, isFavorite, toggle, loading, refresh };
};
