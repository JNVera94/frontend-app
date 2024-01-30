import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentdataService } from 'src/app/services/alumnosdata.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  studentData: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private studentService: StudentdataService
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      if (this.isLoggedIn) {
        this.studentService.observableStudentData.subscribe(student => {
          if (student && student.data) {
            this.studentData = student;
            console.log(this.studentData);
            console.log(this.studentData.role,'thisstudendata.role');
            if (this.studentData.role === 'admin') {
              this.isAdmin = true; 
            }
            console.log(this.isAdmin,'thisadmin')
          }
        });
      }
    });

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}