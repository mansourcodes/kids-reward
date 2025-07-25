import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-kid-card',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './kid-card.component.html',
  styleUrls: ['./kid-card.component.scss'],
})
export class KidCardComponent {
  @Input() kid: any;
}
