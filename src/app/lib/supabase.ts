import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://xvoyqpuupznpcfxoguha.supabase.co" as string;
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2b3lxcHV1cHpucGNmeG9ndWhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NTQyOTUsImV4cCI6MjA2MzMzMDI5NX0.507Us10Zn_MZ9mLMELf9kORgjByE91DUq5tkDqbVfCI" as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);