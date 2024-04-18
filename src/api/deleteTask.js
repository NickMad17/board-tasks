import {supabase} from "@/config/supabase.js";

export const deleteTask = async (id) => {
  let {data, error} = await supabase
      .from('boards')
      .delete()
      .eq('id', id)

  if (data) {
    console.log(data)
    return data
  }

  if (error) {
    console.log(error)
    return error.message
  }
}