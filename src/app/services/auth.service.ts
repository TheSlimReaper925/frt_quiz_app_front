import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
  ) { }

  async checkAuthUser() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
    });

    let url = `${environment.apiUrl}/api/auth-check`;

    const response: any = await firstValueFrom(this.http.get(url, {headers: headers}))

    return response.logged_in;
  }

}
