import {supabase} from "@/config/supabase.js";

export const getUser = async (id) => {
  let {data, error} = await supabase
      .from('users')
      .select()
      .eq('id', id)

  if (data) {
    console.log(data, 'user')
    return data
  }

  if (error) {
    console.log(error)
    return error.message
  }
}