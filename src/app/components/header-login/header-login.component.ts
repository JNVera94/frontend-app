import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.css']
})
export class HeaderLoginComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  alumnoData: any;
  private alumnoDataSubscription!: Subscription;


  constructor(private router: Router,
    private authService: AuthService,
) { }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;

      if (this.isLoggedIn) {

        const storedAlumnoData = localStorage.getItem('alumnoData');

        if (storedAlumnoData) {
          this.alumnoData = JSON.parse(storedAlumnoData);
        }
      }
    });
  }


  ngOnDestroy() {

    if (this.alumnoDataSubscription) {
      this.alumnoDataSubscription.unsubscribe();
    }
  }
  logout() {
    this.authService.logout()
    this.router.navigate(['/'])
  }
}
