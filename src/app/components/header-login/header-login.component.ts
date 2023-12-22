import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentdataService } from 'src/app/services/alumnosdata.service';

@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.css']
})
export class HeaderLoginComponent implements OnInit {
  isLoggedIn: boolean = false;
  studentData: any;
  student: any;



  constructor(private router: Router,
    private authService: AuthService,
    private studentService: StudentdataService,
  ) { }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      if (this.isLoggedIn) {
        this.studentService.observableStudentData.subscribe(student => {
          if (student && student.data) {
            this.studentData = student
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
