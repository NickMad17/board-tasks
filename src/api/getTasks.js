import {supabase} from "@/config/supabase.js";

export const getTasks = async () => {
  let {data, error} = await supabase
      .from('boards')
      .select("*")

  if (data) {
    console.log(data, 'tasks')
    return data
  }

  if (error) {
    console.log(error)
    return error.message
  }
}