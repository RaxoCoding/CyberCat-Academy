export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json }
    | Json[]

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string
                    username: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    username: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    username?: string
                    created_at?: string
                }
            }
            categories: {
                Row: {
                    id: number
                    name: string
                    created_at: string
                    icon: string
                    description: string
                }
                Insert: {
                    id?: number
                    name: string
                    created_at?: string
                    icon?: string
                    description?: string
                }
                Update: {
                    id?: number
                    name?: string
                    created_at?: string
                    icon?: string
                    description?: string
                }
            }
            challenges: {
                Row: {
                    id: number
                    created_at: string
                    description: string
                    name: string
                    points: number
                    category_id: number
                    flag: string
                    url: string | null
                    writeups: string[] | null
                    tags: string[] | null
                    ressources: string[] | null
                    author_id: string | null
                    files: string[] | null
                }
                Insert: {
                    id?: number
                    created_at?: string
                    description?: string
                    name: string
                    points: number
                    category_id: number
                    flag?: string
                    url?: string | null
                    writeups?: string[] | null
                    tags?: string[] | null
                    ressources?: string[] | null
                    author_id?: string | null
                    files?: string[] | null
                }
                Update: {
                    id?: number
                    created_at?: string
                    description?: string
                    name?: string
                    points?: number
                    category_id?: number
                    flag?: string
                    url?: string | null
                    writeups?: string[] | null
                    tags?: string[] | null
                    ressources?: string[] | null
                    author_id?: string | null
                    files?: string[] | null
                }
            }
            users_link_challenges: {
                Row: {
                    user_id: string
                    challenge_id: number
                    created_at: string
                }
                Insert: {
                    user_id: string
                    challenge_id: number
                    created_at?: string
                }
                Update: {
                    user_id?: string
                    challenge_id?: number
                    created_at?: string
                }
            }
        }
        Views: {
            public_challenges: {
                Row: {
                    id: number
                    name: string
                    description: string
                    created_at: string
                    points: number
                    category_id: number
                    url: string | null
                    writeups: string[] | null
                    ressources: string[] | null
                    files: string[] | null
                    tags: string[] | null
                    author_id: string | null
                }
                Insert: never
                Update: never
            }
            user_scores: {
                Row: {
                    user_id: string
                    username: string
                    total_score: number
                    challenges_solved: number
                    created_at: string
                }
                Insert: never
                Update: never
            }
        }
        Functions: {
            verify_flag: {
                Args: { challenge_id: number; submitted_flag: string }
                Returns: { id: number }[]
            }
            add_solved_challenge: {
                Args: { p_user_id: string; p_challenge_id: number; p_submitted_flag: string }
                Returns: boolean
            }
            delete_user: {
                Args: Record<PropertyKey, never>
                Returns: void
            }
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}