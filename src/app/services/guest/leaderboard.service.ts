import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  constructor(private http: HttpClient) { }

  fetchLeaderboard() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    let url = `${environment.apiUrl}/api/quiz/leaderboard`;

    return this.http.get<any[]>(url, {headers});
  }
}
