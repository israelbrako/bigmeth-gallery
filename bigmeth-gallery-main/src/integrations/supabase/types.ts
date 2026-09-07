export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          booking_type: string
          created_at: string
          email: string | null
          full_name: string
          id: string
          institution_id: string | null
          institution_other: string | null
          notes: string | null
          number_of_people: number | null
          phone: string
          preferred_date: string | null
          preferred_location: string | null
          programme: string | null
          reference: string
          reference_image_url: string | null
          session_type: string | null
          status: string
          year_level: string | null
        }
        Insert: {
          booking_type: string
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          institution_id?: string | null
          institution_other?: string | null
          notes?: string | null
          number_of_people?: number | null
          phone: string
          preferred_date?: string | null
          preferred_location?: string | null
          programme?: string | null
          reference?: string
          reference_image_url?: string | null
          session_type?: string | null
          status?: string
          year_level?: string | null
        }
        Update: {
          booking_type?: string
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          institution_id?: string | null
          institution_other?: string | null
          notes?: string | null
          number_of_people?: number | null
          phone?: string
          preferred_date?: string | null
          preferred_location?: string | null
          programme?: string | null
          reference?: string
          reference_image_url?: string | null
          session_type?: string | null
          status?: string
          year_level?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
          sort_order: number
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
          sort_order?: number
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      institutions: {
        Row: {
          active: boolean
          created_at: string
          id: string
          name: string
          short_name: string | null
          sort_order: number
        }
        Insert: {
          active?: boolean
          created_at?: string
          id?: string
          name: string
          short_name?: string | null
          sort_order?: number
        }
        Update: {
          active?: boolean
          created_at?: string
          id?: string
          name?: string
          short_name?: string | null
          sort_order?: number
        }
        Relationships: []
      }
      portfolio_images: {
        Row: {
          alt_text: string | null
          category_id: string | null
          created_at: string
          description: string | null
          featured: boolean
          id: string
          image_url: string
          is_hero: boolean
          orientation: string
          published: boolean
          sort_order: number
          title: string
        }
        Insert: {
          alt_text?: string | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean
          id?: string
          image_url: string
          is_hero?: boolean
          orientation?: string
          published?: boolean
          sort_order?: number
          title: string
        }
        Update: {
          alt_text?: string | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean
          id?: string
          image_url?: string
          is_hero?: boolean
          orientation?: string
          published?: boolean
          sort_order?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_images_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          sort_order: number
          title: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          sort_order?: number
          title: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          sort_order?: number
          title?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          about_image: string | null
          biography: string | null
          brand_name: string
          email: string | null
          footer_text: string | null
          hero_image: string | null
          id: number
          instagram_url: string | null
          location: string | null
          philosophy: string | null
          phone: string | null
          tagline: string
          updated_at: string
          whatsapp: string | null
          whatsapp_secondary: string | null
        }
        Insert: {
          about_image?: string | null
          biography?: string | null
          brand_name?: string
          email?: string | null
          footer_text?: string | null
          hero_image?: string | null
          id?: number
          instagram_url?: string | null
          location?: string | null
          philosophy?: string | null
          phone?: string | null
          tagline?: string
          updated_at?: string
          whatsapp?: string | null
          whatsapp_secondary?: string | null
        }
        Update: {
          about_image?: string | null
          biography?: string | null
          brand_name?: string
          email?: string | null
          footer_text?: string | null
          hero_image?: string | null
          id?: number
          instagram_url?: string | null
          location?: string | null
          philosophy?: string | null
          phone?: string | null
          tagline?: string
          updated_at?: string
          whatsapp?: string | null
          whatsapp_secondary?: string | null
        }
        Relationships: []
      }
      story_images: {
        Row: {
          caption: string | null
          created_at: string
          id: string
          image_url: string
          layout: string
          sort_order: number
          story_id: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id?: string
          image_url: string
          layout?: string
          sort_order?: number
          story_id: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: string
          image_url?: string
          layout?: string
          sort_order?: number
          story_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "story_images_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "visual_stories"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          client_name: string
          created_at: string
          id: string
          image_url: string | null
          institution: string | null
          published: boolean
          quote: string
          service: string | null
          sort_order: number
        }
        Insert: {
          client_name: string
          created_at?: string
          id?: string
          image_url?: string | null
          institution?: string | null
          published?: boolean
          quote: string
          service?: string | null
          sort_order?: number
        }
        Update: {
          client_name?: string
          created_at?: string
          id?: string
          image_url?: string | null
          institution?: string | null
          published?: boolean
          quote?: string
          service?: string | null
          sort_order?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      visual_stories: {
        Row: {
          category: string | null
          cover_image: string | null
          created_at: string
          description: string | null
          id: string
          location: string | null
          notes: string | null
          published: boolean
          slug: string
          sort_order: number
          story_date: string | null
          title: string
        }
        Insert: {
          category?: string | null
          cover_image?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          published?: boolean
          slug: string
          sort_order?: number
          story_date?: string | null
          title: string
        }
        Update: {
          category?: string | null
          cover_image?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          published?: boolean
          slug?: string
          sort_order?: number
          story_date?: string | null
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin"],
    },
  },
} as const
