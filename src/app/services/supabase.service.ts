// supabase.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://fhpvhxxyvsjzrgkjuxtn.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZocHZoeHh5dnNqenJna2p1eHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyMzc1NTUsImV4cCI6MjA4ODgxMzU1NX0.UVrNNNJ85RsilT8etJfL1LECHekyaFPHjwQBynIlaMM'
    );
  }

  async uploadImage(file: File): Promise<string> {
    const fileName = `${Date.now()}_${file.name}`;

    const { data, error } = await this.supabase.storage
      .from('food-images')
      .upload(fileName, file);

    if (error) throw error;

    // Get public URL
    const { data: urlData } = this.supabase.storage
      .from('food-images')
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  }
}
