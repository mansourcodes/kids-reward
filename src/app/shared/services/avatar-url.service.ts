import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class AvatarUrlService {
  constructor(private sanitizer: DomSanitizer) {}

  getAvatarUrl(url: string | null, name: string): SafeUrl {
    if (url) {
      return url;
    }
    const encodedName = encodeURIComponent(name);
    const random_avatar_url = `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodedName}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(random_avatar_url);
  }
}
