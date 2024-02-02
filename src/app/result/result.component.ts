import { Component } from '@angular/core';
import { OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {ResultService} from "../services/guest/result.service";

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {
  result: any;

  constructor(
    private router: Router,
    private resultSaver: ResultService
  ) {
  }
  ngOnInit() {
    this.result = this.resultSaver.getResponse();
  }

  getTimeDifference(start: string, end: string) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const timeDifference = endDate.getTime() - startDate.getTime();
    const minutes = Math.floor(timeDifference / 60000); // 1 minute = 60,000 milliseconds
    const seconds = Math.floor((timeDifference % 60000) / 1000); // remaining seconds

    return `${minutes} minutes and ${seconds} seconds`;
  }
}
