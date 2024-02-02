import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment} from "../../../environments/environment";
import {firstValueFrom} from "rxjs";
import { Router} from "@angular/router";
import {loginGuard} from "../../auth/login.guard";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginFailed: string = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  async loginRequest() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const apiUrl = `${environment.apiUrl}/api/login`;

    const data: any = await firstValueFrom(this.http.post(apiUrl, loginData, {headers: headers}))

    if (data.data) {
      localStorage.setItem('Authorization', data.data);
      await this.router.navigate(['/quiz'], { state: { questions: data.data } });
    } else {
      this.loginFailed = data.message
    }
  }

  protected readonly loginGuard = loginGuard;
}
