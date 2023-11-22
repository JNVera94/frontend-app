import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog.service';
import { AlumnosdataService } from 'src/app/services/alumnosdata.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-eliminar-dialog',
  templateUrl: './eliminar-dialog.component.html',
  styleUrls: ['./eliminar-dialog.component.css'],

})
export class EliminarDialogComponent {
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  alumnoData: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EliminarDialogComponent>,private dialogService: DialogService,
    private alumnoService: AlumnosdataService,
    private authService: AuthService,
    private router: Router
  ) {}

  closeDialog() {
    this.dialogRef.close();
    this.onClose.emit();
  }

  onDeleteAlumno(result: string) {
    // Cierra el diálogo y pasa el resultado
    this.dialogRef.close(result);
  }
  
  }
  

