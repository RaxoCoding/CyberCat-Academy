import { Database as GenDatabase, Json as GenJson } from "./supabase.gen";

export type Json = GenJson;

export type Database = GenDatabase & {
	public: {
    Views: {
      public_challenges: {
        Row: {
          id: number
        }
      }
      user_scores: {
        Row: {
          total_score: number
          username: string
        }
      }
    }
  }
}