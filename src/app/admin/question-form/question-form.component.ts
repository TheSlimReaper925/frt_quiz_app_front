import { Component } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Router } from "@angular/router";
import {environment} from "../../../environments/environment";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-question-form',
  standalone: true,
  imports: [
    HeaderComponent,
    NgIf,
    FormsModule
  ],
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.css'
})
export class QuestionFormComponent {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  question: string = '';
  questionType: number = 1;
  answer1: string = '';
  answer2: string = '';
  answer3: string = '';
  correctAnswer: string = '';
  error: string = '';

  async submitForm() {
    const formData: any = {
      question: this.question,
      questionType: this.questionType,
      correctAnswer: this.correctAnswer,
    };

    if (this.questionType == 2) {
      formData['answer1'] = this.answer1;
      formData['answer2'] = this.answer2;
      formData['answer3'] = this.answer3;
    }


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
    });

    const apiUrl = `${environment.apiUrl}/api/admin/add-question`;

    const data: any = await firstValueFrom(this.http.post(apiUrl, formData, {headers: headers}))

    if (!data.success) {
      this.error = data.message;
    } else {
      await this.router.navigate(['/admin/questions']);
    }
  }

  updateFormFields() {
    this.answer1 = '';
    this.answer2 = '';
    this.answer3 = '';
    this.correctAnswer = '';
  }
}
