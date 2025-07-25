import { Component, inject, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonSpinner,
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { KidsService } from '../../../core/services/kids.service';
import { AuthService } from '../../../core/services/auth.service';
import { KidCardComponent } from '../../../shared/components/kid-card/kid-card.component';

@Component({
  selector: 'app-kids-list',
  templateUrl: 'kids-list.page.html',
  styleUrls: ['kids-list.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon,
    RouterModule,
    IonGrid,
    IonRow,
    IonCol,
    IonSpinner,
    KidCardComponent,
  ],
})
export class KidsListPage implements OnInit {
  private kidsService = inject(KidsService);
  private authService = inject(AuthService);

  kids: any[] = [];
  loading = true;

  async ngOnInit() {
    try {
      const session = await this.authService.getSession();
      if (session?.data?.session?.user) {
        const user = session.data.session.user;
        this.kids = await this.kidsService.getKidsByUser(user.id);
      }
    } catch (error) {
      console.error('Error loading kids:', error);
    } finally {
      this.loading = false;
    }
  }
}
