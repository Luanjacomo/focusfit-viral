import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
});

// Types
export interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  level: number;
  xp: number;
  streak: number;
  last_activity_date: string | null;
  fitness_goal: string | null;
  experience_level: string | null;
  preferred_workout_time: string | null;
  workout_frequency: number | null;
  height: number | null;
  weight: number | null;
  age: number | null;
  gender: string | null;
  water_goal: number;
  sleep_goal: number;
  calorie_goal: number;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Workout {
  id: string;
  user_id: string;
  workout_type: string;
  duration: number;
  calories_burned: number | null;
  intensity: string | null;
  notes: string | null;
  completed_at: string;
  created_at: string;
}

export interface NutritionLog {
  id: string;
  user_id: string;
  meal_type: string;
  food_name: string;
  calories: number;
  protein: number | null;
  carbs: number | null;
  fats: number | null;
  logged_at: string;
  created_at: string;
}

export interface HydrationLog {
  id: string;
  user_id: string;
  amount_ml: number;
  logged_at: string;
  created_at: string;
}

export interface SleepLog {
  id: string;
  user_id: string;
  hours: number;
  quality: string | null;
  sleep_date: string;
  notes: string | null;
  created_at: string;
}

export interface Achievement {
  id: string;
  user_id: string;
  achievement_type: string;
  achievement_name: string;
  description: string | null;
  icon: string | null;
  unlocked_at: string;
  created_at: string;
}
