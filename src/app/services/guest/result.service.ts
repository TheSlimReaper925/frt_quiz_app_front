import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {response} from "express";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  response: any;

  constructor(private http: HttpClient) { }

  async storeResult (data: object) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let url = `${environment.apiUrl}/api/quiz/store-response`;

    this.response =  await firstValueFrom(this.http.post<any[]>(url, data, {headers}))

    return this.response;
  }
  getResponse() {
    return this.response.data
  }
}
