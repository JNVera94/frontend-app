import { Component } from '@angular/core';
import { ContactoService } from 'src/app/services/contacto.service';
import { NotifierService } from 'angular-notifier';
import { DialogService } from 'src/app/services/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component.js';
import { ErrorAvisoComponent } from '../error-aviso/error-aviso.component.js';
@Component({
  selector: 'app-ensenia',
  templateUrl: './ensenia.component.html',
  styleUrls: ['./ensenia.component.css']
})
export class EnseniaComponent {
  mensaje: any = {};
  private readonly notifier: NotifierService;
  private dialogRef: MatDialogRef<SuccessDialogComponent> | undefined;
  private dialogRef1: MatDialogRef<ErrorAvisoComponent> | undefined;

  constructor(
    private contactoService: ContactoService,
     private dialogService: DialogService,
     notifier: NotifierService,
  ) {
    this.notifier = notifier;
  }


  crearMensaje() {
    this.contactoService.addMensaje(this.mensaje).subscribe(
      (response) => {
        this.mensaje = {}; // Clear form fields
        this.dialogRef = this.dialogService.openSuccessDialog('¡Mensaje enviado, gracias!');
        this.dialogRef.afterClosed().subscribe(() => {
        });
      },
      (error) => {
        this.dialogRef1= this.dialogService.openFailureDialog('Error, intente nuevamente');
        this.dialogRef1.afterClosed().subscribe(() => {
        });
      }
    );
  }
}
