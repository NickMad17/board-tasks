import {createClient} from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_APP_SUPARBASE_URL;
const supabaseKey = import.meta.env.VITE_APP_SUPARBASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey)
