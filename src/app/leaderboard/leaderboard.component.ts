import { Component } from '@angular/core';
import {QuestionsService} from "../services/admin/questions.service";
import {LeaderboardService} from "../services/guest/leaderboard.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent {

  leaderboard: any[] = [];
  error: string = '';

  constructor(private leaderboardService: LeaderboardService) {
  }

  ngOnInit() {
    this.leaderboardService.fetchLeaderboard().subscribe( {
        next: (data: any) => {
          this.leaderboard = data.data;
        },
        error: (error: any) => {
          this.error = error;
        }
      }
    )
  }
}
