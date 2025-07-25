import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../../shared/components/explore-container/explore-container.component';
import { RouterModule } from '@angular/router';

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
    ExploreContainerComponent,
    IonFab,
    IonFabButton,
    IonIcon,
    RouterModule,
  ],
})
export class KidsListPage {
  constructor() {}
}
