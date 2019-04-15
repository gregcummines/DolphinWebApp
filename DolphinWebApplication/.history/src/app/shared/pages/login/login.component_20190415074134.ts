import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Angular Social Login';
  private user: {};
  private loggedIn: boolean;
  private returnUrl: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.authService.authState.subscribe(
        user => {
            this.user = user;
            this.loggedIn = (user != null);

            // login successful so redirect to return url
            this.router.navigateByUrl(this.returnUrl);
        },
        error => {
            this.snackBar.open('You have entered an invalid username or password', '', {duration: 1000});
        });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
}
