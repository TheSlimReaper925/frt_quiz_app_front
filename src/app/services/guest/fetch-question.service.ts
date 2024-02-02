import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FetchQuestionService {
  questions: any = [];
  constructor(private http: HttpClient) { }

  async fetchQuestions(data: object){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let url = `${environment.apiUrl}/api/quiz/get-questions`;

    this.questions = await firstValueFrom(this.http.post<any[]>(url, data, {headers}));

    return this.questions
  }

  async checkIfAnswerIsCorrect(data: object) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let url = `${environment.apiUrl}/api/quiz/check-answer`;

    return await firstValueFrom(this.http.post<any[]>(url, data, {headers}));
  }

  getFetchedQuestion() {
    if (this.questions.data) {
      return this.questions.data;
    }
  }

}
