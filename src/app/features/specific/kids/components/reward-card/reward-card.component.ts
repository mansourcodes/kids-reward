import { Component, Input, OnInit } from '@angular/core';
import { IonChip, IonLabel } from '@ionic/angular/standalone';
import { Reward } from 'src/app/features/specific/kids/services/reward.service';

@Component({
  selector: 'app-reward-card',
  templateUrl: './reward-card.component.html',
  styleUrls: ['./reward-card.component.scss'],
  imports: [IonChip, IonLabel],
})
export class RewardCardComponent implements OnInit {
  @Input() reward: Reward = {} as Reward;

  constructor() {}

  ngOnInit() {}
}
