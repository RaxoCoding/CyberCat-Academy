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
            categories: {
                Row: {
                    id: number
                    name: string
                    created_at: string
                }
                Insert: {
                    id?: number
                    name: string
                    created_at?: string
                }
                Update: {
                    id?: number
                    name?: string
                    created_at?: string
                }
            }
            challenges: {
                Row: {
                    id: number
                    name: string
                    description: string
                    points: number
                    category_id: number
                    created_at: string
                }
                Insert: {
                    id?: number
                    name: string
                    description: string
                    points: number
                    category_id: number
                    created_at?: string
                }
                Update: {
                    id?: number
                    name?: string
                    description?: string
                    points?: number
                    category_id?: number
                    created_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}