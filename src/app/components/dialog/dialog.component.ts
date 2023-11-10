import {Component} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

/**
 * @title Dialog elements
 */
@Component({
  selector: 'dialog-elements-example',
  templateUrl: 'dialog.component.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class DialogElementsExample {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogElementsExampleDialog {
openDialog() {
throw new Error('Method not implemented.');
}
}