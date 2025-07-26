import {
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
} from '@angular/core';
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
import { KidCardComponent } from '../../../shared/components/kid-card/kid-card.component';
import { kidsStore } from '../../../core/store.signal';

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
export class KidsListPage {
  loading = true;
  kids = computed(() => kidsStore.store().kids);

  constructor() {
    // Load initial data
    this.loadKids();

    // Watch for changes
    effect(() => {
      // Access the signal to establish dependency
      const kids = kidsStore.store().kids;
      if (kids.length > 0) {
        this.loading = false;
      }
    });
  }

  async loadKids() {
    this.loading = true;
    try {
      await kidsStore.loadKids();
    } catch (error) {
      console.error('Error loading kids:', error);
      this.loading = false;
    }
  }
}
