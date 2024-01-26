import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentdataService } from 'src/app/services/alumnosdata.service';
import { NotifierService } from 'angular-notifier';
import { DialogService } from 'src/app/services/dialog.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ErrorAvisoComponent } from '../error-aviso/error-aviso.component';
import { UserdataService } from 'src/app/services/userdata.service';


@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.css']
})
export class EditUserComponent implements OnInit {
  studentData: any;
  student: any = {};
  studentId!: string;
  private readonly notifier: NotifierService;
  private dialogRef: MatDialogRef<SuccessDialogComponent> | undefined;
  private dialogRef1: MatDialogRef<ErrorAvisoComponent> | undefined;


  constructor(
    private studentService: StudentdataService,
    private router: Router,
    notifier: NotifierService,
    private dialogService: DialogService,
    private userdata: UserdataService,
  ) {
    this.notifier = notifier;
  }

  ngOnInit(): void {
    const storedStudentData = localStorage.getItem('studentData');
    if (storedStudentData) {
      this.studentData = JSON.parse(storedStudentData);
      this.student.name = this.studentData.data.name;
      this.student.lastname = this.studentData.data.lastname;
      this.student.age = this.studentData.data.age;
      this.student.email = this.studentData.data.email;
      this.student.password = this.studentData.data.password;
      this.studentId = this.studentData.data.id;
    }
  }

  editStudent() {
    this.studentService.updateStudent(this.studentId, this.student).subscribe({
      next: (response) => {
        this.dialogRef = this.dialogService.openSuccessDialog('Perfil Editado');
        this.dialogRef.afterClosed().subscribe(() => {
          console.log(this.studentId, 'studentId')
          this.studentService.getStudentDataId(this.studentId).subscribe({
            next: (studentData) => {
              this.student = studentData.data;
              this.studentService.sendStudent(studentData);
              console.log(this.student, 'student');
              console.log(studentData.data, 'studentData.data');
              console.log(studentData, 'studentData');
              console.log(studentData, 'studentData pelado');
              localStorage.setItem('studentData', JSON.stringify(studentData));
              this.router.navigate(['/misdatos']);
            },
            error: (error) => {
              console.error('Error al obtener datos del alumno', error);
            }
          });
        });
      },
      error: (error: any) => {
        this.dialogRef1 = this.dialogService.openFailureDialog('Verifique sus credenciales');
        this.dialogRef1.afterClosed().subscribe(() => {
          location.reload();
        });
      }
    });
  }}
