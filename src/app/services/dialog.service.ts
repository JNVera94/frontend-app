import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../components/success-dialog/success-dialog.component';
import { EliminarDialogComponent } from '../components/eliminar-dialog/eliminar-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(public dialog: MatDialog) {}

  openSuccessDialog(message: string): MatDialogRef<SuccessDialogComponent> {
    return this.dialog.open(SuccessDialogComponent, {
      width: '300px',
      data: { message }
    });
  }

  openEliminarDialog(message: string): MatDialogRef<EliminarDialogComponent> {
    return this.dialog.open(EliminarDialogComponent, {
      width: '300px',
      data: { message }
    });
  }
}