import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {QuestionsService} from "../../services/admin/questions.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [
    HeaderComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export class QuestionsComponent {

  questions: any[] = [];
  error: string = '';

  constructor(private questionService: QuestionsService) {
  }

  ngOnInit() {
    this.questionService.fetchQuestions().subscribe( {
        next: (data: any) => {
          this.questions = data.data;
        },
        error: (error: any) => {
          this.error = error;
        }
      }
    )
  }

  getCorrectAnswer(answersVisible: any[]): string {
    const correctAnswer = answersVisible.find(answer => answer.is_correct == 1);
    return correctAnswer ? correctAnswer.answer : "Can't find";
  }
}
