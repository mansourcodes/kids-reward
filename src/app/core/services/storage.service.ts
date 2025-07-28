import { Injectable } from '@angular/core';
import { supabase } from '../supabase/supabase.client';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private errorHandler = inject(ErrorHandlerService);

  async uploadImage(
    file: File,
    bucketName: string,
    userId: string
  ): Promise<string | null> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Math.random()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        cacheControl: '3600',
      });

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    return urlData?.publicUrl ?? null;
  }

  async deleteImage(bucketName: string, fileName: string) {
    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .remove([fileName]);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }
}
