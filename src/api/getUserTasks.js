import {supabase} from "@/config/supabase.js";

export const getUserTasks = async (id) => {
  let {data, error} = await supabase
      .from('boards')
      .select("*")
      .eq('assigned_id', id)


  if (data) {
    console.log(data, 'user tasks')
    return data
  }

  if (error) {
    console.log(error)
    return error.message
  }
}