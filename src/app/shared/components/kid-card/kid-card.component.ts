import { Component, Input, OnInit, effect, inject } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kid-card',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './kid-card.component.html',
  styleUrls: ['./kid-card.component.scss'],
})
export class KidCardComponent {
  @Input() kid: any;
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  getAvatarUrl(name: string): SafeUrl {
    const encodedName = encodeURIComponent(name);
    const url = `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodedName}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  addReward() {
    this.router.navigate(['/add-reward', this.kid.id]);
  }
}
