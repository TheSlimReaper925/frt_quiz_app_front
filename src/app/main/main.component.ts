import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import {FetchQuestionService} from "../services/guest/fetch-question.service";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  name: string = '';
  lastName: string = '';
  email: string = '';
  quizSize: number = 10;
  quizType: string = 'binary';
  errorMessage: String = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private questionService: FetchQuestionService
    ) {}

  async startQuiz() {
    const sendData = {
      Name: this.name,
      LastName: this.lastName,
      Email: this.email,
      QuizSize: this.quizSize,
      QuizType: this.quizType
    }

    const data: any = await this.questionService.fetchQuestions(sendData);

    if (data.success) {
      console.log('Questions before navigation:', data.data);
      await this.router.navigate(['/quiz'], {state: {data: data.data}})
    } else {
      this.errorMessage = data.message
    }
  }
}
