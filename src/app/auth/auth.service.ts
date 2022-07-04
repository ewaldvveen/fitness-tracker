import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private readonly router: Router) {}

  register(authData: AuthData): void {
    this.user = {
      userId: Math.round(Math.random() * 10000).toString(),
      email: authData.email
    };

    this.setupAppState(true, 'training');
  }

  login(authData: AuthData): void {
    this.user = {
      userId: Math.round(Math.random() * 10000).toString(),
      email: authData.email
    };

    this.setupAppState(true, 'training');
  }

  logout(): void {
    this.user = null;

    this.setupAppState(false, 'login');
  }

  get(): User {
    return { ...this.user };

  }

  isAuthenticated(): boolean {
    return this.user != null;
  }

  private setupAppState(isLoggedIn: boolean, page: string): void {
    this.authChange.next(isLoggedIn);
    this.router.navigate([`/${page}`]);
  }
}
