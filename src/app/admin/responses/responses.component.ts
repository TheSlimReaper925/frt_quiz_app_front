import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {ResponsesService} from "../../services/admin/responses.service";

@Component({
  selector: 'app-responses',
  standalone: true,
  imports: [
    HeaderComponent,
    NgForOf,
    NgIf,
    DatePipe
  ],
  templateUrl: './responses.component.html',
  styleUrl: './responses.component.css'
})
export class ResponsesComponent {

  responses: any[] = [];
  errors: string = '';

  constructor(private quizResponses: ResponsesService) {}

  ngOnInit() {
    this.quizResponses.fetchResponses().subscribe({
      next: (response: any) => {
        this.responses = response.data
      },
      error: () => {
        this.errors = 'Could not fetch';
      }
    })
  }
}
