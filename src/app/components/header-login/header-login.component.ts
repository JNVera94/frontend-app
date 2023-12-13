import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlumnosdataService } from 'src/app/services/alumnosdata.service';

@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.css']
})
export class HeaderLoginComponent implements OnInit {
  isLoggedIn: boolean = false;
  alumnoData: any;
  alumno: any;



  constructor(private router: Router,
    private authService: AuthService,
    private alumnoService: AlumnosdataService,
  ) { }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      if (this.isLoggedIn) {
        this.alumnoService.observableAlumnoData.subscribe(alumno => {
          if (alumno && alumno.data) {
            this.alumnoData = alumno
            console.log(this.alumnoData,"data")
          }
        })
      }
    });
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/'])
  }
}
