import { Routes } from '@angular/router';
import { IndexComponent} from "./admin/index/index.component";
import { MainComponent } from "./main/main.component";
import { LeaderboardComponent } from "./leaderboard/leaderboard.component";
import { LoginComponent } from "./admin/login/login.component";
import { authGuard } from "./auth/auth.guard";
import { loginGuard } from "./auth/login.guard";
import {QuestionFormComponent} from "./admin/question-form/question-form.component";
import {QuestionsComponent} from "./admin/questions/questions.component";
import {ResponsesComponent} from "./admin/responses/responses.component";
import {QuizComponent} from "./quiz/quiz.component";
import {ResultComponent} from "./result/result.component";

export const routes: Routes = [

  //user routes
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'quiz',
    component: QuizComponent,
  },
  {
    path: 'leaderboard',
    component: LeaderboardComponent
  },
  {
    path: 'quiz/result',
    component: ResultComponent
  },

  //admin routes
  {
    path: 'login',
    canActivate: [loginGuard],
    component: LoginComponent
  },
  {
    path: 'admin',
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        component: IndexComponent
      },
      {
        path: 'add-question',
        component: QuestionFormComponent
      },
      {
        path: 'questions',
        component: QuestionsComponent
      },
      {
        path: 'responses',
        component: ResponsesComponent
      }
    ]
  }
];
