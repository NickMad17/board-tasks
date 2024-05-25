import {supabase} from "@/config/supabase.js";

export const updateTask = async (id, updates) => {
  const {data, error} = await supabase
      .from('boards')
      .update(...updates)
      .eq('id', id)
      .select()

  if (data) {
    console.log(data)
  }

  if (error) {
    console.log(error)
  }
}