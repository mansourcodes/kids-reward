import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-kids-manage',
  templateUrl: './kids-manage.page.html',
  styleUrls: ['./kids-manage.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class KidsManagePage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
