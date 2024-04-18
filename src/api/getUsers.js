import {supabase} from "@/config/supabase.js";

export const getUsers = async () => {
  let {data, error} = await supabase
      .from('users')
      .select('*')

  if (data) {
    console.log(data, 'users')
    return data
  }

  if (error) {
    console.log(error)
    return error.message
  }
}