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
                    name: string
                    description: string
                    points: number
                    category_id: number
                    created_at: string
                    flag: string
                }
                Insert: {
                    id?: number
                    name: string
                    description: string
                    points: number
                    category_id: number
                    created_at?: string
                    flag: string
                }
                Update: {
                    id?: number
                    name?: string
                    description?: string
                    points?: number
                    category_id?: number
                    created_at?: string
                    flag?: string
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