import { Component } from '@angular/core';
import { OnInit } from "@angular/core";
import {Router} from '@angular/router';
import {FetchQuestionService} from "../services/guest/fetch-question.service";
import {NgForOf, NgIf} from "@angular/common";
import {ResultService} from "../services/guest/result.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
  quizId: number = 0;
  questions: any;
  currentQuestionIndex: number = 0;
  correct: number = 0;
  incorrect: number = 0;
  timer: number = 300;
  intervalId: any;
  selectedQuestionsSize: number = 10;
  selectedQuestionType: string = 'binary';

  constructor(
    private route: Router,
    private quizService: FetchQuestionService,
    private resultService: ResultService

  ) {}

  ngOnInit() {
    this.questions = this.quizService.getFetchedQuestion();
    console.log(this.questions.questions[this.currentQuestionIndex]);
    this.quizId = this.questions.quiz_id;
    this.startTimer()
  }

  nextQuestions() {
    if (this.currentQuestionIndex < this.questions.questions.length - 1) {
      this.currentQuestionIndex ++;
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex ++;
    }
  }

  async handleAnswerClick(questionId: number, answer: any) {
    if (typeof this.questions.questions[this.currentQuestionIndex].answer == 'undefined') {
      let isAnswerCorrect: any = await this.quizService.checkIfAnswerIsCorrect({
        QuestionID: questionId,
        Answer: answer
      });
      if (isAnswerCorrect.data.is_correct) {
        this.correct ++;
      } else {
        this.incorrect ++;
      }
      this.questions.questions[this.currentQuestionIndex].answer = isAnswerCorrect.data.is_correct;
    }
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      this.timer--;
      if (this.timer <= 0) {
        this.stopTimer();
        this.submitResult();
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.intervalId);
  }

  async submitResult() {
    const data = {
      QuizID: this.quizId,
      CorrectAnswers: this.correct,
      InCorrectAnswers: this.incorrect
    }

    await this.resultService.storeResult(data);

    await this.route.navigate(['/quiz/result']);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  async saveChanges() {

    const sendData = {
      QuizID: this.quizId,
      QuizSize: this.selectedQuestionsSize,
      QuizType: this.selectedQuestionType
    }

    const questions = await this.quizService.fetchQuestions(sendData);

    this.questions = questions.data;
    this.timer = 300;
    this.correct = 0;
    this.incorrect = 0;
    this.currentQuestionIndex = 0;

    console.log(this.questions);
  }

}
