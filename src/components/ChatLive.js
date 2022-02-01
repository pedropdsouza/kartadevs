import { createClient } from '@supabase/supabase-js'

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzUwMDg1NywiZXhwIjoxOTU5MDc2ODU3fQ.puCwUoHAzb-Ybk4OezivPMFg8iQmnthmbrZJ01RWnn8'
const SUPABASE_URL = 'https://mynqwberlcfnasgvugca.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ListeningChat(addMessage) {
    
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (respostaLive) => {
            addMessage(respostaLive.new);
        })
        .subscribe();
}

