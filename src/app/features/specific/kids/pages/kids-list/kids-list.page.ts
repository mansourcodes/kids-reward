import { Component, inject, OnInit } from '@angular/core';
import { KidsStore } from '../../state/kids.store';
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
import { CommonModule } from '@angular/common';
import { KidCardComponent } from '../../components/kid-card/kid-card.component';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';

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
export class KidsListPage implements OnInit {
  private kidsStore = inject(KidsStore);

  // Expose store properties directly
  kids = this.kidsStore.kids;
  loading = this.kidsStore.loading;

  constructor() {
    addIcons({ add });
  }

  async ngOnInit() {
    await this.kidsStore.loadKids();
  }
}
