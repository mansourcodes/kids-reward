import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { cogOutline } from 'ionicons/icons';

@Component({
  selector: 'app-more-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  imports: [IonicModule, RouterModule],
  standalone: true,
})
export class DashboardPage implements OnInit {
  constructor() {
    addIcons({ cogOutline });
  }

  ngOnInit() {}
}
