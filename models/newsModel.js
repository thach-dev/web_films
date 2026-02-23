import { supabase } from "../lib/supabaseClient.js";

export const NewsModel = {

  async getAll() {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async create(news) {
    const { data, error } = await supabase
      .from("news")
      .insert([news])
      .select();

    if (error) throw error;
    return data;
  }

};