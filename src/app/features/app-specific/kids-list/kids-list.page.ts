import { Component, inject } from '@angular/core';
import { KidsStore } from '../../../core/kids.store';
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
import { CommonModule } from '@angular/common';

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
    CommonModule,
  ],
})
export class KidsListPage {
  private kidsStore = inject(KidsStore);

  // Expose store properties directly
  kids = this.kidsStore.kids;
  loading = this.kidsStore.loading;

  async ionViewWillEnter() {
    await this.kidsStore.loadKids();
  }
}
