import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message, action = 'ok') {
    this._snackBar.open(message, action, {
      duration: 1000,
      verticalPosition: 'bottom',
    });
  }
}
