import {supabase} from "@/config/supabase.js";

export const setTask = async (taskData) => {
  let {data, error} = await supabase
      .from('boards')
      .insert([taskData])
      .select()

  if (data) {
    console.log(data)
  }

  if (error) {
    console.log(error)
    return error.message
  }
}