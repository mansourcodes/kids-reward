import { Component, inject, OnInit, effect } from '@angular/core';
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
  private initialLoadDone = false;

  constructor() {
    // Setup effect to reload kids when signal changes
    effect(() => {
      // Access the signal to establish dependency
      const count = this.kidsService.kidAdded();

      // Skip the initial effect run
      if (this.initialLoadDone) {
        this.loadKids();
      }
    });
  }
  private kidsService = inject(KidsService);
  private authService = inject(AuthService);

  kids: any[] = [];
  loading = true;

  async ngOnInit() {
    await this.loadKids();
    this.initialLoadDone = true;

    // Trigger an initial signal update to establish the dependency
    this.kidsService.kidAdded();
  }

  private async loadKids() {
    this.loading = true;
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
