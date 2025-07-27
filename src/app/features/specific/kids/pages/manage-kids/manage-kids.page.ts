import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-manage-kids',
  templateUrl: './manage-kids.page.html',
  styleUrls: ['./manage-kids.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ManageKidsPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
