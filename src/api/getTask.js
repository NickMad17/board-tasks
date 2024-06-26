import {supabase} from "@/config/supabase.js";

export const getTask = async (id) => {
  let {data, error} = await supabase
      .from('boards')
      .select()
      .eq('id', id)

  if (data) {
    console.log(data, 'task')
    return data
  }

  if (error) {
    console.log(error)
    return error.message
  }
}