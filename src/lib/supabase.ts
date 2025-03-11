import { createClient } from "@supabase/supabase-js";

// Use mock client when environment variables are not available
const createMockClient = () => {
  return {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null } }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: () => {} } },
      }),
      signUp: () => Promise.resolve({ data: null, error: null }),
      signInWithPassword: () => Promise.resolve({ data: null, error: null }),
      signOut: () => Promise.resolve(),
      resetPasswordForEmail: () => Promise.resolve({ data: null, error: null }),
      updateUser: () => Promise.resolve({ data: null, error: null }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({ data: null, error: null }),
        }),
      }),
      upsert: () => Promise.resolve({ error: null }),
    }),
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ error: null }),
      }),
    },
  };
};

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://placeholder-url.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-key";

// Create a real client if we have valid credentials, otherwise use mock
const isValidUrl =
  supabaseUrl && supabaseUrl !== "https://placeholder-url.supabase.co";
const isValidKey = supabaseAnonKey && supabaseAnonKey !== "placeholder-key";

export const supabase =
  isValidUrl && isValidKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : (createMockClient() as any);
