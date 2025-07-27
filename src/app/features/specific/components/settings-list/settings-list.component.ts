import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonItem,
  IonIcon,
  IonLabel,
  IonItemGroup,
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.scss'],
  imports: [RouterModule, IonItem, IonIcon, IonLabel, IonItemGroup],
})
export class SettingsListComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
